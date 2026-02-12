# 🚀 快速开始 - Your 2026 Gala MBTI

## ⚡ 30秒快速启动

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 打开浏览器访问
# http://localhost:5173
```

## 📝 3步修改题目

打开 `src/config/quiz.config.js`，修改问题：

```javascript
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "🎄 你喜欢的节目类型是？", // 修改这里
    options: [
      { text: "相声小品", value: "A" }, // 和这里
      { text: "歌舞表演", value: "B" }  // 和这里
    ]
  },
  // ... 更多题目
];
```

保存后，开发服务器会自动刷新！

## 🎨 3步修改人格

打开 `src/config/personality.config.js`，修改人格配置：

```javascript
export const PERSONALITY_MAP = {
  "AAAA": {
    name: "你的名字",              // 英文名
    nameZh: "中文名字",           // 中文名
    emoji: "🎤",                  // 人格 Emoji
    description: "人格描述...",    // 描述
    bestWishes: "新年祝福...",    // 祝福语
    color: "#FF6B6B",             // 颜色代码
    bgGradient: "from-red-500 to-pink-500" // Tailwind 渐变
  },
  // ... 更多人格
};
```

## 📦 3步部署到线上

### 方案 A: Cloudflare Pages (推荐)

```bash
# 1. 推送到 GitHub
git add .
git commit -m "First commit"
git push origin main

# 2. 在 Cloudflare 连接 GitHub
# Dashboard → Pages → Connect Git
# Build: npm run build
# Output: dist

# 3. 自动部署完成！
# 访问: https://your-project.pages.dev
```

### 方案 B: GitHub Pages

```bash
# 代码推送后，自动通过 GitHub Actions 部署
# 访问: https://your-username.github.io/2026MBTI/
```

## 🎯 核心文件位置

| 文件 | 作用 | 修改频率 |
|------|------|---------|
| `src/config/quiz.config.js` | 题目 | ⭐⭐⭐ 常修改 |
| `src/config/personality.config.js` | 人格 | ⭐⭐⭐ 常修改 |
| `src/config/card.config.js` | 卡片样式 | ⭐ 少修改 |
| `src/components/*.vue` | 页面 | ❌ 基本不改 |

## 🎮 测试流程

1. **启动开发服务器**
   ```bash
   npm run dev
   ```

2. **测试页面流**
   - Landing Page → Intro Page → Quiz Page → Result Page

3. **测试分享**
   - 点击 "Save Card" 按钮
   - 手机端: 应显示 Modal + 长按提示
   - PC 端: 应直接下载 PNG

4. **测试响应式**
   - 打开开发者工具 (F12)
   - 切换移动设备视图
   - 调整浏览器窗口大小

## 🚀 构建和部署

```bash
# 生产构建
npm run build

# 预览生产版本
npm run preview

# 查看产物大小
du -sh dist/
```

## 📚 详细文档

- 🎯 **快速使用**: 参考 `GUIDE.md`
- 🌍 **部署指南**: 参考 `DEPLOYMENT.md`
- 📊 **项目总结**: 参考 `PROJECT_SUMMARY.md`

## ❓ 常见问题

**Q: 如何增加题目数量？**
A: 在 `quiz.config.js` 中继续添加题目对象。

**Q: 如何改变颜色？**
A: 修改 `personality.config.js` 中的 `color` 和 `bgGradient` 字段。

**Q: 移动端分享不工作？**
A: 检查浏览器权限，某些浏览器需要 HTTPS 才能使用分享 API。

**Q: 如何添加自己的域名？**
A: 部署后在 Cloudflare/GitHub 设置中配置自定义域名。

## ✅ 检查清单

在部署前检查：

- [ ] 修改了题目
- [ ] 修改了人格配置
- [ ] 本地测试运行无错误
- [ ] 分享功能正常
- [ ] 移动端显示正常
- [ ] PC 端显示正常

## 🎉 就这么简单！

现在你已经拥有一个完整的、可部署的 H5 游戏。

**开始吧！**

```bash
npm install && npm run dev
```

---

**更多帮助**: 参考项目根目录的文档文件
