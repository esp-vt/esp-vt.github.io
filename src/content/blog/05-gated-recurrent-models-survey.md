---
title: "LSTM부터 Titans까지: 게이트 기반 순환 모델 6종 원문 정리 (LSTM, Mamba, GLA, HGRN-2, RWKV-6, Titans)"
description: "LSTM, Mamba, GLA, HGRN-2, RWKV-6, Titans의 상태 갱신식과 망각 게이트를 원 논문 식 기준으로 정리하고, '망각 게이트는 무엇을 보고 결정되는가'라는 하나의 축으로 비교합니다."
pubDate: 2026-10-09
tags: ["Linear RNN", "State Space Model", "Mamba", "RWKV", "GLA", "HGRN", "Titans", "LSTM", "Deep Learning"]
featured: false
author: "Eunseong Park"
lang: "ko"
---

## 0. 이 글의 관점

Transformer의 KV 캐시는 시퀀스 길이에 비례해 커집니다. 최근의 선형 순환 모델(linear RNN / SSM / linear attention 계열)은 이 문제를 **고정 크기의 상태(state)** 로 해결합니다. 이 모델들은 거의 모두 다음과 같은 공통 틀로 쓸 수 있습니다.

```
S_t = G_t ⊙ S_{t-1} + (쓰기 항)_t      # 망각(decay) + 쓰기(write)
o_t = 읽기(S_t, q_t)                    # 질의(query)로 상태를 읽음
```

모델마다 다른 점은 크게 세 가지입니다.

1. **망각 게이트 G_t가 무엇의 함수인가**: 상수인가, 현재 입력 x_t의 함수인가, 이전 상태의 함수인가
2. **쓰기 항이 상태에 의존하는가**: 단순 외적 k_tᵀv_t인가, 현재 상태와의 오차를 쓰는가
3. **학습을 어떻게 병렬화하는가**: parallel scan, chunkwise matmul, 혹은 불가능(BPTT)

아래에서는 LSTM, Mamba, GLA, HGRN-2, RWKV-6, Titans를 차례로 원 논문의 식 그대로 정리하고, 마지막에 이 세 축으로 비교합니다. 식은 원문 표기를 최대한 유지했고, 원문과 다르게 단순화한 곳은 따로 표시했습니다.

---

## 1. LSTM (Hochreiter & Schmidhuber, 1997; forget gate: Gers et al., 2000)

### 1.1 식

```
f_t = σ(W_f x_t + U_f h_{t-1} + b_f)      # forget gate
i_t = σ(W_i x_t + U_i h_{t-1} + b_i)      # input gate
o_t = σ(W_o x_t + U_o h_{t-1} + b_o)      # output gate
c̃_t = tanh(W_c x_t + U_c h_{t-1} + b_c)   # 후보 셀
c_t = f_t ⊙ c_{t-1} + i_t ⊙ c̃_t           # 셀 상태
h_t = o_t ⊙ tanh(c_t)                      # 은닉 상태
```

참고로 1997년 원래 LSTM에는 forget gate가 없었고, Gers et al.(2000)이 추가했습니다. 오늘날 "LSTM"이라고 하면 보통 forget gate가 있는 버전을 말합니다.

### 1.2 핵심 포인트

- **모든 게이트가 h_{t-1}을 봅니다.** 망각 여부를 결정할 때 직전 은닉 상태를 입력으로 받습니다. 이 글에서 다루는 6개 모델 가운데 **망각 게이트가 상태에 의존하는 것은 LSTM뿐**입니다.
- 엄밀히 말하면 게이트가 보는 것은 셀 상태 c_{t-1}이 아니라 출력 h_{t-1} = o_{t-1} ⊙ tanh(c_{t-1})입니다. c_{t-1}을 게이트에 직접 넣는 것은 peephole connection 변형(Gers & Schmidhuber, 2000)입니다.
- 대가도 있습니다. h_{t-1}이 σ와 tanh 안으로 들어가므로 재귀식이 **비선형**이고, 결합 법칙이 성립하지 않아 parallel scan을 쓸 수 없습니다. 학습은 시간축으로 순차적인 BPTT입니다.
- 상태 크기는 벡터 하나(d)입니다. 이후 모델들은 상태를 행렬로 확장(state expansion)합니다.

이후의 선형 모델들은 모두 **"게이트를 h_{t-1}에서 떼어내서 병렬화를 얻는다"** 는 방향으로 갑니다. HGRN 논문은 이를 명시적으로 이렇게 적습니다.

> "It is worth noting that f_t and i_t depend only on x_t and not on h_{t−1}. This characteristic enables the use of the parallel scan algorithm, otherwise it is infeasible." (HGRN, §3.2)

---

## 2. Mamba / S6 (Gu & Dao, 2023)

### 2.1 출발점: 구조적 SSM (S4)

연속 시간 선형 시스템을 이산화해서 씁니다.

```
h'(t) = A h(t) + B x(t),   y(t) = C h(t)            # 연속 시간

Ā = exp(ΔA)
B̄ = (ΔA)^{-1} (exp(ΔA) − I) · ΔB                   # ZOH 이산화

h_t = Ā h_{t-1} + B̄ x_t,   y_t = C h_t              # 이산 재귀
```

A는 대각 행렬(N개 원소)이고, D개 채널 각각에 독립적으로 적용됩니다. 그래서 전체 상태 크기는 D×N입니다(논문 기본값 N=16).

S4에서는 Δ, A, B, C가 모두 **파라미터**입니다. 시간에 따라 변하지 않으므로(LTI) 합성곱으로도 계산할 수 있습니다.

### 2.2 Selection: Δ, B, C를 입력의 함수로

Mamba의 핵심 변경은 Algorithm 2 (S6)입니다.

```
A : (D, N)     ← Parameter
B : (B, L, N)  ← s_B(x)          = Linear_N(x)
C : (B, L, N)  ← s_C(x)          = Linear_N(x)
Δ : (B, L, D)  ← τ_Δ(Parameter + s_Δ(x)),  s_Δ(x) = Broadcast_D(Linear_1(x)),  τ_Δ = softplus
Ā, B̄ : (B, L, D, N) ← discretize(Δ, A, B)
y ← SSM(Ā, B̄, C)(x)              # 시변(time-varying): scan만 가능
```

- Δ, B, C가 길이 차원 L을 갖게 되면서 모델이 **시변(time-varying)** 으로 바뀝니다. 그 대가로 합성곱 형태를 잃습니다.
- A는 여전히 입력과 무관한 파라미터입니다. 실제 감쇠 Ā_t = exp(Δ_t A)는 Δ_t를 통해서만 입력에 의존합니다.
- s_Δ는 실제로는 Linear_D(Linear_R(x)) 형태의 low-rank 사영으로 일반화해서 씁니다(§3.6, "Parameterization of Δ").
- **Δ, B, C 어디에도 h_{t-1}은 들어가지 않습니다.**

### 2.3 RNN 게이트와의 연결 (§3.5.1, Theorem 1)

N=1, A=−1, B=1, s_Δ = Linear(x), τ_Δ = softplus로 두면 selective SSM은 다음이 됩니다.

```
g_t = σ(Linear(x_t))
h_t = (1 − g_t) h_{t-1} + g_t x_t
```

증명(Appendix C)은 ZOH 식에 그대로 대입하면 나옵니다.

```
Δ_t = softplus(Linear(x_t))
Ā_t = exp(−Δ_t) = 1 / (1 + exp(Linear(x_t))) = 1 − σ(Linear(x_t))
B̄_t = 1 − Ā_t = σ(Linear(x_t))
```

논문의 주장은 **"Δ가 RNN 게이트의 일반화된 역할을 한다"**, 그리고 **"SSM의 이산화가 휴리스틱한 게이트 메커니즘의 원리적 기반"** 이라는 것입니다. 단, 여기서 나오는 게이트 g_t는 x_t만의 함수입니다. LSTM처럼 h_{t-1}을 보는 게이트가 아닙니다.

### 2.4 블록 구조와 구현

- 블록 구성: 입력 사영으로 두 갈래(x, z)를 만듭니다. x 갈래는 Conv1d → SiLU → SSM을 지나고, z 갈래의 SiLU(z)와 곱한 뒤 출력 사영을 합니다(Fig. 3). H3 블록과 Gated MLP를 하나로 합친 형태입니다.
- 주의할 점: SSM에 들어가는 x는 원시 토큰이 아니라 **causal conv를 거친 값**입니다. 따라서 Δ, B, C는 엄밀히 말하면 최근 몇 토큰으로 이루어진 로컬 윈도우의 함수입니다.
- 하드웨어 인지 scan: (B, L, D, N) 크기의 상태를 HBM에 만들지 않습니다. 파라미터를 SRAM으로 올려서 이산화와 재귀를 SRAM 안에서 끝냅니다. 역전파 때는 중간 상태를 다시 계산(recomputation)합니다.

### 2.5 GLA 논문의 통일 표기 (Table 1)

```
Mamba    G_t = exp(−(1ᵀα_t) ⊙ exp(A)),  α_t = softplus(x_t W_α1 W_α2)
Mamba-2  G_t = γ_t 1ᵀ1,  γ_t = exp(−softplus(x_t W_γ) exp(a))     # 스칼라 게이트
```

Mamba-2는 게이트를 스칼라로 제한하는 대신 matmul 형태(tensor core 사용 가능)와 더 큰 상태를 얻었습니다.

---

## 3. GLA: Gated Linear Attention (Yang et al., ICML 2024)

### 3.1 식

선형 어텐션 S_t = S_{t-1} + k_tᵀv_t에 데이터 의존적인 2D forget gate를 붙인 구조입니다.

```
S_t = G_t ⊙ S_{t-1} + k_tᵀ v_t,   G_t ∈ (0,1)^{d_k × d_v}
```

G_t를 x_t에서 그대로 사상하면 파라미터가 d·d_k·d_v개 필요합니다. 그래서 GLA는 중간 지점을 택합니다.

```
G_t = α_tᵀ 1
S_t = Diag(α_t) S_{t-1} + k_tᵀ v_t                       (Eq. 3)
α_t = σ(x_t W_α¹ W_α² + b_α)^{1/τ},   W_α¹ ∈ R^{d×16},  W_α² ∈ R^{16×d_k},  τ = 16
o_t = q_t S_t
```

- α_t는 **low-rank(16) 사영 → sigmoid → 1/τ 제곱**으로 만듭니다. τ=16은 망각을 느리게 만들기 위한 temperature입니다.
- 감쇠는 key 차원(d_k) 방향으로만 걸리고, value 차원으로는 브로드캐스트됩니다.
- **쓰기(k_t, v_t)와 감쇠(α_t)는 서로 다른 사영에서 나옵니다.** 쓰기 세기와 망각 속도가 분리되어 있다는 뜻입니다.

### 3.2 레이어 구성 (§4.4)

```
S_t^h = (α_t^hᵀ 1) ⊙ S_{t-1}^h + k_t^hᵀ v_t^h
o_t^h = q_t^h S_t^h
o'_t  = concat(LN(o_t^1), ..., LN(o_t^H))
r_t   = Swish(x_t W_r + b_r)
y_t   = (r_t ⊙ o'_t) W_O
```

헤드별 LayerNorm, Swish 출력 게이트, 그리고 SwiGLU FFN과 교대로 쌓는 Transformer식 구조입니다.

### 3.3 학습: chunkwise 형태

재귀를 펼치면 b_t = ∏_{j≤t} α_j를 이용한 병렬 형태가 됩니다. GLA는 이를 청크 단위로 나누어 계산합니다. 청크 안은 matmul로 병렬 처리하고, 청크 사이는 재귀로 넘깁니다. 이것이 hardware-efficient한 FlashLinearAttention 커널입니다. α_t가 h_{t-1}에 의존하지 않기 때문에 이런 분해가 가능합니다.

### 3.4 GLA 형태로 본 다른 모델들 (Table 1, bias 생략)

```
mLSTM / Gated Retention   G_t = γ_t 1ᵀ1,  γ_t = σ(x_t W_γ)  (Retention은 ^{1/τ})
HGRN-2                    G_t = α_tᵀ1,  α_t = γ + (1−γ) σ(x_t W_α)
RWKV-6                    G_t = α_tᵀ1,  α_t = exp(−exp(x_t W_α))
GLA                       G_t = α_tᵀ1,  α_t = σ(x_t W_α1 W_α2)^{1/τ}
```

이 표는 비교용으로 단순화한 것입니다. 실제 RWKV-6 식은 5절에서 다룹니다.

---

## 4. HGRN-2 (Qin et al., COLM 2024)

### 4.1 전신: HGRN (NeurIPS 2023)

HGRN은 원소별(element-wise) 선형 재귀에 **층마다 다른 하한(lower bound)** 을 둔 forget gate를 붙였습니다.

```
μ_t = σ(x_t W_f + b_f)                                # 원래의 forget gate
λ_t = γ_k + (1 − γ_k) ⊙ μ_t                           # k번째 층의 하한 γ_k
h_t = λ_t ⊙ exp(iθ) ⊙ h_{t-1} + (1 − λ_t) ⊙ c_t       # 복소수 재귀

P   = Softmax(Γ, dim=0),   Γ ∈ R^{H×d}               # H = 층 수
γ_k = [Cumsum(P, dim=0)]_k                            # 층이 올라갈수록 단조 증가
```

- 하위 층은 하한이 낮아서 단기 의존성을 다루고, 상위 층은 하한이 1에 가까워서 장기 의존성을 다룹니다.
- 하한은 게이트가 0이나 1 근처에서 포화되는 문제도 완화합니다.
- c_t는 복소수이고 실수부와 허수부를 각각 SiLU 사영으로 만듭니다. θ는 회전각입니다.

### 4.2 HGRN-2: 외적 기반 상태 확장

HGRN의 상태는 벡터(d)라서 용량이 작습니다. HGRN-2는 이를 행렬로 확장합니다.

```
f_t = β + (1 − β) ⊙ σ(U x_t + b_u)          # 하한이 있는 forget gate (Eq. 2)
i_t = SiLU(V x_t + b_v)                      # 입력(= value 역할)
o_t = σ(W x_t + b_w)                         # 출력 게이트(= query 역할)

h_t = h_{t-1} · Diag(f_t) + i_t ⊗ (1 − f_t) ∈ R^{d×d}     (Eq. 3)
y_t = h_t · o_t
```

- **(1 − f_t)를 key로 재사용합니다.** 별도의 key 사영 없이, 망각한 만큼 새로 씁니다. 이것은 HGRN의 (1 − λ_t) 결합을 행렬 상태로 확장한 것입니다.
- 논문 스스로 이 재귀가 **GLA와 동일한 형태이고 파라미터화만 다르다**고 밝힙니다(1 − f ↔ k, i ↔ v, o ↔ q).
- 복소수는 버리고 실수 재귀만 씁니다. 멀티헤드로 계산량을 줄입니다(헤드 차원 128).
- 게이트(f_t, i_t, o_t)는 모두 **x_t만의 함수**입니다.

GLA와 비교하면 차이는 하나입니다. GLA는 감쇠와 쓰기를 분리했고, HGRN-2는 **감쇠와 쓰기를 1 − f_t로 묶었습니다**.

---

## 5. RWKV-6 / Finch (Peng et al., 2024)

RWKV-5(Eagle)는 감쇠 w가 학습된 고정 벡터였습니다. RWKV-6(Finch)는 이 감쇠를 **데이터 의존적**으로 바꿨습니다.

### 5.1 Token Shift: ddlerp (§4.2.1)

```
lora_□(x)     = λ_□ + tanh(x A_□) B_□                          (14)
ddlerp_□(a,b) = a + (b − a) ⊙ lora_□(a + (b − a) ⊙ μ_x)        (15)
```

- A_□ ∈ R^{D×32}, B_□ ∈ R^{32×D}입니다. 감쇠용 LoRA는 두 배 크기(D×64)를 씁니다.
- 현재 토큰 x_t와 이전 토큰 x_{t-1}을 섞는 비율 자체가 두 토큰에 의존합니다.

### 5.2 Time Mixing (§4.2.2)

```
□_t  = ddlerp_□(x_t, x_{t-1}) W_□,    □ ∈ {r, k, v, g}           (16)
d_t  = lora_d(ddlerp_d(x_t, x_{t-1}))                            (17)
w_t  = exp(−exp(d_t))                                            (18)

wkv_t = diag(u)·k_tᵀ·v_t + Σ_{i=1}^{t-1} diag(⊙_{j=i+1}^{t-1} w_j)·k_iᵀ·v_i     (19)
o_t   = concat(SiLU(g_t) ⊙ LayerNorm(r_t · wkv_t)) W_o                         (20)
```

재귀 형태로 쓰면 다음과 같습니다.

```
wkv' = s + diag(u) · kᵀ v          (21)   # 현재 토큰에는 bonus u
s'   = diag(w) · s + kᵀ v           (22)
```

### 5.3 핵심 포인트

- **w_t는 x_t와 x_{t-1}만의 함수입니다.** 상태 s는 diag(w)에 곱해질 뿐, w를 만드는 데 들어가지 않습니다. 논문 표현으로는 "a mix of the current and prior tokens, with the mix itself determined by aspects of both tokens"입니다.
- exp(−exp(·)) 형태라서 w_t ∈ (0, 1)이 자동으로 보장됩니다.
- r(receptance)이 query 역할을 하고, u는 현재 토큰에만 주는 보너스 가중치입니다.
- GLA Table 1의 `α_t = exp(−exp(x_t W_α))`는 token shift, tanh LoRA, bias λ를 생략한 형태입니다.
- 논문 안에서 표기가 엇갈리는 곳이 있습니다. 본문은 감쇠용 LoRA를 "LoRA_ω"라고 부르지만, 식 (17)은 lora_d로 씁니다.

---

## 6. Titans (Behrouz et al., NeurIPS 2025)

Titans는 상태를 행렬이 아니라 **신경망(MLP)의 가중치**로 둡니다. 그리고 그 가중치를 테스트 시간에 경사 하강으로 갱신합니다.

### 6.1 연상 기억 손실

```
k_t = x_t W_K,   v_t = x_t W_V
ℓ(M_{t-1}; x_t) = ‖M_{t-1}(k_t) − v_t‖²₂                        (2)
```

내부 루프에서는 M의 가중치를 최적화하고, 외부 루프에서는 W_K, W_V 같은 나머지 파라미터를 학습합니다. 메타러닝 구조입니다.

### 6.2 Surprise와 망각

```
M_t = (1 − α_t) M_{t-1} + S_t
S_t = η_t S_{t-1} − θ_t ∇ℓ(M_{t-1}; x_t)                         (3)
```

- **momentary surprise**는 ∇ℓ(M_{t-1}; x_t)입니다. 현재 기억이 이 토큰을 얼마나 못 맞히는지를 나타냅니다.
- **past surprise**는 η_t S_{t-1}입니다. 모멘텀 항으로, surprise의 흐름을 기억합니다.
- **망각**은 α_t ∈ [0,1]가 담당하고, weight decay와 동치입니다. α_t → 0이면 기억을 보존하고, α_t → 1이면 기억 전체를 지웁니다.
- α_t, η_t, θ_t는 모두 데이터 의존적입니다. η_t는 논문에서 "a function of x_t"라고 명시합니다.
- 읽기는 가중치를 갱신하지 않는 순전파 y_t = M*(q_t), q_t = x_t W_Q입니다.

### 6.3 핵심 포인트: 쓰기는 상태 의존, 망각은 입력 의존

- 쓰기 항 ∇ℓ(M_{t-1}; x_t)는 **현재 기억 M_{t-1}에 대한 함수**입니다. 메모리가 선형이면 (M_{t-1}k_t − v_t)k_tᵀ 꼴이 되어 delta rule(DeltaNet)과 같은 계열이 됩니다.
- 반면 망각 게이트 α_t는 여전히 **입력에서만** 나옵니다.

### 6.4 학습 병렬화: 청크 경계 근사

논문은 이렇게 적습니다.

> "our formulation of neural memory is not a linear recurrence. Therefore, it cannot be written as an associative operator, and so be trained by parallel scan."

해결책으로 청크 크기 b 안에서는 ∇ℓ(M_{t-1}; x_t) 대신 **∇ℓ(M_{t'}; x_t)** 를 씁니다. 여기서 t'은 직전 청크의 마지막 시점입니다.

```
M_t = β_t M_0 − Σ_{i=1}^{t} θ_i (β_t / β_i) ∇ℓ(M_{t'}; x_i),   β_i = ∏_{j≤i} (1 − α_j)
```

- 이렇게 하면 청크 안의 그래디언트를 matmul로 한꺼번에 계산할 수 있습니다.
- 모멘텀 S_t = η_t S_{t-1} − θ_t u_t는 u_t가 미리 계산되므로 선형 재귀가 되고, parallel scan으로 처리합니다.
- 결과적으로 청크 사이는 비선형 재귀, 청크 안은 선형 재귀입니다.
- 청크가 작을수록 성능은 좋아지지만 느려집니다(기본 b=16).

### 6.5 아키텍처 변형

| 변형 | 구성 |
|---|---|
| MAC (Memory as a Context) | 장기 기억과 persistent memory의 출력을 입력 세그먼트 앞에 붙이고 어텐션 수행 |
| MAG (Memory as a Gate) | sliding-window 어텐션과 신경 기억을 게이트로 결합 |
| MAL (Memory as a Layer) | 신경 기억 → 어텐션을 순차적으로 쌓음 |

persistent memory는 입력과 무관한 학습 파라미터 토큰(task 지식)입니다. 어블레이션에서 가장 기여가 큰 요소는 weight decay(망각), 모멘텀, convolution, persistent memory 순이었습니다.

---

## 7. 비교

| 모델 | 상태 | 망각 게이트의 입력 | 쓰기 항 | 학습 병렬화 |
|---|---|---|---|---|
| LSTM | 벡터 c ∈ R^d | **x_t, h_{t-1}** | i_t ⊙ c̃_t (h_{t-1} 의존) | 불가 (BPTT) |
| Mamba (S6) | D×N (채널별 대각 SSM) | x (conv 윈도우) → Δ_t, A는 상수 | B̄_t x_t | 하드웨어 인지 parallel scan |
| GLA | d_k×d_v 행렬 | x_t (low-rank, σ^{1/τ}) | k_tᵀv_t (감쇠와 분리) | chunkwise matmul |
| HGRN-2 | d×d 행렬 | x_t (+층별 하한 β) | i_t ⊗ (1 − f_t) (감쇠와 결합) | chunkwise (GLA 형태) |
| RWKV-6 | (D/h)×(D/h) 행렬 | x_t, x_{t-1} (ddlerp + LoRA) | k_tᵀv_t (+ bonus u) | chunkwise / scan |
| Titans | MLP 가중치 | x_t (α_t) | −θ_t∇ℓ(M_{t-1}; x_t) + 모멘텀 (**상태 의존**) | 청크 경계 근사 + scan |

### 7.1 관찰

1. **LSTM 이후 망각 게이트는 모두 입력에서만 계산됩니다.** 병렬 학습(scan 또는 chunkwise matmul)을 얻기 위해 h_{t-1}을 게이트에서 제거한 것이 이 계열의 공통 설계 결정입니다. HGRN 논문은 이를 명시적으로 밝힙니다.
2. **"현재 토큰만 본다"는 말은 정확하지 않습니다.** Mamba는 causal conv 윈도우를 보고, RWKV-6은 x_{t-1}을 명시적으로 씁니다. 정확한 표현은 **"같은 레이어의 상태를 보지 않는다(input-only)"** 입니다. 또한 l번째 층의 입력 x_t^(l)은 아래 층 출력이므로 아래 층 상태 h^(l−1)_{t-1}에 간접적으로 의존합니다.
3. **상태 의존성은 쓰기 쪽으로만 들어왔습니다.** DeltaNet의 v_t − S_{t-1}k_t와 Titans의 ∇ℓ(M_{t-1}; x_t)가 그 예입니다. 두 모델 모두 망각 게이트는 여전히 입력에만 의존합니다.
4. **감쇠와 쓰기의 관계는 모델마다 다릅니다.** Mamba는 Δ_t 하나가 Ā_t와 B̄_t를 함께 조절하므로 결합되어 있습니다. HGRN-2는 1 − f_t로 결합되어 있고, GLA와 RWKV-6은 분리되어 있습니다.
5. **Titans의 청크 경계 근사**는 비선형(상태 의존) 갱신을 학습 가능하게 만드는 현재의 표준 해법입니다. 다만 지금까지는 쓰기 항에만 적용되었습니다.

---

## 참고 문헌

- S. Hochreiter, J. Schmidhuber. Long Short-Term Memory. Neural Computation, 1997.
- F. A. Gers, J. Schmidhuber, F. Cummins. Learning to Forget: Continual Prediction with LSTM. Neural Computation, 2000.
- A. Gu, T. Dao. Mamba: Linear-Time Sequence Modeling with Selective State Spaces. COLM 2024. arXiv:2312.00752.
- S. Yang, B. Wang, Y. Shen, R. Panda, Y. Kim. Gated Linear Attention Transformers with Hardware-Efficient Training. ICML 2024.
- Z. Qin, S. Yang, Y. Zhong. Hierarchically Gated Recurrent Neural Network for Sequence Modeling. NeurIPS 2023.
- Z. Qin, S. Yang, W. Sun, X. Shen, D. Li, W. Sun, Y. Zhong. HGRN2: Gated Linear RNNs with State Expansion. COLM 2024. arXiv:2404.07904.
- B. Peng et al. Eagle and Finch: RWKV with Matrix-Valued States and Dynamic Recurrence. arXiv:2404.05892, 2024.
- A. Behrouz, P. Zhong, V. Mirrokni. Titans: Learning to Memorize at Test Time. NeurIPS 2025.
- S. Yang, J. Kautz, A. Hatamizadeh. Gated Delta Networks: Improving Mamba2 with Delta Rule. ICLR 2025.
