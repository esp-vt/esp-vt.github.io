---
title: "ConfML-Trust: Hardware-Anchored Confidential ML with Verifiable Lineage"
description: "Virginia Tech 연구: TEE (AMD SEV-SNP/Intel TDX + NVIDIA Hopper H100 CC) 기반 비신뢰 ML 엔지니어링 환경에서 비우회적 데이터 프로비넌스 및 모델 가중치 무결성 검증 아키텍처"
category: "Research"
tags: ["TEE", "Confidential ML", "AMD SEV-SNP", "NVIDIA H100 CC", "Data Provenance", "PyTorch", "Security"]
github: "https://github.com/esp-vt"
paper: "#"
featured: true
order: 1
---

## Project Overview

**ConfML-Trust**는 프롬프트 인젝션이나 악의적인 수정 가능성이 있는 비신뢰 ML 엔지니어링(Untrusted ML Engineering / LLM Agent) 환경과 실제 기밀 연산 실행을 엄격하게 분리하는 하드웨어 앵커 기반 보안 프레임워크입니다.

### 핵심 아키텍처 및 기여
1. **엄격한 신뢰 경계 (Trust Boundary)**:
   - 데이터 소유자 (External Trust Anchor)
   - 비신뢰 ML 엔지니어링 (LLM Agent)
   - 기밀 클라우드 TEE 환경 (AMD SEV-SNP / Intel TDX CPU + NVIDIA Hopper H100 CC GPU, PCIe SPDM/IDE 암호화)
2. **비우회적 프로비넌스 측정 Shim (Non-Bypassable Provenance Shim)**:
   - PyTorch 하위 OS I/O 계층(VFS)에서 데이터 수집 스트림을 직접 가로채어 실시간 SHA-256 해시 및 Merkle Tree $T_{\text{data}}$ 커밋 생성
   - 학습 데이터셋과 검증 데이터셋의 격리 보장
   - 체크포인트 가중치 $H(W)$ 및 손실 감소 텐서 $\mathcal{L}$의 암호학적 기록
3. **하드웨어 원격 증명 Quote 생성**:
   - CPU TEE 하드웨어 명령(`SNP_GET_REPORT`)을 통해 6-tuple 프로비넌스 레코드 $\mathcal{P} = \langle M_{\text{boot}}, H(\mathcal{T}), H(\mathcal{C}), R_{\text{data}}, H(W), \mathcal{L} \rangle$에 하드웨어 키 서명 부여
4. **$O(|W|)$ 감사관 검증 프로토콜**:
   - 병원, 컨소시엄, 규제 기관(FDA 510(k), EU AI Act)이 모델 전달 시 변조 여부를 신속하게 검증 가능
