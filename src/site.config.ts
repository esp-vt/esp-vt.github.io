export type SupportedLanguage = 'ko' | 'en' | 'zh' | 'ja' | 'pl' | 'de-CH';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'ko', label: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'zh', label: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', label: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'pl', label: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'de-CH', label: 'Swiss German', nativeName: 'Schwiizertüütsch (CH)', flag: '🇨🇭' },
];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'ko';

export const SITE_CONFIG = {
  title: 'Eunseong Park | AI Systems & Security Researcher',
  name: 'Eunseong Park',
  koreanName: '박은성',
  role: 'Graduate Researcher / Ph.D. Student',
  affiliation: 'Virginia Tech (Department of Computer Science / ECE)',
  description: 'Researching Confidential Computing (TEE), Verifiable Data Provenance, and Trustworthy LLM Systems at Virginia Tech.',
  url: 'https://esp-vt.github.io',
  author: 'Eunseong Park',
  email: 'esp@vt.edu',
  phone: '(540) 824-9625',
  social: {
    github: 'https://github.com/esp-vt',
    linkedin: 'https://linkedin.com',
    scholar: 'https://scholar.google.com',
    twitter: 'https://x.com',
  },
  giscus: {
    repo: 'esp-vt/esp-vt.github.io',
    repoId: 'YOUR_REPO_ID',
    category: 'Announcements',
    categoryId: 'YOUR_CATEGORY_ID',
    mapping: 'pathname',
    reactionsEnabled: '1',
    theme: 'preferred_color_scheme',
  },
};

export const UI_TRANSLATIONS: Record<SupportedLanguage, Record<string, string>> = {
  ko: {
    // Nav
    'nav.home': '홈',
    'nav.projects': '연구 & 프로젝트',
    'nav.blog': '기술 블로그',
    'nav.about': '소개',
    'nav.search': '검색',

    // Hero
    'hero.greeting': '안녕하세요,',
    'hero.badge': 'Virginia Tech Graduate Researcher',
    'hero.role': 'Virginia Tech 컴퓨터공학 / ECE 대학원 연구원 (Ph.D. Student)',
    'hero.desc': '신뢰 실행 환경(TEE), 데이터 프로비넌스(Data Provenance), 기밀 컴퓨팅 및 안전한 거대 언어 모델(LLM) 시스템을 연구합니다.',
    'hero.view_projects': '연구 & 프로젝트 보기 →',
    'hero.read_blog': '기술 블로그 읽기',
    'hero.resume': '소개 & 이력서 (CV)',

    // Sections
    'section.featured_projects': '대표 연구 및 프로젝트',
    'section.featured_projects_desc': 'Virginia Tech에서 진행 중인 TEE 기반 기밀 머신러닝 및 데이터 프로비넌스 핵심 연구입니다.',
    'section.recent_posts': '최신 기술 포스팅',
    'section.recent_posts_desc': '기밀 컴퓨팅, TEE 아키텍처, 데이터 무결성 및 LLM 보안에 관한 인사이트를 공유합니다.',
    'section.tech_stack': '연구 & 엔지니어링 기술 스택',
    'section.tech_stack_desc': '시스템 보안 및 신뢰 가능한 AI 연구에 활용하는 핵심 기술입니다.',
    'section.timeline': '학력 & 연구 이력',
    'section.timeline_desc': 'Virginia Tech 및 학술/엔지니어링 여정입니다.',
    'section.all_projects': '전체 연구 보기 →',
    'section.all_posts': '전체 글 보기 →',

    // Tech Stacks
    'stack.tee': '기밀 하드웨어 & TEE',
    'stack.ai': '신뢰 가능한 AI & LLM',
    'stack.systems': '시스템 & 클라우드 보안',

    // Timeline
    'timeline.phd_title': 'Ph.D. 과정 & 대학원 연구원',
    'timeline.phd_org': 'Virginia Tech (CS / ECE)',
    'timeline.phd_desc': '하드웨어 앵커 기반 기밀 머신러닝(ConfML-Trust), 비우회적 데이터 프로비넌스 측정, AMD SEV-SNP / Intel TDX 및 NVIDIA Hopper H100 CC 연동 보안 LLM 파인튜닝 연구 수행.',
    'timeline.bs_title': '컴퓨터공학 학사 (B.S.)',
    'timeline.bs_org': '컴퓨터공학과 학부 과정',
    'timeline.bs_desc': '운영체제(OS), 컴퓨터 구조, 암호학, 분산 시스템, 네트워크 보안 및 딥러닝 알고리즘 이수.',

    // About Page
    'about.page_title': '소개 및 연구자 프로필',
    'about.intro_title': 'Introduction / 소개',
    'about.bio_p1': '안녕하세요! Virginia Tech에서 신뢰 실행 환경(Trusted Execution Environments, TEE), 기밀 컴퓨팅(Confidential Computing), 데이터 프로비넌스(Verifiable Data Provenance) 및 안전한 거대 언어 모델(Trustworthy LLMs) 시스템을 연구하고 있는 대학원 연구원 박은성 (Eunseong Park)입니다.',
    'about.bio_p2': 'AMD SEV-SNP, Intel TDX, NVIDIA Hopper H100 CC 등 최신 기밀 하드웨어를 활용하여, 비신뢰 클라우드 환경에서도 머신러닝 파이프라인의 데이터 수집부터 모델 가중치 훈련 전 과정의 기밀성(Confidentiality)과 변조 불가능한 이력(Lineage) 무결성을 하드웨어적으로 보증하는 시스템 아키텍처(ConfML-Trust)를 설계하고 있습니다.',
    'about.interests_title': 'Research Interests / 주요 연구 분야',
    'about.interest_tee_title': 'Confidential Computing & TEE',
    'about.interest_tee_desc': 'AMD SEV-SNP, Intel TDX, Intel SGX, ARM CCA 기반 하드웨어 격리 메모리 및 원격 증명(Remote Attestation)',
    'about.interest_llm_title': 'Trustworthy & Confidential LLMs',
    'about.interest_llm_desc': '비신뢰 LLM 엔지니어링 에이전트 격리, 기밀 LoRA/PEFT 파인튜닝 및 악의적 데이터 오염 방지',
    'about.interest_prov_title': 'Verifiable Data Provenance',
    'about.interest_prov_desc': 'VFS 계층 비우회적 프로비넌스 Shim, Merkle Tree 해시 체이닝 및 하드웨어 서명 Quote 기반 무결성 감사',
    'about.interest_sec_title': 'Systems Security & Cloud Infrastructure',
    'about.interest_sec_desc': 'Linux IMA / dm-verity 커널 무결성, PCIe SPDM/IDE 버스 암호화, 고성능 분산 파이프라인 엔지니어링',
    'about.pub_section_title': 'Publications & Research / 주요 논문',

    // Projects Page
    'projects.page_title': '전체 연구 & 프로젝트',
    'projects.page_desc': '신뢰 실행 환경(TEE), 머신러닝 보안, 데이터 프로비넌스 및 시스템 프로젝트입니다.',
    'projects.filter_all': '전체',
    'projects.filter_research': 'Research',
    'projects.filter_ai': 'AI & ML',
    'projects.filter_security': 'Security',
    'projects.filter_fullstack': 'Fullstack',
    'projects.live_demo': '데모 보기',
    'projects.source_code': 'GitHub',
    'projects.paper': '논문 PDF',

    // Blog Page
    'blog.page_title': '기술 블로그',
    'blog.page_desc': '연구 및 시스템 엔지니어링 과정에서 얻은 인사이트와 기술적 기록들을 공유합니다.',
    'blog.filter_all': '전체 보기',

    // Post Meta
    'post.reading_time': '분 소요',
    'post.published': '작성일:',
    'post.toc': '목차',
    'post.back': '← 목록으로 돌아가기',
    'post.comments': '댓글',
    'post.tags': '태그',
    'post.share': '이 글 공유하기',
    'post.translate_notice': '🌐 언어별 실시간 번역 열람:',
    'post.copy_link': '🔗 링크 복사',
    'post.copied': '✓ 복사 완료!',

    // Search Page
    'search.page_title': '통합 검색',
    'search.page_desc': '블로그 게시글, 프로젝트, 연구 주제를 실시간으로 검색합니다.',
    'search.placeholder': '논문, 프로젝트, 기술 스택, 키워드 검색... (Ctrl+K)',
    'search.no_results': '검색 결과가 없습니다. 다른 검색어를 입력해 보세요.',
    'search.count_prefix': '총 ',
    'search.count_suffix': '개의 결과를 찾았습니다.',
    'search.type_blog': '블로그 글',
    'search.type_project': '프로젝트',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.built_with': 'Built with Astro & GitHub Pages',
  },

  en: {
    // Nav
    'nav.home': 'Home',
    'nav.projects': 'Research & Projects',
    'nav.blog': 'Tech Blog',
    'nav.about': 'About',
    'nav.search': 'Search',

    // Hero
    'hero.greeting': 'Hello, I am',
    'hero.badge': 'Virginia Tech Graduate Researcher',
    'hero.role': 'Graduate Researcher / Ph.D. Student @ Virginia Tech (CS / ECE)',
    'hero.desc': 'Researching Trusted Execution Environments (TEE), Verifiable Data Provenance, Confidential Computing, and Trustworthy LLM Systems at Virginia Tech.',
    'hero.view_projects': 'View Research & Projects →',
    'hero.read_blog': 'Read Tech Blog',
    'hero.resume': 'About & Resume (CV)',

    // Sections
    'section.featured_projects': 'Featured Research & Projects',
    'section.featured_projects_desc': 'Core research on TEE-based confidential machine learning and data provenance verification at Virginia Tech.',
    'section.recent_posts': 'Recent Technical Articles',
    'section.recent_posts_desc': 'Deep-dives into confidential computing, TEE architectures, data lineage, and LLM security.',
    'section.tech_stack': 'Research & Engineering Stack',
    'section.tech_stack_desc': 'Core technologies utilized for systems security and trustworthy AI research.',
    'section.timeline': 'Education & Experience',
    'section.timeline_desc': 'Academic and engineering trajectory at Virginia Tech and beyond.',
    'section.all_projects': 'All Research & Projects →',
    'section.all_posts': 'All Articles →',

    // Tech Stacks
    'stack.tee': 'Confidential Hardware & TEE',
    'stack.ai': 'Trustworthy AI & LLM',
    'stack.systems': 'Systems & Cloud Security',

    // Timeline
    'timeline.phd_title': 'Ph.D. Student & Graduate Researcher',
    'timeline.phd_org': 'Virginia Tech (CS / ECE)',
    'timeline.phd_desc': 'Conducting research on hardware-anchored confidential machine learning (ConfML-Trust), non-bypassable data provenance measurement, AMD SEV-SNP / Intel TDX, and NVIDIA Hopper H100 CC integration for secure LLM fine-tuning.',
    'timeline.bs_title': 'B.S. in Computer Science & Engineering',
    'timeline.bs_org': 'Undergraduate CS Program',
    'timeline.bs_desc': 'Completed coursework in Operating Systems, Computer Architecture, Cryptography, Distributed Systems, Network Security, and Deep Learning algorithms.',

    // About Page
    'about.page_title': 'About & Researcher Profile',
    'about.intro_title': 'Introduction',
    'about.bio_p1': 'Hello! I am Eunseong Park, a Graduate Researcher and Ph.D. Student at Virginia Tech studying Trusted Execution Environments (TEE), Confidential Computing, Verifiable Data Provenance, and Trustworthy Large Language Models (LLMs).',
    'about.bio_p2': 'Leveraging modern confidential hardware including AMD SEV-SNP, Intel TDX, and NVIDIA Hopper H100 CC, I design robust system architectures (ConfML-Trust) that guarantee hardware-anchored confidentiality and immutable data lineage across untrusted cloud ML training workflows.',
    'about.interests_title': 'Research Interests',
    'about.interest_tee_title': 'Confidential Computing & TEE',
    'about.interest_tee_desc': 'Hardware-isolated memory encryption and Remote Attestation via AMD SEV-SNP, Intel TDX, Intel SGX, and ARM CCA.',
    'about.interest_llm_title': 'Trustworthy & Confidential LLMs',
    'about.interest_llm_desc': 'Untrusted ML engineering isolation, confidential LoRA/PEFT fine-tuning, and robust defense against data poisoning.',
    'about.interest_prov_title': 'Verifiable Data Provenance',
    'about.interest_prov_desc': 'Non-bypassable VFS measurement shims, streaming Merkle commitment trees, and hardware quote verification.',
    'about.interest_sec_title': 'Systems Security & Cloud Infrastructure',
    'about.interest_sec_desc': 'Linux IMA / dm-verity kernel integrity, PCIe SPDM/IDE bus encryption, and high-throughput distributed pipelines.',
    'about.pub_section_title': 'Publications & Research',

    // Projects Page
    'projects.page_title': 'All Research & Projects',
    'projects.page_desc': 'Hardware-isolated TEE, ML security, verifiable provenance, and systems engineering projects.',
    'projects.filter_all': 'All',
    'projects.filter_research': 'Research',
    'projects.filter_ai': 'AI & ML',
    'projects.filter_security': 'Security',
    'projects.filter_fullstack': 'Fullstack',
    'projects.live_demo': 'Live Demo',
    'projects.source_code': 'GitHub',
    'projects.paper': 'Paper PDF',

    // Blog Page
    'blog.page_title': 'Technical Blog',
    'blog.page_desc': 'Technical insights, system design records, and research findings in AI security.',
    'blog.filter_all': 'All Posts',

    // Post Meta
    'post.reading_time': 'min read',
    'post.published': 'Published:',
    'post.toc': 'Table of Contents',
    'post.back': '← Back to List',
    'post.comments': 'Comments',
    'post.tags': 'Tags',
    'post.share': 'Share Article',
    'post.translate_notice': '🌐 Instant Multi-Language Translation:',
    'post.copy_link': '🔗 Copy Link',
    'post.copied': '✓ Copied!',

    // Search Page
    'search.page_title': 'Global Search',
    'search.page_desc': 'Real-time search across blog posts, research projects, and technical topics.',
    'search.placeholder': 'Search papers, projects, skills, topics... (Ctrl+K)',
    'search.no_results': 'No matching results found. Try another query.',
    'search.count_prefix': 'Found ',
    'search.count_suffix': ' results.',
    'search.type_blog': 'Blog Post',
    'search.type_project': 'Project',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.built_with': 'Built with Astro & GitHub Pages',
  },

  zh: {
    // Nav
    'nav.home': '首页',
    'nav.projects': '研究与项目',
    'nav.blog': '技术博客',
    'nav.about': '关于我',
    'nav.search': '搜索',

    // Hero
    'hero.greeting': '你好，我是',
    'hero.badge': '弗吉尼亚理工大学 (Virginia Tech) 研究员',
    'hero.role': '弗吉尼亚理工大学 计算机/ECE 博士生 & 研究员',
    'hero.desc': '在弗吉尼亚理工大学专注于可信执行环境（TEE）、数据溯源（Data Provenance）、机密计算以及安全大语言模型（LLM）系统研究。',
    'hero.view_projects': '查看研究与项目 →',
    'hero.read_blog': '阅读技术博客',
    'hero.resume': '个人介绍 & 简历 (CV)',

    // Sections
    'section.featured_projects': '重点研究与项目',
    'section.featured_projects_desc': '弗吉尼亚理工大学关于基于硬件TEE的机密机器学习与数据血缘验证核心成果。',
    'section.recent_posts': '最新技术文章',
    'section.recent_posts_desc': '关于机密计算、TEE架构、数据完整性及LLM安全的深度技术解析。',
    'section.tech_stack': '研究与工程技术栈',
    'section.tech_stack_desc': '用于系统安全与可信人工智能研究的核心技术与工具。',
    'section.timeline': '教育与学术经历',
    'section.timeline_desc': '弗吉尼亚理工大学及学术工程历程。',
    'section.all_projects': '查看所有研究 →',
    'section.all_posts': '查看全部文章 →',

    // Tech Stacks
    'stack.tee': '机密硬件与TEE',
    'stack.ai': '可信AI与大语言模型',
    'stack.systems': '系统与云安全',

    // Timeline
    'timeline.phd_title': '博士研究生 & 大学院研究员',
    'timeline.phd_org': '弗吉尼亚理工大学 (CS / ECE)',
    'timeline.phd_desc': '开展基于硬件锚点的机密机器学习（ConfML-Trust）、不可绕过的数据溯源度量、AMD SEV-SNP / Intel TDX 与 NVIDIA Hopper H100 CC 联合安全微调研究。',
    'timeline.bs_title': '计算机工程学士 (B.S.)',
    'timeline.bs_org': '计算机工程专业',
    'timeline.bs_desc': '完成操作系统、计算机体系结构、密码学、分布式系统、网络安全及深度学习课程。',

    // About Page
    'about.page_title': '关于我与研究者履历',
    'about.intro_title': '个人简介',
    'about.bio_p1': '你好！我是朴恩成 (Eunseong Park)，弗吉尼亚理工大学 (Virginia Tech) 的博士研究生，主要研究可信执行环境 (TEE)、机密计算 (Confidential Computing)、可验证数据溯源 (Data Provenance) 和安全大模型系统。',
    'about.bio_p2': '依托 AMD SEV-SNP、Intel TDX、NVIDIA Hopper H100 CC 等先进硬件，我致力于设计在不可信云环境中保障全流程机密性与不可篡改血缘的系统架构 (ConfML-Trust)。',
    'about.interests_title': '主要研究方向',
    'about.interest_tee_title': '机密计算与TEE硬件隔离',
    'about.interest_tee_desc': '基于 AMD SEV-SNP、Intel TDX、Intel SGX、ARM CCA 的内存加密与远程证明 (Remote Attestation)。',
    'about.interest_llm_title': '安全可信大语言模型',
    'about.interest_llm_desc': '不可信 LLM 智能体隔离、机密 LoRA/PEFT 训练与数据投毒防护。',
    'about.interest_prov_title': '可验证数据溯源体系',
    'about.interest_prov_desc': 'VFS 层非旁路度量 Shim、Merkle 承诺树流式哈希与硬件签名 Quote 验证。',
    'about.interest_sec_title': '系统安全与云原生基础设施',
    'about.interest_sec_desc': 'Linux IMA / dm-verity 内核完整性保护、PCIe SPDM/IDE 总线硬件加密。',
    'about.pub_section_title': '学术论文与研究成果',

    // Projects Page
    'projects.page_title': '全部研究与项目',
    'projects.page_desc': '硬件隔离TEE、机器学习安全、数据溯源及系统工程项目展示。',
    'projects.filter_all': '全部',
    'projects.filter_research': '研究论文',
    'projects.filter_ai': '人工智能与ML',
    'projects.filter_security': '系统安全',
    'projects.filter_fullstack': '全栈工程',
    'projects.live_demo': '演示链接',
    'projects.source_code': 'GitHub 源码',
    'projects.paper': '论文 PDF',

    // Blog Page
    'blog.page_title': '技术博客',
    'blog.page_desc': '记录并分享系统安全、TEE架构与机器学习安全领域的工程实践与研究思考。',
    'blog.filter_all': '查看全部',

    // Post Meta
    'post.reading_time': '分钟阅读',
    'post.published': '发布日期：',
    'post.toc': '目录导航',
    'post.back': '← 返回列表',
    'post.comments': '讨论区',
    'post.tags': '标签',
    'post.share': '分享文章',
    'post.translate_notice': '🌐 实时多语言翻译阅读：',
    'post.copy_link': '🔗 复制链接',
    'post.copied': '✓ 已复制！',

    // Search Page
    'search.page_title': '全局检索',
    'search.page_desc': '实时检索文章、项目、技术栈与研究主题。',
    'search.placeholder': '搜索论文、项目、技术栈、关键词... (Ctrl+K)',
    'search.no_results': '未找到匹配结果，请尝试其他关键词。',
    'search.count_prefix': '共检索到 ',
    'search.count_suffix': ' 条结果。',
    'search.type_blog': '博客文章',
    'search.type_project': '项目成果',

    // Footer
    'footer.rights': '保留所有权利。',
    'footer.built_with': '基于 Astro 与 GitHub Pages 构建',
  },

  ja: {
    // Nav
    'nav.home': 'ホーム',
    'nav.projects': '研究・プロジェクト',
    'nav.blog': '技術ブログ',
    'nav.about': '自己紹介',
    'nav.search': '検索',

    // Hero
    'hero.greeting': 'こんにちは、',
    'hero.badge': 'バージニア工科大学 (Virginia Tech) 大学院研究員',
    'hero.role': 'バージニア工科大学 CS/ECE 博士課程・大学院研究員',
    'hero.desc': 'バージニア工科大学にて、信頼できる実行環境（TEE）、データ来歴（Data Provenance）、コンフィデンシャル・コンピューティング、安全なLLMシステムの研究を行っています。',
    'hero.view_projects': '研究とプロジェクトを見る →',
    'hero.read_blog': '技術ブログを読む',
    'hero.resume': '自己紹介と職歴 (CV)',

    // Sections
    'section.featured_projects': '代表的な研究・プロジェクト',
    'section.featured_projects_desc': 'バージニア工科大学でのTEEベース機密機械学習およびデータ来歴検証の主要研究。',
    'section.recent_posts': '最新の技術記事',
    'section.recent_posts_desc': '機密コンピューティング、TEEアーキテクチャ、データ完全性、LLMセキュリティに関する解説。',
    'section.tech_stack': '研究・技術スタック',
    'section.tech_stack_desc': 'システムセキュリティと信頼できるAI研究に活用しているコア技術群。',
    'section.timeline': '学歴・研究経歴',
    'section.timeline_desc': 'バージニア工科大学およびこれまでの学術・開発の歩み。',
    'section.all_projects': 'すべての研究を見る →',
    'section.all_posts': 'すべての記事を見る →',

    // Tech Stacks
    'stack.tee': '機密ハードウェア & TEE',
    'stack.ai': '信頼できるAI & LLM',
    'stack.systems': 'システム & クラウドセキュリティ',

    // Timeline
    'timeline.phd_title': '博士課程 & 大学院研究員',
    'timeline.phd_org': 'バージニア工科大学 (CS / ECE)',
    'timeline.phd_desc': 'ハードウェアアンカーに基づく機密機械学習(ConfML-Trust)、バイパス不可なデータ来歴計測、AMD SEV-SNP / Intel TDX および NVIDIA Hopper H100 CC を用いた安全なLLMファインチューニング研究。',
    'timeline.bs_title': 'コンピュータ工学士 (B.S.)',
    'timeline.bs_org': 'コンピュータ工学部',
    'timeline.bs_desc': 'OS、計算機アーキテクチャ、暗号学、分散システム、ネットワークセキュリティ、ディープラーニングを修了。',

    // About Page
    'about.page_title': 'プロフィールと研究業績',
    'about.intro_title': '自己紹介',
    'about.bio_p1': 'こんにちは！バージニア工科大学 (Virginia Tech) で信頼できる実行環境 (TEE)、コンフィデンシャル・コンピューティング、データ来歴保証 (Data Provenance)、安全な大規模言語モデル (LLM) システムを研究している博士課程のパク・ウンソン (Eunseong Park) です。',
    'about.bio_p2': 'AMD SEV-SNP、Intel TDX、NVIDIA Hopper H100 CC などの最先端ハードウェアを活用し、非信頼クラウド環境でもデータ収集から重み学習までの全工程で機密性と改ざん不能な来歴を保証するアーキテクチャ (ConfML-Trust) を設計しています。',
    'about.interests_title': '主な研究分野',
    'about.interest_tee_title': 'コンフィデンシャル・コンピューティング & TEE',
    'about.interest_tee_desc': 'AMD SEV-SNP、Intel TDX、Intel SGX、ARM CCA を用いたメモリ暗号化とリモート認証 (Remote Attestation)。',
    'about.interest_llm_title': '安全で信頼できる LLM システム',
    'about.interest_llm_desc': '非信頼 LLM エージェントの隔離、機密 LoRA/PEFT ファインチューニングとデータ汚染防止。',
    'about.interest_prov_title': '検証可能なデータ来歴保証',
    'about.interest_prov_desc': 'VFS 層の非バイパス計測 Shim、Merkle Tree コミットメントとハードウェア署名 Quote 監査。',
    'about.interest_sec_title': 'システムセキュリティ & クラウド基盤',
    'about.interest_sec_desc': 'Linux IMA / dm-verity カーネル完全性、PCIe SPDM/IDE バス暗号化。',
    'about.pub_section_title': '主要論文・発表',

    // Projects Page
    'projects.page_title': 'すべての研究とプロジェクト',
    'projects.page_desc': 'ハードウェアTEE、機械学習セキュリティ、データ来歴検証、システム開発。',
    'projects.filter_all': 'すべて',
    'projects.filter_research': '研究',
    'projects.filter_ai': 'AI / ML',
    'projects.filter_security': 'セキュリティ',
    'projects.filter_fullstack': 'フルスタック',
    'projects.live_demo': 'デモを見る',
    'projects.source_code': 'GitHub',
    'projects.paper': '論文 PDF',

    // Blog Page
    'blog.page_title': '技術ブログ',
    'blog.page_desc': 'AIセキュリティとシステムアーキテクチャの研究過程で得られた知見を発信します。',
    'blog.filter_all': 'すべて見る',

    // Post Meta
    'post.reading_time': '分で読めます',
    'post.published': '公開日:',
    'post.toc': '目次',
    'post.back': '← 一覧に戻る',
    'post.comments': 'コメント',
    'post.tags': 'タグ',
    'post.share': '記事を共有',
    'post.translate_notice': '🌐 リアルタイム多言語翻訳で読む:',
    'post.copy_link': '🔗 リンクをコピー',
    'post.copied': '✓ コピー完了！',

    // Search Page
    'search.page_title': '全体検索',
    'search.page_desc': '記事、プロジェクト、研究テーマをリアルタイム検索します。',
    'search.placeholder': '論文、プロジェクト、技術スタック、キーワードを検索... (Ctrl+K)',
    'search.no_results': '該当する結果がありませんでした。',
    'search.count_prefix': '',
    'search.count_suffix': ' 件の結果が見つかりました。',
    'search.type_blog': 'ブログ記事',
    'search.type_project': 'プロジェクト',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.built_with': 'Astro & GitHub Pages で構築',
  },

  pl: {
    // Nav
    'nav.home': 'Główna',
    'nav.projects': 'Badania i Projekty',
    'nav.blog': 'Blog Techniczny',
    'nav.about': 'O mnie',
    'nav.search': 'Szukaj',

    // Hero
    'hero.greeting': 'Cześć, jestem',
    'hero.badge': 'Badacz akademicki @ Virginia Tech',
    'hero.role': 'Doktorant & Badacz akademicki @ Virginia Tech (CS / ECE)',
    'hero.desc': 'Badania nad zaufanymi środowiskami wykonawczymi (TEE), weryfikowalnym pochodzeniem danych (Data Provenance), poufnym przetwarzaniem i bezpiecznymi modelami LLM w Virginia Tech.',
    'hero.view_projects': 'Zobacz badania i projekty →',
    'hero.read_blog': 'Czytaj blog techniczny',
    'hero.resume': 'O mnie i CV',

    // Sections
    'section.featured_projects': 'Wyróżnione Badania i Projekty',
    'section.featured_projects_desc': 'Kluczowe prace badawcze w Virginia Tech nad poufnym uczeniem maszynowym i weryfikacją pochodzenia danych.',
    'section.recent_posts': 'Najnowsze Artykuły Techniczne',
    'section.recent_posts_desc': 'Analizy poufnego przetwarzania, architektury TEE, integralności danych i bezpieczeństwa LLM.',
    'section.tech_stack': 'Stos Technologiczny i Badawczy',
    'section.tech_stack_desc': 'Kluczowe technologie wykorzystywane w bezpieczeństwie systemów i godnej zaufania sztucznej inteligencji.',
    'section.timeline': 'Edukacja i Doświadczenie',
    'section.timeline_desc': 'Ścieżka akademicka i inżynieryjna w Virginia Tech.',
    'section.all_projects': 'Wszystkie projekty →',
    'section.all_posts': 'Wszystkie wpisy →',

    // Tech Stacks
    'stack.tee': 'Sprzętowe TEE i Poufne Przetwarzanie',
    'stack.ai': 'Bezpieczne AI i Modele LLM',
    'stack.systems': 'Bezpieczeństwo Systemów i Chmury',

    // Timeline
    'timeline.phd_title': 'Doktorant i Badacz Akademicki',
    'timeline.phd_org': 'Virginia Tech (CS / ECE)',
    'timeline.phd_desc': 'Badania nad poufnym uczeniem maszynowym (ConfML-Trust), nieomijalnymi pomiarami pochodzenia danych, AMD SEV-SNP / Intel TDX i NVIDIA Hopper H100 CC do bezpiecznego dostrajania LLM.',
    'timeline.bs_title': 'Inżynier Informatyki (B.S.)',
    'timeline.bs_org': 'Wydział Informatyki',
    'timeline.bs_desc': 'Ukończone kursy z systemów operacyjnych, architektury komputerów, kryptografii, systemów rozproszonych i deep learningu.',

    // About Page
    'about.page_title': 'O mnie i Profil Badacza',
    'about.intro_title': 'Wprowadzenie',
    'about.bio_p1': 'Cześć! Nazywam się Eunseong Park, jestem doktorantem i badaczem w Virginia Tech, zajmującym się zaufanymi środowiskami wykonawczymi (TEE), poufnym przetwarzaniem (Confidential Computing), weryfikowalnym pochodzeniem danych (Data Provenance) oraz bezpieczeństwem dużych modeli językowych (LLM).',
    'about.bio_p2': 'Wykorzystując nowoczesny sprzęt (AMD SEV-SNP, Intel TDX, NVIDIA Hopper H100 CC), projektuję architekturę systemową (ConfML-Trust) gwarantującą sprzętową poufność i niezmienne pochodzenie danych w niezaufanych środowiskach chmurowych.',
    'about.interests_title': 'Główne Obszary Badawcze',
    'about.interest_tee_title': 'Poufne Przetwarzanie i TEE',
    'about.interest_tee_desc': 'Sprzętowo izolowana pamięć i zdalna atestacja (Remote Attestation) na AMD SEV-SNP, Intel TDX, Intel SGX i ARM CCA.',
    'about.interest_llm_title': 'Bezpieczne i Zaufane Modele LLM',
    'about.interest_llm_desc': 'Izolacja niezaufanych agentów ML, poufne dostrajanie LoRA/PEFT i ochrona przed zatruwaniem danych.',
    'about.interest_prov_title': 'Weryfikowalne Pochodzenie Danych',
    'about.interest_prov_desc': 'Nieomijalne shimy pomiarowe VFS, drzewa Merkle i audyt oparty na podpisach sprzętowych.',
    'about.interest_sec_title': 'Bezpieczeństwo Systemów i Infrastruktura',
    'about.interest_sec_desc': 'Integralność jądra Linux IMA / dm-verity oraz szyfrowanie magistrali PCIe SPDM/IDE.',
    'about.pub_section_title': 'Publikacje Naukowe',

    // Projects Page
    'projects.page_title': 'Wszystkie Badania i Projekty',
    'projects.page_desc': 'Izolowane sprzętowo TEE, bezpieczeństwo ML, integralność danych i projekty inżynieryjne.',
    'projects.filter_all': 'Wszystkie',
    'projects.filter_research': 'Badania',
    'projects.filter_ai': 'AI / ML',
    'projects.filter_security': 'Bezpieczeństwo',
    'projects.filter_fullstack': 'Fullstack',
    'projects.live_demo': 'Demo online',
    'projects.source_code': 'GitHub',
    'projects.paper': 'PDF Publikacji',

    // Blog Page
    'blog.page_title': 'Blog Techniczny',
    'blog.page_desc': 'Praktyczne wnioski, architektura systemów i notatki badawcze z zakresu bezpieczeństwa AI.',
    'blog.filter_all': 'Wszystkie wpisy',

    // Post Meta
    'post.reading_time': 'min czytania',
    'post.published': 'Opublikowano:',
    'post.toc': 'Spis treści',
    'post.back': '← Powrót do listy',
    'post.comments': 'Komentarze',
    'post.tags': 'Tagi',
    'post.share': 'Udostępnij artykuł',
    'post.translate_notice': '🌐 Natychmiastowe tłumaczenie wielojęzyczne:',
    'post.copy_link': '🔗 Kopiuj link',
    'post.copied': '✓ Skopiowano!',

    // Search Page
    'search.page_title': 'Wyszukiwarka',
    'search.page_desc': 'Wyszukiwanie wpisów, projektów i technologii w czasie rzeczywistym.',
    'search.placeholder': 'Szukaj publikacji, projektów, umiejętności... (Ctrl+K)',
    'search.no_results': 'Brak wyników. Spróbuj innego zapytania.',
    'search.count_prefix': 'Znaleziono: ',
    'search.count_suffix': ' wyników.',
    'search.type_blog': 'Wpis na blogu',
    'search.type_project': 'Projekt',

    // Footer
    'footer.rights': 'Wszelkie prawa zastrzeżone.',
    'footer.built_with': 'Zbudowano z Astro i GitHub Pages',
  },

  'de-CH': {
    // Nav
    'nav.home': 'Startsiite',
    'nav.projects': 'Forschig & Projekt',
    'nav.blog': 'Tech-Blog',
    'nav.about': 'Über mich',
    'nav.search': 'Sueche',

    // Hero
    'hero.greeting': 'Grüezi, ich bi',
    'hero.badge': 'Doktorand & Forscher @ Virginia Tech',
    'hero.role': 'Doktorand & Forscher @ Virginia Tech (CS / ECE)',
    'hero.desc': 'Forschig im Beriich Trusted Execution Environments (TEE), Verifiable Data Provenance, Confidential Computing und sicheri LLM-System a de Virginia Tech.',
    'hero.view_projects': 'Forschig & Projekt aaluege →',
    'hero.read_blog': 'Tech-Blog läse',
    'hero.resume': 'Über mich & Läbeslauf (CV)',

    // Sections
    'section.featured_projects': 'Wichtigsti Forschigsprojekt',
    'section.featured_projects_desc': 'Aktuelli Durchbrüch a de Virginia Tech i vertraulichem Machine Learning und Herkunftssicherig vo Date.',
    'section.recent_posts': 'Neusti Technischi Artikel',
    'section.recent_posts_desc': 'Tüüfi Iiblick i vertraulichs Reche, TEE-Architektur, Date-Integrität und LLM-Sicherheit.',
    'section.tech_stack': 'Forschigs- & Tech-Stack',
    'section.tech_stack_desc': 'Kerntechnologie für Systemsicherheit und vertrauenswürdigi Chünschtlichi Intelligenz.',
    'section.timeline': 'Uusbildig & Werdegang',
    'section.timeline_desc': 'Akademischi und technischi Statione a de Virginia Tech.',
    'section.all_projects': 'Alli Projekt aaluege →',
    'section.all_posts': 'Alli Biiträg aaluege →',

    // Tech Stacks
    'stack.tee': 'Vertraulichi Hardware & TEE',
    'stack.ai': 'Vertrauenswürdigi AI & LLM',
    'stack.systems': 'System- & Cloud-Sicherheit',

    // Timeline
    'timeline.phd_title': 'Doktorand & Akademische Forscher',
    'timeline.phd_org': 'Virginia Tech (CS / ECE)',
    'timeline.phd_desc': 'Forschig a hardware-gsicheretem vertraulichem Machine Learning (ConfML-Trust), nöd umgehbare Date-Herkunftsmässige, AMD SEV-SNP / Intel TDX und NVIDIA Hopper H100 CC für sichers LLM-Finatuning.',
    'timeline.bs_title': 'Bachelor i Informatik (B.S.)',
    'timeline.bs_org': 'Informatik-Studium',
    'timeline.bs_desc': 'Betriebssystem, Rechnerarchitektur, Kryptographie, verteilti System, Netzwerksicherheit und Deep Learning abgschlosse.',

    // About Page
    'about.page_title': 'Über mich & Forscher-Profil',
    'about.intro_title': 'Iifüehrig',
    'about.bio_p1': 'Grüezi! Ich bi de Eunseong Park, Doktorand und Forscher a de Virginia Tech. Mini Forschigsschwerpünkt sind Trusted Execution Environments (TEE), Confidential Computing, Verifiable Data Provenance und vertrauenswürdigi LLM-System.',
    'about.bio_p2': 'Mit modernschter Hardware wie AMD SEV-SNP, Intel TDX und NVIDIA Hopper H100 CC entwickle ich System-Architekture (ConfML-Trust), wo Vertraulichkeit und unmanipulierbari Herkunft vo Date i unsichere Cloud-Umgebige garantiere.',
    'about.interests_title': 'Haupt-Forschigsgebiet',
    'about.interest_tee_title': 'Confidential Computing & TEE',
    'about.interest_tee_desc': 'Hardware-isolierti Speicherverschlüsselig und Remote Attestation mit AMD SEV-SNP, Intel TDX, Intel SGX und ARM CCA.',
    'about.interest_llm_title': 'Sicheri & Vertrauenswürdigi LLMs',
    'about.interest_llm_desc': 'Isolierig vo unsichere LLM-Agente, vertraulichs LoRA/PEFT Finetuning und Schutz vor Date-Vergiftig.',
    'about.interest_prov_title': 'Verifizierbari Date-Herkunft (Provenance)',
    'about.interest_prov_desc': 'VFS-Mäss-Shims, Merkle-Commitment-Bäum und hardware-signierti Quotes für Audits.',
    'about.interest_sec_title': 'Systemsicherheit & Cloud-Infrastruktur',
    'about.interest_sec_desc': 'Linux IMA / dm-verity Kernel-Integrität und PCIe SPDM/IDE Bus-Verschlüsselig.',
    'about.pub_section_title': 'Publikatione & Forschigsergebnis',

    // Projects Page
    'projects.page_title': 'Alli Forschigsprojekt',
    'projects.page_desc': 'Hardware-isolierti TEEs, ML-Sicherheit, Date-Herkunft und Systemtechnik-Projekt.',
    'projects.filter_all': 'Alli',
    'projects.filter_research': 'Forschig',
    'projects.filter_ai': 'AI / ML',
    'projects.filter_security': 'Sicherheit',
    'projects.filter_fullstack': 'Fullstack',
    'projects.live_demo': 'Live-Demo',
    'projects.source_code': 'GitHub',
    'projects.paper': 'Paper PDF',

    // Blog Page
    'blog.page_title': 'Tech-Blog',
    'blog.page_desc': 'Praktischi Erfahrige, System-Architektur und Forschigsnotize über AI-Security.',
    'blog.filter_all': 'Alli Biiträg',

    // Post Meta
    'post.reading_time': 'Min. Leseziit',
    'post.published': 'Veröffentlicht:',
    'post.toc': 'Inhaltsverzeichnis',
    'post.back': '← Zrugg zur Übersicht',
    'post.comments': 'Kommentär',
    'post.tags': 'Tags',
    'post.share': 'Biitrag teile',
    'post.translate_notice': '🌐 Sofortigi Übersetzig i anderi Sproche:',
    'post.copy_link': '🔗 Link kopiere',
    'post.copied': '✓ Kopiert!',

    // Search Page
    'search.page_title': 'Gsamti Suechi',
    'search.page_desc': 'Suech i Echtziit nach Blog-Biiträg, Forschigsprojekt und Skills.',
    'search.placeholder': 'Publikatione, Projekt, Skills sueche... (Ctrl+K)',
    'search.no_results': 'Kei Treffer gfunde. Probier en andere Begriff.',
    'search.count_prefix': 'Gfunde: ',
    'search.count_suffix': ' Treffer.',
    'search.type_blog': 'Blog-Biitrag',
    'search.type_project': 'Projekt',

    // Footer
    'footer.rights': 'Alli Rächt vorbehalte.',
    'footer.built_with': 'Erstellt mit Astro & GitHub Pages',
  },
};
