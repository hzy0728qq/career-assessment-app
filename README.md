# ✨ AI 职业规划助手

> 移动端 PWA 网页应用,基于 React 18 + Vite 5 + Tailwind CSS
>
> 3 分钟科学测评 + AI 多维度分析 → 专属职业推荐 + PDF 报告

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat-square&logo=pwa)](https://web.dev/progressive-web-apps/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=000)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/github/license/hzy0728qq/career-assessment-app?style=flat-square)](./LICENSE)

---

## 🎯 核心特性

| 特性 | 说明 |
|------|------|
| 🧠 **AI 智能分析引擎** | 12 道专业测评题 → 6 大职业维度画像 |
| 💼 **18+ 职业方向匹配** | 技术/设计/商业/服务/研究/执行 6 大职业群,匹配度 % |
| 🌱 **可执行成长建议** | 优势与发展方向,行动落地 |
| 📄 **一键 PDF 报告** | 完整中文报告,本地导出(基于 jsPDF + html2canvas) |
| 🔒 **本地数据安全** | 所有记录存于浏览器 localStorage,不上传任何服务器 |
| 📱 **移动端优先** | 完美适配手机浏览器,iOS/Android 原生体验 |
| ⚡ **PWA 可安装** | 一键添加到主屏幕,离线可用,极速加载 |
| 🚀 **一键部署** | 支持 Vercel / Cloudflare Pages / GitHub Pages 三种主流部署 |

## 🏗 技术栈

```
React 18          → 前端 UI 框架
React Router v6   → HashRouter(零刷新 404)
Vite 5            → 开发/构建工具
Tailwind CSS 3    → 原子化样式
jsPDF             → PDF 生成
html2canvas       → PDF 渲染
localStorage      → 用户数据持久化
Service Worker    → PWA 离线支持
```

## 🧭 页面路由

| 路径(Hash) | 页面 | 功能 |
|------------|------|------|
| `#/` | 首页 | 品牌介绍 + 功能入口 + 6 维度 + FAQ + CTA |
| `#/assessment` | 测评表单 | 昵称 → 12 题多步骤 → AI 分析动画 |
| `#/result/:id` | 分析结果 | 最佳匹配职业 + 维度分 + 优势 + 建议 |
| `#/report/:id` | PDF 报告 | 预览 + 一键下载 |
| `#/history` | 历史记录 | 测评历史 / 查看 / 删除 / 清空 |
| `#/404` | 404 页 | 友好提示 + 返回 |

## 📁 项目结构

```
career-assessment-app/
├── public/                        # 静态资源(直接拷贝到 dist/)
│   ├── icons/                     # PWA 图标(SVG 矢量,任意分辨率)
│   │   ├── icon-192.svg
│   │   └── icon-512.svg
│   ├── _headers                   # Cloudflare Pages 安全头/缓存头
│   ├── _redirects                 # Cloudflare Pages SPA 路由重写
│   ├── favicon.svg
│   ├── manifest.webmanifest       # PWA manifest
│   └── sw.js                      # Service Worker(App Shell + SWR 策略)
├── src/
│   ├── data/
│   │   └── questions.js           # 12 题题库 + 6 维度 + 18 职业
│   ├── pages/
│   │   ├── HomePage.jsx           # 首页
│   │   ├── AssessmentPage.jsx     # 测评表单(多步骤)
│   │   ├── ResultPage.jsx         # AI 结果分析
│   │   ├── ReportPage.jsx         # PDF 报告生成
│   │   ├── HistoryPage.jsx        # 历史记录
│   │   └── NotFoundPage.jsx       # 404
│   ├── utils/
│   │   ├── analysis.js            # AI 评分/推荐/画像分析引擎
│   │   ├── pdfGenerator.js        # PDF 报告生成器
│   │   └── storage.js             # localStorage 持久化
│   ├── App.jsx                    # 整体布局 + 底部 TabBar
│   ├── index.css                  # Tailwind + 移动端样式 + 动画
│   └── main.jsx                   # 入口 + 路由 + PWA SW 注册
├── .github/
│   ├── workflows/deploy.yml       # CI 构建 + GitHub Pages 自动部署
│   ├── ISSUE_TEMPLATE/*           # Issues 模板
│   └── PULL_REQUEST_TEMPLATE.md   # PR 模板
├── index.html                     # HTML 入口(PWA/OG/SEO meta 齐全)
├── vercel.json                    # Vercel 一键部署配置
├── wrangler.toml                  # Cloudflare Pages 配置
├── vite.config.js                 # Vite + base:'./' 任意路径部署
├── tailwind.config.js             # Tailwind + brand 主题色
├── postcss.config.js
├── package.json
├── LICENSE                        # MIT
├── CONTRIBUTING.md                # 贡献指南
└── README.md
```

## 💻 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务
npm run dev
# → http://localhost:5173

# 3. 构建生产版本
npm run build
# → 产物输出到 dist/

# 4. 本地预览生产版本
npm run preview
```

> 需要 Node.js **>= 18**

## 🚀 部署

项目采用 **静态 SPA** 架构 + **HashRouter** + **Vite `base:'./'`**,可部署到任何静态托管平台。下面提供三种官方一键方案。

### 方案 1:Vercel(推荐)

项目根已包含 `vercel.json`。

1. **点击导入**:访问 [vercel.com/new](https://vercel.com/new) → Import 本仓库
2. **无需任何配置**,Vercel 自动识别 `vercel.json` → Deploy
3. 获得公网地址 `https://<project>.vercel.app`

### 方案 2:Cloudflare Pages(速度快、中国大陆友好)

项目根已包含 `wrangler.toml`、`public/_redirects`、`public/_headers`。

**A. 网页控制台导入**
1. [Cloudflare Pages → Create → Connect to Git](https://dash.cloudflare.com/?to=/:account/pages)
2. 选择本仓库,配置:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: 20(Environment variables 加 `NODE_VERSION=20`)
3. 点 Save and Deploy

**B. CLI 本地部署**
```bash
npm install -g wrangler
wrangler login
wrangler pages deploy dist --project-name career-assessment-app
```

### 方案 3:GitHub Pages(完全免费)

Actions 自动部署已内置在 `.github/workflows/deploy.yml`。

1. 仓库 → **Settings → Pages → Source** 选择 **GitHub Actions**
2. 推送/合并到 `main` 分支,自动构建并部署
3. 部署完成后到 **Settings → Pages** 查看 URL(`https://<user>.github.io/career-assessment-app/`)

## 📱 PWA 离线安装指南

部署完成后,用户可以:

| 平台 | 操作 |
|------|------|
| **iOS Safari** | 分享 → 添加到主屏幕 → 获得独立 App 图标 + 全屏运行 |
| **Android Chrome** | 右上角 → 安装应用 → 桌面独立图标 |
| **桌面 Chrome/Edge** | 地址栏右侧 📥 安装图标 → 作为桌面应用运行 |

特性:
- ✅ 打开即全屏、无浏览器工具栏(standalone)
- ✅ 完全离线可用(Service Worker 缓存 App Shell 与静态资源)
- ✅ 桌面快捷方式、任务栏图标
- ✅ iOS 11.3+ / Android 8+ / Windows 10+ 全支持

## 🤝 贡献

欢迎 Issue / PR!

- 🐛 遇到问题? → [提交 Bug 报告](.github/ISSUE_TEMPLATE/bug_report.md)
- 💡 有想法? → [功能建议](.github/ISSUE_TEMPLATE/feature_request.md)
- 🛠 想提交代码? → [贡献指南](CONTRIBUTING.md)

## 📄 License

[MIT](./LICENSE) © career-assessment-app

---

**Made with ❤️ · 用 AI,让职业规划更简单**
