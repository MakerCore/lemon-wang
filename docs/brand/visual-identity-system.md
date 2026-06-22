**Lemon's Visual Identity System** _存档版 v1.0 · 2026.04_

---

**色彩系统**

深色背景模式（主要）：

- 背景：`#0a0a0a`
- 主文字：`#ffffff`
- 次要文字（muted）：`#999999`（硬上限，不得低于此值）
- 极弱文字（subtle）：`#666666`
- Accent / 高亮：`#CCFF00`
- 禁止在深色背景上使用：`#333333` `#444444`（不可见）

浅色背景模式（次要）：

- 主文字：`#0a0a0a`
- 次要文字：`#444444`
- 极弱文字：`#888888`

ProMax专属色板：

- 身份色：`#CC0000`
- 背景面：`#1a0000`
- 边框：`#330000`
- 警示红：`#ff4444`

---

**字体系统**

- 标题 / 代码 / 标签：`Space Mono`
- 正文 / UI文字：`Inter`
- 中文内容：系统默认中文字体，不强制指定

---

**布局系统**

- 主布局：Bento Grid
- 卡片风格：深色底，细边框，内容密度优先
- 间距：宽松留白，不堆叠
- 圆角：保守，不过度圆润

---

**标签系统**

- 标签样式：全大写，`Space Mono`，`#CCFF00`文字或背景
- 示例：`HARDWARE` `FULL-COLOR-3D-PRINTING` `METHODOLOGY`
- 标签用途：文章分类、状态标注（LIVE / BUILDING / EXPLORING）

---

**动效 / 交互标识**

- LMT导航闪烁点：`#CCFF00` blinking dot
- Work导航红点：`#CC0000` static dot
- 链接箭头：`→`，不使用其他箭头样式

---

**图表 / 数据可视化语言（MDM视觉）**

- 背景：`#0a0a0a`
- 连线 / 节点：`#CCFF00`
- 核心节点：`#CCFF00`实心圆，黑色文字
- 分支节点：深色卡片，`#CCFF00`边框，白色文字
- 风格参考：Mission Tree扇形决策树

---

**内容标识系统**

- 系列编号格式：`#01` `#02`（Space Mono，小号）
- 分类标签格式：`METHODOLOGY` `CASE STUDY` `HARDWARE`
- 日期格式：`2026-04-26`
- 文章底部署名：`#XX · CATEGORY · Lemon's Mission Tree`

---

**ProMax视觉规则**

- 身份色全局：`#CC0000`
- 页面风格：Terminal / AI log aesthetic
- 声音：严格第三人称观察者，不得出现第一人称
- 路由：`/promax/` 独立于主站风格

---

**禁止事项**

- 深色背景上禁用`#333` `#444`作为文字色
- 禁止部署HTML文件为静态页面（上传的HTML = 设计参考，不直接deploy）
- 禁止修改`app/layout.tsx`和Navbar，除非明确授权
- 禁止emoji（除非用户主动使用）

---

**URL结构规范**

- Mission Tree文章：`/lmt/[slug]`
- ProMax文章：`/promax/[slug]`
- 工具页面：`/tools/[slug]`
- LabNotes：`/labnotes/[slug]`

---

这是当前已确认的完整视觉标准。有新增或调整随时告诉我，我更新版本号。