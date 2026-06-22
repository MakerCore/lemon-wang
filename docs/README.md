# lemon.wang — 项目文档索引

## 品牌基础 (`brand/`)

| 文件 | 说明 |
|------|------|
| [visual-identity-system.md](brand/visual-identity-system.md) | VI 视觉识别系统 — 色彩、字体、排版规范 |
| [mission-definition-method.md](brand/mission-definition-method.md) | MDM 使命定义方法论 — Lemon 品牌核心叙事框架 |
| [theme-tokens-VIS-v1.0.tsx](brand/theme-tokens-VIS-v1.0.tsx) | **Design token 标准源** — Lemon VIS v1.0 完整色彩变量（暗/亮双模式）⚠️ 注意：网站 globals.css 的 accent 用的是旧值 #7CB800，此文件才是标准 |

## 策略 (`strategy/`)

| 文件 | 说明 |
|------|------|
| [target-audience.md](strategy/target-audience.md) | 目标受众画像 v2 |
| [monetization.md](strategy/monetization.md) | 变现方案 v2 |
| [benchmarking.md](strategy/benchmarking.md) | 竞品对标分析 v2 |

## 内容 (`content/`)

| 文件 | 说明 |
|------|------|
| [premiere-piece.md](content/premiere-piece.md) | 首发内容草稿 |

---

## 网站代码结构

```
app/          Next.js 页面 (page.tsx, layout.tsx)
components/   Navbar、Footer、NewsletterForm
content/
  posts/      博客文章 (MDX)
  promax/     ProMax 专栏 (MDX)
  lmt/        Lemon's Mission Tree 系列 (MDX)
lib/          工具函数
public/       静态资源 (images/)
```

部署：push to `main` → Vercel 自动构建（项目 ID: `prj_dXp7p6c9UIoBR6oEGphfbuOYLwLo`）
