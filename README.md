<div align="center">
  <a href="https://github.com/Cain-Y/AI-Agent-Attack-Defense-Platform-UI">
    <img src="https://socialify.git.ci/Cain-Y/AI-Agent-Attack-Defense-Platform-UI/image?description=1&font=Inter&forks=1&issues=1&language=1&name=1&owner=1&pattern=Solid&pulls=1&stargazers=1&theme=Dark" alt="AI-Agent-Attack-Defense-Platform-UI" width="640" height="320" />
  </a>
  <h1>东海 AI Agent 动态攻防推演靶场平台</h1>
  <p><strong>一个基于 AI Agent 的下一代网络安全演练平台 - 高保真纯静态前端 UI 原型</strong></p>
  <br/>
  <p>
    <a href="https://github.com/Cain-Y/AI-Agent-Attack-Defense-Platform-UI/pulse"><img alt="Activity" src="https://img.shields.io/github/commit-activity/m/Cain-Y/AI-Agent-Attack-Defense-Platform-UI?style=for-the-badge&color=d47000&label=COMMIT%20ACTIVITY"></a>
    <a href="#"><img alt="Status" src="https://img.shields.io/badge/status-active-success.svg?style=for-the-badge"></a>
    <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge"></a>
    <a href="#"><img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Cain-Y/AI-Agent-Attack-Defense-Platform-UI?style=for-the-badge"></a>
  </p>
</div>

---

## 🚀 项目简介 (About The Project)

**[东海] AI Agent 动态攻防推演靶场平台** 是一款前瞻性的网络安全演练工具，其前端UI原型旨在提供无与伦比的态势感知能力和直观的操作体验。本项目是一个 **纯静态、高保真** 的前端实现，它不仅展示了一个复杂网络安全平台的完整界面与交互流程，更创新性地集成了 **AI 驱动的工作流**，将安全场景的构建从数小时缩短至几分钟。

我们相信，未来的网络安全将是人机协同的时代。此项目正是这一理念的具象化展示，为开发者、研究人员和安全专家提供了一个可触摸、可交互的未来平台蓝图。

> **[💡 核心设计哲学]**：*数据驱动、AI 赋能、极致体验*

### ✨ 主要亮点 (Key Features)

*   **🤖 AI 场景生成 (AI-Powered Scenario Generation)**
    *   通过与大语言模型 (LLM) 的自然语言对话，自动生成专业、复杂的网络攻防拓扑和攻击链。
    *   支持对 AI 生成方案的 **即时预览、编辑和采纳**，形成从创意到部署的完整闭环。

*   **🌐 动态拓扑与监控 (Dynamic Topology & Monitoring)**
    *   **实时监控大盘**: 以数据驾驶舱的形式，聚合展示平台核心 KPI、服务健康度、资源利用率和实时告警。
    *   **可视化场景监控**: 在 `scenario_monitoring.html` 中，以交互式网络拓扑图生动展示攻击路径、节点状态和实时事件流。

*   **💎 模块化与一致性体验 (Modular & Consistent UX)**
    *   **统一的创建流程**: 在“场景管理”、“靶标管理”和“红蓝对抗”等多个模块中，实现了统一的“模态框创建 -> 动态列表更新”的非刷新式交互，体验流畅。
    *   **清晰的导航结构**: 全站采用一致的侧边栏导航，确保用户在不同功能模块间无缝切换。

*   **🛠️ 现代化技术栈 (Modern Tech Stack)**
    *   **纯粹的 Vanilla JS**: 无任何前端框架依赖，代码轻量、透明，易于理解和集成。
    *   **灵活的 CSS 布局**: 大量使用 Flexbox 和 Grid，确保在各种屏幕分辨率下均有优雅的布局表现。

---

## 演示 (Live Demo)

[![Project Demo GIF](https://raw.githubusercontent.com/Cain-Y/AI-Agent-Attack-Defense-Platform-UI/main/demo.gif "项目功能演示")](https://cain-y.github.io/AI-Agent-Attack-Defense-Platform-UI/monitoring.html)

> *👆 点击上方 GIF 可跳转至**在线演示 (Live Demo)**。*

---

## 🛠 技术栈 (Tech Stack)

| 技术 | 描述 |
| :--- | :--- |
| **HTML5** | 语义化页面结构 |
| **CSS3** | 视觉样式、深色主题、Flexbox/Grid 布局 |
| **JavaScript (ES6+)** | 动态交互、DOM 操作、API (Fetch) 调用 |

---

## 🚀 快速开始 (Getting Started)

本项目为纯静态资源，无需安装任何依赖或构建步骤。

1.  克隆仓库:
    ```sh
    git clone https://github.com/Cain-Y/AI-Agent-Attack-Defense-Platform-UI.git
    ```
2.  进入项目目录:
    ```sh
    cd AI-Agent-Attack-Defense-Platform-UI
    ```
3.  在浏览器中打开任意 `html` 文件即可开始体验。
    *   **推荐入口**:
        *   `monitoring.html` (体验监控大盘)
        *   `scenario_management.html` (体验 AI 场景生成)

---

## 🗺️ 路线图 (Roadmap)

我们对项目的未来充满期待！以下是我们规划中的一些关键特性，欢迎社区与我们共同实现：

- [ ] **Phase 1: 交互全面动态化**
    - [ ] 将所有静态列表（如靶标、对抗实例）替换为由 `js/script.js` 动态渲染。
    - [ ] 实现前端路由，构建单页面应用 (SPA) 体验。
- [ ] **Phase 2: 后端 API 对接**
    - [ ] 设计并定义全套后端 API 接口规范。
    - [ ] 将前端所有数据操作（增删改查）与真实后端 API 对接。
- [ ] **Phase 3: AI 能力增强**
    - [ ] **AI 评估与校验**: 引入 AI Agent 对用户绘制或生成的场景进行脆弱性评估和逻辑校验。
    - [ ] **自然语言操控**: 实现通过自然语言指令对拓扑图进行节点增删、连线等操作。
- [ ] **Phase 4: 协同与可视化**
    - [ ] **多人实时协同**: 支持多用户在同一画布上进行场景绘制。
    - [ ] **3D 可视化引擎**: 引入 WebGL/Three.js，对关键攻击路径和数据流动进行 3D 可视化。

查看 [open issues](https://github.com/Cain-Y/AI-Agent-Attack-Defense-Platform-UI/issues) 获取更详细的功能列表和已知问题。

---

## 📁 项目结构 (Project Structure)

```