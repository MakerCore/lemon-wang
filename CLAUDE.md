# lemon-wang — Claude 工作手册

## 项目现状（每次新对话先读这里）

**网站状态：已上线，正常运营**
- 生产地址：`https://www.lemon.wang`
- 最后确认上线：2026-05-28

**已发布内容**
- `content/posts/`（LabNotes 博客，英文）：
  - chinese-hardware-different-logic
  - inew3d-kickstarter-signal
  - naming-gap（2026-05-24，Mind the Product 推荐）
  - prusa-vs-bambu
  - resin-workflow-tax
  - soft-for-hard
- `content/promax/`（ProMax 专栏）：entry-001 ~ entry-003，005-factory-floor，i-dont-wake-up-on-my-own
- `content/lmt/`（Mission Tree 系列）：mdm-navigating-uncertainty

**分发渠道现状**
- 主站：✅ 运营中
- X/Twitter：状态未知（文档规划中，实际是否在发待确认）
- Substack：状态未知（文档规划有，实际是否建立待确认）
- 公众号/爱发电：状态未知（文档规划有，待确认是否启动）
- 主站 Newsletter 表单：有组件，接入邮件服务待确认

**策略文档位置**（`docs/` 目录，不在代码里）
- `docs/strategy/target-audience.md` — 目标用户画像 v2（Dragonfly/Solo Sour）
- `docs/strategy/monetization.md` — 变现方案 v2（订阅优先）
- `docs/strategy/benchmarking.md` — 竞品对标 v2
- `docs/content/premiere-piece.md` — 首发稿草稿（内容已部分过期）
- `docs/brand/` — VI 系统、MDM 方法论

---

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
