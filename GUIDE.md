# Your 2026 Gala MBTI - 快速使用指南

## 📋 项目概述

这是一个纯前端 H5 互动小游戏，用户通过答题获得个性化的春晚 MBTI 人格标签，支持分享和生成海报。

### 🌟 核心特性

- ✅ **Mobile-First 设计**: 完美适配手机和 PC 端
- ✅ **配置驱动型架构**: 题目、人格、卡片样式都可灵活修改
- ✅ **丝滑动画效果**: 题目切换、页面转换均有过渡动画
- ✅ **国际 + 国内分享**: 支持 Twitter/Facebook/WhatsApp + 长按保存海报
- ✅ **零后端**: 纯前端实现，可直接部署到 Cloudflare Pages 或 GitHub Pages

---

## 🚀 快速开始

### 1. 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
```

### 2. 构建生产版本

```bash
npm run build

# 产物输出到 dist/ 目录
```

### 3. 预览生产版本

```bash
npm run preview
```

---

## 🎯 如何修改题目和人格

### 修改题目：`src/config/quiz.config.js`

```javascript
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "你的问题",
    options: [
      { text: "选项 A", value: "A" },
      { text: "选项 B", value: "B" }
    ]
  },
  // 添加更多题目...
];
```

**注意**：
- 每个题目必须有 2 个选项（A 和 B）
- `id` 用于区分题目，值为 1-4 或更多
- `value` 必须是 "A" 或 "B"

---

### 修改人格类型：`src/config/personality.config.js`

```javascript
export const PERSONALITY_MAP = {
  // 组合代码 (如 "AAAA", "ABAB" 等)
  "AAAA": {
    name: "人格英文名",
    nameZh: "人格中文名",
    emoji: "🎤",
    description: "人格描述",
    bestWishes: "新年祝福语",
    color: "#FF6B6B",
    bgGradient: "from-red-500 to-pink-500" // Tailwind 渐变类
  },
  // 更多人格配置...
};
```

**示例人格组合**：

| 组合 | 人格 |
|------|------|
| AAAA | 吐槽弹幕机 |
| BBBB | 气氛组组长 |
| AAAB | 红包雷达 |
| ABBB | 瓜子嗑学家 |
| AABB | 平衡大师 |

---

### 修改卡片样式：`src/config/card.config.js`

```javascript
export const CARD_CONFIG = {
  card: {
    maxWidth: "400px",        // PC 端最大宽度
    borderRadius: "12px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    padding: "32px 24px"
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: "12px"
  },
  // 其他样式配置...
};
```

---

## 📁 项目结构

```
src/
├── App.vue                    # 主应用（页面状态管理）
├── components/
│   ├── LandingPage.vue        # 首页
│   ├── IntroPage.vue          # 引导页
│   ├── QuizPage.vue           # 答题页
│   ├── ResultPage.vue         # 结果页
│   └── ShareModal.vue         # 分享弹窗
├── config/
│   ├── quiz.config.js         # ⭐ 题目配置（易修改）
│   ├── personality.config.js  # ⭐ 人格配置（易修改）
│   └── card.config.js         # ⭐ 卡片样式配置（易修改）
├── utils/
│   ├── logic.js               # 业务逻辑（人格计算、分享等）
│   └── canvas.js              # 图片生成工具
├── styles/
│   └── globals.css            # 全局样式
└── main.js                    # 入口文件
```

---

## 🎨 自定义颜色和样式

### Tailwind CSS 颜色

项目使用 Tailwind CSS 4.x，颜色通过类名指定，如：

- `bg-red-500` - 红色背景
- `text-blue-600` - 蓝色文字
- `border-green-400` - 绿色边框

修改 `tailwind.config.js` 可自定义主题色。

### CSS 变量（可选）

在 `src/styles/globals.css` 中定义：

```css
:root {
  --primary-color: #dc143c;
  --secondary-color: #ffd700;
  --text-color: #333;
}
```

---

## 🌍 部署指南

### 部署到 Cloudflare Pages

1. **准备仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/2026MBTI.git
   git push -u origin main
   ```

2. **在 Cloudflare 创建项目**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 点击 "Pages" → "Create a project" → 连接 GitHub
   - 选择仓库 `2026MBTI`
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
   - 点击 "Save and Deploy"

3. **完成**
   - 你的项目将自动部署到 `https://<project-name>.pages.dev`

### 部署到 GitHub Pages

1. **启用 GitHub Actions**
   - 项目已包含 `.github/workflows/deploy.yml`
   - Push 到 main 分支自动触发部署

2. **访问你的网站**
   - 地址: `https://<your-username>.github.io/2026MBTI/`
   - 需要在仓库设置中启用 GitHub Pages

---

## 🔧 环境变量

生产环境自动设置 `GITHUB_PAGES` 环境变量，无需手动配置。

---

## 🎯 添加新的人格组合

假设你想添加一个新的人格组合 `AABA`：

1. 打开 `src/config/personality.config.js`
2. 在 `PERSONALITY_MAP` 中添加：

```javascript
"AABA": {
  name: "你的人格名",
  nameZh: "中文名",
  emoji: "🎨",
  description: "描述",
  bestWishes: "祝福语",
  color: "#YOUR_COLOR",
  bgGradient: "from-xxx to-xxx"
}
```

3. 默认的 `calculatePersonality` 函数会自动使用这个新配置

---

## 📱 移动端适配

所有页面都是 Mobile-First 设计：

- **手机端** (< 768px): 全屏显示
- **平板端** (768px - 1024px): 自适应宽度
- **PC 端** (> 1024px): 限制宽度 (max-width: 480px)，居中显示

在 `src/styles/globals.css` 中修改断点。

---

## 🐛 常见问题

### Q: 如何改变按钮颜色？
A: 修改 `src/config/personality.config.js` 中的 `color` 字段，或直接在 Vue 组件中更新类名。

### Q: 如何增加题目数量？
A: 在 `src/config/quiz.config.js` 中添加更多题目对象，确保 `id` 唯一。

### Q: 分享功能不工作？
A: 确保已启用国际分享（Twitter/Facebook/WhatsApp）或检查浏览器权限。

### Q: 卡片图片生成失败？
A: 检查浏览器控制台错误，可能是 `html2canvas` 的 CORS 问题。

---

## 📊 统计信息

- **Vue 组件**: 5 个
- **配置文件**: 3 个
- **工具函数**: 2 个
- **页面流**: 4 个 (Landing → Intro → Quiz → Result)
- **构建体积**: ~80KB (gzip)

---

## 🤝 贡献

欢迎提交问题和改进建议！

---

## 📄 许可证

MIT License

---

**祝你春晚快乐！🎉**
