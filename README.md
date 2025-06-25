<div align="center">
  <img src="https//www.donghai.com/logo.svg" alt="Logo" width="100"> 
  <h1>东海AI Agent动态攻防推演靶场平台</h1>
  <p><strong>一个高保真的纯静态前端UI原型，旨在展示下一代网络安全演练平台的界面与交互。</strong></p>
  
  <p>
    <img alt="项目状态" src="https://img.shields.io/badge/status-archived-orange">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/your-username/your-repo-name">
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/your-username/your-repo-name">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg">
  </p>
</div>

---

## 🚀 项目简介

本项目是为"东海AI Agent动态攻防推演靶场平台"开发的纯静态前端UI原型。它从一个UI设计图出发，通过多轮迭代和精细化开发，最终构建出一个包含十多个页面的、高保真、功能丰富的Web界面。

该原型完全使用 HTML 和 CSS 构建，旨在展示平台的核心界面布局、视觉风格和交互流程，为后续的动态化开发提供一个坚实的前端基础。

## ✨ 功能特性

- 🎨 **统一的视觉风格**：采用现代化、简洁直观的设计语言，提供优秀的用户体验。
- 📚 **多页面模块**：涵盖了靶场平台的多个核心功能模块，包括：
    - `monitoring.html`: **监控面板** - 数据驱动的驾驶舱，展示KPI、图表和告警。
    - `training.html`: **实训教学** - 卡片式布局的课程中心。
    - `individual_training.html`: **单兵训练** - 包含筛选和排序功能的靶场列表。
    - `competition.html`: **攻防竞技** - 包含倒计时和实时计分板的赛事页面。
    - `red_vs_blue.html`: **红蓝对抗** - 对抗实例的卡片式管理界面。
    - `target_management.html`: **靶标管理** - 详细的靶标信息表格和状态概览。
    - `index.html`: **场景绘制** - 核心的三栏式布局，包含组件、画布和节点设置。
    - `scenario_monitoring.html`: **场景监控** - 实时监控网络拓扑。
    - `probe_management.html`: **探针管理** - 两栏式布局，管理探针节点。
    - `system_management.html`: **系统管理** - 垂直卡片式布局的系统设置中心。
    - `system_log.html`: **系统日志** - 清晰的日志展示表格。
- 📱 **响应式与自适应布局**：通过Flexbox和Grid等现代CSS技术，实现了对不同屏幕尺寸的良好适应。特别解决了全宽与限宽布局的共存问题。
- 🛠️ **高度模块化的CSS**：项目后期对CSS架构进行了重构，采用专用布局类，解决了全局样式污染问题，使代码更易于维护和扩展。

## 🛠️ 技术栈

- **HTML5**: 负责内容的语义化结构。
- **CSS3**: 负责所有的视觉样式和布局，大量使用 `Flexbox` 和 `Grid`。
- **JavaScript (ES6+)**: 预留 `js/script.js` 文件，为未来的交互动态化做准备。

## 📁 文件结构

```
.
├── css/
│   └── style.css         # 全局唯一的CSS样式文件
├── js/
│   └── script.js         # 全局JavaScript文件（目前为空，为未来功能预留）
├── index.html            # 主入口，场景绘制页面
├── monitoring.html       # 监控面板
├── training.html         # 实训教学
├── individual_training.html # 单兵训练
├── competition.html      # 攻防竞技
├── red_vs_blue.html      # 红蓝对抗
├── target_management.html # 靶标管理
├── scenario_monitoring.html # 场景监控
├── probe_management.html # 探针管理
├── system_management.html # 系统管理
├── system_log.html       # 系统日志
└── README.md             # 本说明文件
```

## ⚡️ 如何开始 (Getting Started)

本项目为纯静态网站，无需任何编译或构建步骤。

1.  克隆或下载整个项目文件夹。
2.  使用任意现代浏览器（如 Chrome, Firefox, Edge）打开项目中的任何 `.html` 文件即可进行浏览。
3.  推荐从 `index.html` 或 `monitoring.html` 开始体验。

## 🤝 贡献 (Contributing)

我们欢迎各种形式的贡献！如果您有任何改进建议或发现了问题，请随时提交 Pull Request 或创建 Issue。

1.  Fork 本仓库
2.  创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3.  提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4.  推送到分支 (`git push origin feature/AmazingFeature`)
5.  创建一个 Pull Request

## 📄 许可证 (License)

本项目采用 [MIT License](LICENSE) 授权。

---