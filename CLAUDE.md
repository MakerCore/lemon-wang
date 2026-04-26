# lemon-wang — Claude 工作手册

## 每次开始任务前必做
1. `git pull` 拉取最新代码
2. `git status` 确认工作区干净
3. 如有未提交改动，先问用户是否要提交，再操作

## 每次完成任务后必做
1. `git add` 所有改动（排除 `.claude/`、`tsconfig.tsbuildinfo`、`node_modules`）
2. `git commit` + `git push` — **不要用 `vercel --prod` 直接部署，走 GitHub 触发 Vercel**
3. 确认 Vercel 构建成功后再告知用户完成

## 项目部署信息
- **GitHub**: `https://github.com/MakerCore/lemon-wang`
- **Vercel 项目**: `prj_dXp7p6c9UIoBR6oEGphfbuOYLwLo`（team: `makercore-labs`）
- **部署方式**: push 到 `main` 分支 → Vercel 自动构建，无需手动 `vercel --prod`

## 目录结构说明
- `app/` — Next.js 页面（page.tsx, layout.tsx）
- `content/posts/` — Lemon's 博客（MDX）
- `content/promax/` — ProMax 专栏（MDX）
- `content/lmt/` — Lemon's Mission Tree 系列（MDX）
- `public/images/` — LMT 系列配图
- `components/` — Navbar、Footer、NewsletterForm

## 容易踩的坑
- `tsconfig.tsbuildinfo` 不要提交（自动生成）
- `.claude/` 目录不要提交
- 图片改动要同时更新 `public/` 和对应 MDX 的引用路径
- 新增 MDX 文章需要在 frontmatter 里加 `date`、`hot`（可选）字段
