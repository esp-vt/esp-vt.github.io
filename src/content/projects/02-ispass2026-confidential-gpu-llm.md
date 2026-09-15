---
title: "An Empirical Study of LLM Serving in Confidential GPUs"
description: "ISPASS 2026 Best Paper Honorable Mention 🏆: NVIDIA H100 TEE 환경에서 vLLM 및 SGLang 거대 언어 모델(LLM) 서빙의 하드웨어 암호화 오버헤드, Chunked Prefill, PagedAttention 및 Speculative Decoding 성능 심층 실측 분석"
category: "Research"
tags: ["Confidential Computing", "NVIDIA H100 CC", "LLM Serving", "vLLM", "SGLang", "ISPASS 2026", "Best Paper"]
github: "https://github.com/bearhw/Confidential-GPU-LLM-Serving-Performance-Profiling"
paper: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=4wkSQnMAAAAJ&citation_for_view=4wkSQnMAAAAJ:UebtZRa9Y70C"
slides: "https://docs.google.com/presentation/d/1UUo_bHe7imxecGs0XmJohEujCWnUzAihfuSSOhF4uhM/edit?usp=sharing"
featured: true
order: 2
---

## 🏆 Award & Honors

> **Best Paper Honorable Mention** @ IEEE International Symposium on Performance Analysis of Systems and Software (**ISPASS 2026**)

---

## 📖 Research Overview

본 연구는 기밀 컴퓨팅(Confidential Computing, CC) 하드웨어 환경인 **NVIDIA Hopper H100 GPU (TEE 모드)** 상에서 최신 대규모 언어 모델(LLM) 서빙 시스템(**vLLM**, **SGLang**)을 구동할 때 발생하는 하드웨어 암호화 및 메모리 격리 오버헤드를 체계적으로 프로파일링하고 실측 분석한 최초의 심층 실증 연구(Empirical Study)입니다.

---

## ⚡ 주요 연구 내용 및 분석 항목

1. **Confidential GPU 하드웨어 오버헤드 정량화**:
   - TEE 메모리 암호화(HBM3) 및 PCIe SPDM/IDE 버스 보안 프로토콜이 Prefill 및 Decode 단계의 처리량(Throughput)과 Time-to-First-Token(TTFT)에 미치는 영향 분석
2. **LLM 서빙 프레임워크 벤치마킹 (vLLM vs SGLang)**:
   - Chunked Prefill 기법
   - PagedAttention 및 KV 캐시 메모리 관리 오버헤드
   - Speculative Decoding(추측 디코딩) 기법 적용 시 기밀 환경에서의 가속 효율 실측
3. **재현 가능한 오픈소스 아티팩트 제공**:
   - [GitHub Repository](https://github.com/bearhw/Confidential-GPU-LLM-Serving-Performance-Profiling)를 통해 CC 및 Non-CC 환경의 비교 벤치마크 스크립트와 프로파일링 도구 전체 공개

---

## 🔗 관련 링크

- **Google Scholar**: [Paper Citation](https://scholar.google.com/citations?view_op=view_citation&hl=en&user=4wkSQnMAAAAJ&citation_for_view=4wkSQnMAAAAJ:UebtZRa9Y70C)
- **Presentation Slides**: [Google Slides](https://docs.google.com/presentation/d/1UUo_bHe7imxecGs0XmJohEujCWnUzAihfuSSOhF4uhM/edit?usp=sharing)
- **GitHub Artifact**: [bearhw/Confidential-GPU-LLM-Serving-Performance-Profiling](https://github.com/bearhw/Confidential-GPU-LLM-Serving-Performance-Profiling)
