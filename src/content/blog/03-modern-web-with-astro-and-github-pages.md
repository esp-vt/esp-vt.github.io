---
title: "Astro와 GitHub Pages로 비용 0원 초고속 개발자 포트폴리오 & 블로그 만들기"
description: "Astro의 Content Collections, 다크/라이트 모드, 6개 국어 i18n 지원, GitHub Actions CI/CD 자동 배포까지의 모든 여정"
pubDate: 2026-03-01
tags: ["Astro", "GitHub Pages", "Web Development", "TypeScript", "CI/CD"]
featured: false
author: "Eun"
lang: "ko"
---

## 1. 왜 Astro를 선택했는가?

정적 사이트 생성기(SSG)의 생태계는 매우 다양합니다 (Next.js, Gatsby, Hugo, Jekyll 등). 그중에서 Astro를 선택한 이유는 다음과 같습니다:

1. **Zero-JS by Default**: 정적 콘텐츠 페이지에서는 브라우저로 전송되는 자바스크립트가 없어 페이지 로딩 속도가 압도적으로 빠릅니다.
2. **Content Collections**: 마크다운/MDX 파일의 Frontmatter를 Zod 스키마로 검증하여 빌드 타임에 타입 안정성을 보장합니다.
3. **컴포넌트 자유도**: React, Vue, Svelte 컴포넌트를 필요할 때만 부분 렌더링(Islands Architecture)할 수 있습니다.

---

## 2. GitHub Actions 자동 배포 파이프라인

Astro 프로젝트를 `main` 브랜치에 커밋하면 GitHub Actions가 자동으로 빌드하여 GitHub Pages에 정적 결과물을 배포합니다.

```yaml
name: Deploy Astro site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Install, build, and upload site
        uses: withastro/action@v3

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 3. 다국어(i18n) 번역 열람 지원

이번 홈페이지에는 한국어뿐만 아니라 **영어, 중국어, 일본어, 폴란드어, 스위스어(Schwiizertüütsch)**의 6개 언어로 글을 실시간 열람할 수 있는 기능이 내장되어 있습니다.

전 세계의 연구자 및 개발자들과 소통하고 연구 성과를 더 널리 공유할 수 있는 강력한 기능입니다!
