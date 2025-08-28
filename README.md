# 智能文档对比工具

一个功能强大的在线文档对比工具，支持文本输入和PDF文件上传，提供字词级精确差异检测和多种显示模式。

![Compare](https://github.com/ysskyboy/compare/blob/main/demo.png)

## 🌟 在线体验

访问 [https://glittery-kangaroo-adbb8a.netlify.app](https://glittery-kangaroo-adbb8a.netlify.app) 立即体验

## ✨ 主要特性

### 📝 多种输入方式
- **文本输入模式**：直接在文本框中输入或粘贴文档内容
- **PDF上传模式**：支持拖拽上传PDF文件，自动提取文本内容

### 🔍 智能差异检测
- **字词级精确标识**：不仅检测行级差异，还能精确定位到字词级别的变化
- **智能相似度算法**：基于编辑距离算法，准确识别修改、新增、删除内容
- **中文友好**：针对中文文档优化，支持中文标点符号分词

### 👀 多种显示模式
- **内联标识模式**：在统一视图中用不同颜色标识各种变化
- **并排对比模式**：左右分栏显示原始文档和目标文档，便于对照查看

### 📊 统计信息
- 实时显示新增、删除、修改的行数统计
- 直观的数据面板，快速了解文档变化概况

### 🎨 优雅的用户界面
- 现代化的设计风格，采用渐变背景和卡片布局
- 响应式设计，支持桌面端和移动端
- 丰富的视觉反馈，包括悬停效果和过渡动画

## 🚀 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式框架**：Tailwind CSS
- **图标库**：Lucide React
- **PDF处理**：PDF.js (pdfjs-dist)
- **部署平台**：Netlify

## 📦 本地开发

### 环境要求
- Node.js 16+ 
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 `http://localhost:5173` 查看应用

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 🔧 项目结构

```
src/
├── components/
│   └── PDFUploader.tsx    # PDF上传组件
├── App.tsx                # 主应用组件
├── main.tsx              # 应用入口
└── index.css             # 全局样式

public/                   # 静态资源
├── vite.svg
└── ...

dist/                     # 构建输出目录
```

## 💡 使用说明

### 文本对比
1. 选择"文本输入"模式
2. 在左侧文本框输入原始文档内容
3. 在右侧文本框输入目标文档内容
4. 选择显示模式（内联标识或并排对比）
5. 查看差异对比结果

### PDF对比
1. 选择"PDF上传"模式
2. 拖拽或点击上传原始PDF文件
3. 拖拽或点击上传目标PDF文件
4. 系统自动提取文本并进行对比
5. 查看差异对比结果

### 图例说明
- 🟢 **绿色高亮**：新增的内容
- 🔴 **红色删除线**：删除的内容  
- 🟠 **橙色标识**：修改的内容
- ⚪ **灰色显示**：未变更的内容

## 🎯 核心算法

### LCS（最长公共子序列）算法
用于检测行级别的差异，通过动态规划找出两个文档的最长公共子序列。

### 编辑距离算法
计算字符串相似度，判断两行内容是否为修改关系而非删除+新增。

### 字词级差异检测
对修改的行进行进一步分析，精确定位到字词级别的变化。

## 🌐 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 许可证

MIT License

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 GitHub Issue
- 发送邮件至项目维护者

## 🙏 致谢

感谢以下开源项目的支持：
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PDF.js](https://mozilla.github.io/pdf.js/)
- [Lucide](https://lucide.dev/)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
