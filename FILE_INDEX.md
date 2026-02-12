# 📂 项目文件索引 - Your 2026 Gala MBTI

## 📖 文档文件（优先阅读）

| 文件 | 用途 | 阅读时间 |
|------|------|---------|
| **QUICKSTART.md** | ⚡ 30秒快速启动 | 2分钟 |
| **GUIDE.md** | 📝 详细使用指南 | 10分钟 |
| **DEPLOYMENT.md** | 🌍 部署指南 | 10分钟 |
| **PROJECT_SUMMARY.md** | 📊 项目完成情况总结 | 15分钟 |
| **FILE_INDEX.md** | 📂 本文件 | 3分钟 |

---

## 🎯 3个配置文件（最常修改）

### 1️⃣ `src/config/quiz.config.js` - 题目配置
- 📍 **行数**: 40 行
- ⭐ **修改频率**: 很高
- 📝 **内容**: 4道测试题配置

### 2️⃣ `src/config/personality.config.js` - 人格配置
- 📍 **行数**: 200 行
- ⭐ **修改频率**: 很高
- 📝 **内容**: 12+ 种人格定义

### 3️⃣ `src/config/card.config.js` - 卡片样式
- 📍 **行数**: 65 行
- ⭐ **修改频率**: 低
- 📝 **内容**: 卡片 CSS 配置

---

## 🎨 5个 Vue 组件（页面）

| 组件 | 功能 | 行数 |
|------|------|------|
| `LandingPage.vue` | 首页 + 呼吸动效 | 95 |
| `IntroPage.vue` | 引导页 | 65 |
| `QuizPage.vue` | 答题页 + 滑动动画 | 160 |
| `ResultPage.vue` | 结果页 + 分享 | 210 |
| `ShareModal.vue` | 分享弹窗 | 130 |

---

## 🛠️ 2个工具函数

### `src/utils/logic.js` - 业务逻辑 (80行)
- `getPersonalityResult()` - 根据答案计算人格
- `detectDevice()` - 检测设备类型
- `generateTwitterShareLink()` - 生成分享链接
- 其他分享函数...

### `src/utils/canvas.js` - 图片生成 (55行)
- `generateCardImage()` - 使用 html2canvas 生成图片
- `downloadImage()` - 下载图片到本地
- `generateShareText()` - 生成分享文本

---

## 🎯 主应用

### `src/App.vue` - 主应用 (130行)
- 页面状态管理 (landing/intro/quiz/result)
- 页面流程控制
- 人格配置传递

### `src/main.js` - 入口 (3行)
- Vue 应用初始化

### `src/styles/globals.css` - 全局样式 (120行)
- Tailwind CSS 导入
- 全局样式变量
- 响应式断点
- 动画定义

---

## 🔧 4个配置文件

| 文件 | 用途 |
|------|------|
| `vite.config.js` | Vite 构建配置 |
| `tailwind.config.js` | Tailwind CSS 配置 |
| `postcss.config.js` | PostCSS 配置 |
| `index.html` | HTML 入口 + Meta 标签 |

---

## 📦 3个部署文件

| 文件 | 用途 |
|------|------|
| `_redirects` | Cloudflare Pages 路由 |
| `public/404.html` | GitHub Pages 路由 |
| `.github/workflows/deploy.yml` | GitHub Actions 自动部署 |

---

## 📊 项目统计

- **总代码行数**: 1,332 行
- **Vue 组件**: 5 个
- **配置文件**: 3 个
- **工具函数**: 2 个
- **页面**: 4 个
- **人格类型**: 12+ 个
- **测试题**: 4 个
- **构建体积**: ~86 KB (gzip)

---

## 🚀 快速导航

| 需求 | 文件 |
|------|------|
| 修改题目 | `src/config/quiz.config.js` |
| 修改人格 | `src/config/personality.config.js` |
| 改变颜色 | `src/config/personality.config.js` |
| 改变文案 | 各个 `.vue` 组件 |
| 了解使用 | `GUIDE.md` |
| 部署到线上 | `DEPLOYMENT.md` |

---

## 📚 推荐阅读顺序

1. `QUICKSTART.md` - 2分钟快速入门
2. `PROJECT_SUMMARY.md` - 了解项目全貌
3. `GUIDE.md` - 学习如何修改
4. `DEPLOYMENT.md` - 部署到线上

---

**祝你使用愉快！🎉**
