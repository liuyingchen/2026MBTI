# 部署指南 - Your 2026 Gala MBTI

## 🚀 快速部署到 Cloudflare Pages

### 步骤 1: 推送代码到 GitHub

```bash
# 在项目目录
git init
git add .
git commit -m "Initial 2026 Gala MBTI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/2026MBTI.git
git push -u origin main
```

### 步骤 2: 连接 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 左侧菜单 → "Pages"
3. 点击 "Create a project"
4. 选择 "Connect to Git"
5. 授权 GitHub 账户
6. 选择仓库 `2026MBTI`
7. 点击 "Begin setup"

### 步骤 3: 配置构建

- **Project name**: `2026-gala-mbti` (或你喜欢的名字)
- **Production branch**: `main`
- **Framework preset**: `Vue`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Environment variables**: 无需设置

### 步骤 4: 部署

1. 点击 "Save and deploy"
2. 等待构建完成 (~1-2 分钟)
3. 访问 `https://2026-gala-mbti.pages.dev`

✅ **完成！** 你的网站现在已上线。

---

## 🚀 快速部署到 GitHub Pages

### 步骤 1: 配置仓库

1. 推送代码到 GitHub（同上）
2. 进入仓库 Settings
3. 左侧 → "Pages"
4. **Source**: 选择 "Deploy from a branch"
5. **Branch**: 选择 `main` / `root`
6. 保存

### 步骤 2: 启用 GitHub Actions

项目已包含 `.github/workflows/deploy.yml`，会自动：
- 在每次 push 到 main 时触发构建
- 将 `dist/` 文件夹部署到 GitHub Pages

### 步骤 3: 访问网站

- 地址: `https://YOUR_USERNAME.github.io/2026MBTI/`
- （替换 YOUR_USERNAME 为你的 GitHub 用户名）

✅ **完成！** GitHub Actions 会自动构建和部署。

---

## 📝 两种部署方式对比

| 特性 | Cloudflare Pages | GitHub Pages |
|------|------------------|--------------|
| **设置复杂度** | 简单 | 简单 |
| **构建速度** | 快 (~30s) | 中等 (~1-2 min) |
| **自定义域名** | ✅ 支持 | ✅ 支持 |
| **SSL/HTTPS** | ✅ 免费 | ✅ 免费 |
| **全球 CDN** | ✅ Cloudflare | ❌ 限制 |
| **分析** | ✅ 内置 | ❌ 需自己配置 |
| **预算** | 免费 | 免费 |

---

## 🌐 自定义域名（可选）

### Cloudflare Pages

1. 在 Cloudflare Dashboard 中找到你的 Pages 项目
2. Settings → Custom domain
3. 输入你的域名（如 `gala-mbti.com`）
4. 按提示配置 DNS

### GitHub Pages

1. 进入仓库 Settings → Pages
2. 在 "Custom domain" 中输入域名
3. 配置 DNS A 记录指向 GitHub Pages IP
4. 等待 SSL 证书自动颁发

---

## 🔄 更新和维护

### 添加新功能或修改题目

1. 在本地修改代码
2. 提交并 push：
   ```bash
   git add .
   git commit -m "Update: Add new questions"
   git push origin main
   ```
3. Cloudflare/GitHub 会自动构建和部署

### 查看构建日志

**Cloudflare Pages**:
- Dashboard → 你的项目 → Deployments → 选择部署 → 查看日志

**GitHub Pages**:
- 仓库 → Actions → 选择工作流 → 查看日志

---

## ✅ 部署检查清单

- [ ] 代码已提交到 GitHub
- [ ] `.github/workflows/deploy.yml` 文件存在
- [ ] `package.json` 中的 build 命令正确
- [ ] `vite.config.js` 中的 base 配置正确
- [ ] 所有资源文件都在 public/ 或内联
- [ ] 没有硬编码的绝对路径
- [ ] 测试了移动端和 PC 端
- [ ] 分享功能正常工作

---

## 🆘 常见部署问题

### 问题 1: 页面加载为空或 404

**原因**: 路由配置不正确

**解决**:
- 确保 `_redirects` 文件在 Cloudflare 项目根目录
- GitHub Pages 需要 `public/404.html` 重定向

**检查**:
```bash
# Cloudflare
ls -la _redirects

# GitHub Pages
ls -la public/404.html
```

### 问题 2: 资源 404 或加载失败

**原因**: Base URL 配置错误

**解决**: 检查 `vite.config.js`
```javascript
// 本地开发
export default defineConfig({
  base: '/',  // 不设置 base
  // ...
})

// 部署到 GitHub Pages
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/2026MBTI/' : '/',
  // ...
})
```

### 问题 3: 样式或字体加载失败

**原因**: CSS/字体被 CORS 阻止

**解决**:
- 使用 Google Fonts CDN（已包含）
- 内联 SVG 而不是引用外部文件
- 检查浏览器控制台 CORS 错误

### 问题 4: 图片生成功能不工作

**原因**: html2canvas 的 CORS 问题

**解决**:
- 使用相对路径
- 确保所有资源都是 CORS 友好的
- 检查浏览器开发者工具中的网络请求

---

## 📊 性能优化

构建后的性能指标：

```
dist/
├── index.html                 0.97 kB
├── assets/
│   ├── index-xxx.css         29.20 kB (gzip: 5.76 kB)
│   └── index-xxx.js         284.06 kB (gzip: 79.97 kB)
```

### 优化建议

1. **启用 Gzip** (Cloudflare/GitHub 已默认启用)
2. **启用缓存** (设置合适的 Cache-Control 头)
3. **延迟加载** (图片使用 lazy loading)
4. **代码分割** (Vite 自动处理)

---

## 🔐 安全性考虑

这是一个完全客户端的应用，安全性很高：

- ❌ 没有后端 API
- ❌ 没有数据库
- ❌ 没有用户认证
- ✅ 所有数据都在浏览器中处理
- ✅ 所有依赖都来自可信源 (npm)

---

## 📞 获取帮助

- **Cloudflare Pages 文档**: https://developers.cloudflare.com/pages/
- **GitHub Pages 文档**: https://docs.github.com/en/pages
- **Vue 3 文档**: https://vuejs.org/
- **Vite 文档**: https://vitejs.dev/

---

**祝部署顺利！🎉**
