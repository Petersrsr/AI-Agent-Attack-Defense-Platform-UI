# AI Agent驱动的动态攻防推演靶场平台 - 项目综合说明

## 1. 项目概述 (Project Overview)

**使命：** 打造全球领先的、基于人工智能的下一代网络安全攻防演练及推演平台。

本项目是一个超高保真的网络靶场平台，它革命性地引入了基于高级机器学习模型的 **AI Agent（人工智能代理）**，使其能够自主地、动态地模拟红队（攻击方）和蓝队（防守方）在复杂网络环境中的对抗行为。平台不仅是一个培训工具，更是一个强大的网络安全态势推演与决策支持系统，旨在为国家关键基础设施、大型企业及安全研究机构提供前所未有的实战化演练体验。

**核心价值：**
- **自动化与智能化：** 从手动攻防演练进化到由AI驱动的全自动、7x24小时不间断的持续对抗。
- **动态与真实：** 演练环境不再是静态的，而是根据真实世界的威胁情报动态演化，实现"魔高一尺，道高一丈"的持续升级。
- **预测与推演：** 不仅是复盘，更能基于现有态势，预测未来可能的攻击路径和风险点，辅助决策者制定前瞻性防御策略。

---

## 2. 核心理念与设计哲学 (Core Concepts & Design Philosophy)

- **AI驱动的自主对抗 (AI-Driven Autonomous Confrontation):**
  - **红队AI Agent：** 模拟从信息收集、漏洞利用到横向移动、数据窃取等全链路攻击行为。其行为模式基于对海量真实攻击样本（如APT攻击、勒索软件）的深度学习，具备策略多样性（如"隐蔽优先"或"速度优先"）。
  - **蓝队AI Agent：** 模拟流量监测、异常检测、威胁狩猎、事件响应与自动阻断等防御行为。其模型通过强化学习，不断优化在不同攻击下的最佳响应策略。

- **动态场景生成 (Dynamic Scenario Generation):**
  - 平台集成动态环境引擎，可持续从外部威胁情报源（CVE库、OTX等）自动拉取最新漏洞信息，并将其动态植入到虚拟靶场的相应资产中，模拟"0-day"攻击场景。网络拓扑、业务流量也会动态变化，考验AI Agent和学员的应变能力。

- **超高保真虚拟化 (High-Fidelity Virtualization):**
  - 基于Kubernetes和Kata Containers构建，能够一键生成包含Windows/Linux服务器、PC、SCADA/ICS设备、Web应用、数据库等复杂元素的企业级、行业级（如金融、电力）虚拟网络环境。所有虚拟资产均具备真实的网络堆栈和系统服务。

- **全景式可视化与深度复盘 (Panoramic Visualization & In-depth AAR):**
  - 提供电影《黑客帝国》般的上帝视角，实时可视化展示攻击路径、数据流动、防御部署和系统状态。所有事件、操作和决策都会被记录，形成可交互的时间线，供用户进行深度复盘（After-Action Review），分析成败关键。

---

## 3. 平台技术架构 (Platform Technology Architecture)

本平台采用业界前沿的云原生微服务架构，确保其高性能、高可用和高扩展性。

- **前端 (Frontend):**
  - **框架:** `React 18` + `TypeScript`
  - **状态管理:** `Redux Toolkit`
  - **可视化库:** `D3.js` 用于2D网络拓扑和攻击链可视化，`Three.js` 用于3D态势感知大屏。
  - **UI组件库:** 自定义设计的、具有科技感的`CyberUI`组件库。

- **后端微服务 (Backend Microservices):**
  - **语言:** 主力采用 `Go` 以保证高并发性能，AI部分采用 `Python`。
  - **API网关:** `Kong Gateway`，负责统一鉴权、路由和流量控制。
  - **推演引擎 (Deduction Engine):** `Go`。平台核心，负责模拟世界的"时间流逝"，管理场景状态，调度AI Agent，并实时计算攻防效果。
  - **AI Agent服务 (AI Agent Service):** `Python` + `gRPC`。提供`TensorFlow/PyTorch`模型服务接口，供推演引擎调用。
  - **场景管理服务 (Scenario Service):** `Go`。负责网络拓扑、虚拟资产、攻击/防御剧本的CRUD。
  - **虚拟化管理服务 (Virtualization Service):** `Go`。与`Kubernetes API`和`libvirt`交互，负责动态创建和销毁靶场环境。
  - **用户与授权服务 (User & Auth Service):** `Go`。管理用户、团队、角色和权限。

- **数据层 (Data Layer):**
  - **关系型数据库:** `PostgreSQL`，存储用户、场景配置等结构化数据。
  - **时序数据库:** `TimescaleDB` / `InfluxDB`，存储监控指标和性能数据。
  - **文档/日志数据库:** `Elasticsearch`，存储海量的推演过程日志，用于快速检索和分析。
  - **消息队列:** `Kafka`，用于各微服务间的异步事件通信。
  - **缓存:** `Redis`，用于缓存热点数据和会话信息。

---

## 4. 各团队参考指南 (Reference Guide for Teams)

### A. 致软件测试组

你们的测试是保障平台稳定和真实性的关键。请重点关注：
- **核心场景测试:**
  1.  **AI Agent行为验证:** 红队AI是否能按预设策略（如"APT-28模拟"）完成攻击？蓝队AI是否能在特定攻击下做出有效响应？
  2.  **推演引擎稳定性:** 在大规模网络（如1000+节点）和高强度对抗下，引擎是否会崩溃？时间同步是否精确？
  3.  **动态事件注入:** 新的CVE注入后，网络环境是否正确更新？红队AI是否能发现并利用它？
- **性能测试:** 测试万人同时在线观摩、百人同时参与对抗的场景下的系统响应时间与资源消耗。
- **数据一致性:** 验证复盘系统中的数据与推演过程中的实际发生事件是否100%一致。
- **安全测试:** 对平台自身进行渗透测试，防止"靶场被攻破"的情况发生。

### B. 致用户手册组

你们需要将这个复杂的系统以最简单易懂的方式呈现给三类主要用户：
- **学员 (Trainee):** 如何加入一场演练，如何理解态势，如何手动操作分配给自己的资产进行攻防。
- **教官 (Instructor):** 如何从场景库中选择场景并发起一场演練，如何监控学员表现，如何进行复盘讲解。
- **管理员 (Administrator):** 如何管理用户，如何创建和编辑自定义场景，如何从外部导入新的AI Agent模型。

**手册核心章节建议：**
1.  "第一次亲密接触：5分钟发起你的首次AI攻防演练"
2.  "读懂战场：态势感知大屏全解析"
3.  "成为导演：使用场景编辑器构建你的专属世界"
4.  "AI的智慧：理解并配置你的AI Agent"

### C. 致平台开发文档组

你们的文档是项目知识传承和二次开发的基础。
- **架构文档:** 详细绘制并说明微服务架构图、网络部署图和数据流图。
- **API文档:** 为每一个微服务提供详尽的`OpenAPI (Swagger)`或`gRPC Proto`文档。清晰定义每个Endpoint的请求/响应格式、参数及错误码。
- **核心算法说明:** 详细解释推演引擎的事件循环机制、AI Agent的决策模型（无需透露核心IP，但需说明原理和交互方式）。
- **开发环境搭建指南:** 提供一键式的`Docker Compose`或`Skaffold`配置，让新成员能迅速在本地启动开发环境。

### D. 致设计方案组

你们的设计定义了平台的灵魂和用户体验。
- **设计语言 (Design Language):** 秉承"赛博朋克"、"指挥中心"的美学风格。深色主题为主，用高亮的蓝、红、橙色线条和图表来传递信息，营造紧张、专业的氛围。
- **核心体验：可视化:**
  - **2D/3D切换:** 2D拓扑图清晰展示逻辑关系，3D模式提供沉浸感和视觉冲击力。
  - **信息密度与降噪:** 在呈现海量信息的同时，通过智能聚合、高亮关键路径等方式避免用户"信息过载"。
  - **动效设计:** 攻击行为（如"数据包"、"扫描波"）和防御行为（如"防火墙亮起"、"隔离区建立"）需要有直观、平滑的动画效果。
- **交互规范:** 为整个平台建立统一的交互规范，确保所有模块体验一致。重点设计场景编辑器的拖拽、连线等复杂交互。 