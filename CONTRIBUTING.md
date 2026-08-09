# 贡献指南

## 开发环境
- Node.js >= 18
- npm 或 pnpm

## 常用命令
```bash
npm install       # 安装依赖
npm run dev       # 本地开发:http://localhost:5173
npm run build     # 生产构建,输出到 dist/
npm run preview   # 本地预览生产构建
```

## 代码规范
- 使用 React Hooks 函数组件
- 样式基于 Tailwind CSS,组件层面避免自定义 CSS
- 文件命名:PascalCase(组件/页面)、camelCase(工具/工具函数)

## 提交规范
参考 Conventional Commits:
- `feat:` 新功能
- `fix:` 修复
- `docs:` 文档
- `style:` 样式
- `refactor:` 重构
- `perf:` 性能
- `test:` 测试
- `build:` 构建/部署
- `ci:` CI/CD
