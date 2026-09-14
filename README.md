# ⚡ Eunseong Park - Academic Portfolio & Tech Blog (Astro + GitHub Pages)

**Eunseong Park (Virginia Tech)**의 학술 연구 포트폴리오 & 기술 블로그 웹사이트입니다. **비용 0원**으로 GitHub Pages에 자동 배포되며, **6개 국어(한국어, 영어, 중국어, 일본어, 폴란드어, 스위스어)** 실시간 다국어 지원, 다크/라이트 모드, ConfML-Trust 연구 쇼케이스, 연구 타임라인, 실시간 검색, Giscus 댓글 기능이 탑재되어 있습니다.

---

## 🌟 주요 기능

- ⚡ **Astro v5 기반 초고속 정적 사이트 (SSG)**: Zero-JS 기본 탑재로 압도적인 페이지 로딩 성능
- 🌐 **6개 국어 (i18n) 완벽 지원**:
  - 🇰🇷 한국어 (ko) / 🇺🇸 English (en) / 🇨🇳 中文 (zh) / 🇯🇵 日本語 (ja) / 🇵🇱 Polski (pl) / 🇨🇭 Schweizerdeutsch/Swiss (de-CH)
  - 헤더 언어 선택 드롭다운 & 글 실시간 다국어 번역 열람 모드 내장 (코드 블록 및 수식 완벽 보존)
- 🌓 **슬릭 다크 / 라이트 모드**: 시스템 테마 자동 감지 및 로컬 스토리지 상태 보존
- 📂 **연구 및 프로젝트 쇼케이스**: ConfML-Trust, TEE, Data Provenance, LLM LoRA 필터링
- ✍️ **마크다운/MDX 기술 블로그**: 자동 목차(TOC) 추적, 읽는 시간 계산, Shiki 코드 하이라이팅 및 원클릭 복사 버튼
- 🔍 **클라이언트 실시간 인스턴트 검색**: 게시글, 프로젝트, 기술 태그 즉시 필터링 (`Ctrl+K`)
- 💬 **Giscus 댓글 연동**: GitHub Discussions 기반의 무료 댓글 시스템
- 🚀 **GitHub Actions CI/CD 내장**: `main` 브랜치에 Push 즉시 `esp-vt.github.io`로 자동 배포

---

## 🚀 로컬 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 로컬 개발 서버 실행 (기본 포트: 4321)
npm run dev

# 3. 프로덕션 정적 빌드 테스트
npm run build

# 4. 빌드된 정적 사이트 미리보기
npm run preview
```

---

## 📦 GitHub Pages 3단계 무료 배포 가이드 (`esp-vt.github.io`)

### 1단계: GitHub 저장소(Repository) 생성
1. [GitHub (esp-vt)](https://github.com/new)에 접속하여 새 Repository를 생성합니다.
2. 저장소 이름(Repository name)을 반드시 **`esp-vt.github.io`** 로 입력합니다.
3. **Public**으로 설정하고 생성을 완료합니다.

### 2단계: 코드 푸시
로컬 프로젝트 디렉토리에서 Git을 초기화하고 GitHub에 푸시합니다:
```bash
cd /localdata/data_provenance_paper/portfolio-site
git init
git add .
git commit -m "Initial commit: Eunseong Park academic portfolio & blog"
git branch -M main
git remote add origin https://github.com/esp-vt/esp-vt.github.io.git
git push -u origin main
```

### 3단계: GitHub Pages Source 설정 활성화
1. GitHub 저장소(`https://github.com/esp-vt/esp-vt.github.io`)의 **Settings** → 좌측 **Pages** 메뉴로 이동합니다.
2. **Build and deployment** 아래의 **Source** 드롭다운 메뉴에서 **`GitHub Actions`**를 선택합니다.
3. 잠시 후 상단 **Actions** 탭에서 `Deploy Astro site to GitHub Pages` 워크플로우가 자동으로 실행되며, 완료되면 `https://esp-vt.github.io/`에서 웹사이트가 라이브 상태로 열립니다! 🎉

---

## ✍️ 콘텐츠 작성 및 관리 방법

### 새 블로그 글 작성하기
`src/content/blog/` 폴더에 `.md` 또는 `.mdx` 파일을 생성하고 아래와 같이 Frontmatter를 작성합니다:

```markdown
---
title: "새로운 기술 포스팅 제목"
description: "포스팅에 대한 요약 설명입니다."
pubDate: 2026-03-14
tags: ["Confidential ML", "TEE", "Data Provenance", "LLM"]
featured: true
author: "Eunseong Park"
lang: "ko"
---

## 1. 첫 번째 주제

여기에 마크다운 본문을 자유롭게 작성합니다.
```

### 새 프로젝트 추가하기
`src/content/projects/` 폴더에 `.md` 파일을 생성합니다:

```markdown
---
title: "연구 프로젝트 이름"
description: "연구 프로젝트에 대한 핵심 설명입니다."
category: "Research" # Research | AI & ML | Security | Fullstack
tags: ["AMD SEV-SNP", "NVIDIA H100 CC", "PyTorch"]
github: "https://github.com/esp-vt/repo"
paper: "https://arxiv.org/..."
featured: true
order: 1
---

프로젝트 세부 설명 작성...
```
