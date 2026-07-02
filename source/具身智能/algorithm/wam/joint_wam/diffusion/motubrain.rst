MotuBrain
========================================

MotuBrain 是什么
----------------------------------------

MotuBrain 来自论文《MotuBrain: An Advanced World Action Model for Robot Control》，是 Motus 之后进一步扩展的统一 World Action Model。

它的目标是构建一个更强、更可部署的机器人世界动作模型：

**在同一个模型里联合处理视频生成、动作生成、世界建模、逆动力学和多机器人 embodiment 迁移。**

.. image:: pic/unified_wam_modes.svg
   :width: 88%
   :align: center

为什么提出 MotuBrain
----------------------------------------

Motus 已经展示了统一 latent action world model 的价值，但真实机器人部署还需要更多能力：

- 多视角建模。
- 语言和动作更强耦合。
- 跨 embodiment 的动作表示。
- 长时序真实控制。
- 更快推理速度。

MotuBrain 可以看作在 Motus 基础上的工程化和规模化升级，目标是让统一 WAM 更接近真实可用。

核心技术讲解
----------------------------------------

UniDiffuser 统一建模
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MotuBrain 继续使用 UniDiffuser 风格的统一建模思想。一个模型可以根据条件切换不同模式：

- 只做视频生成。
- 只预测动作。
- 同时预测视频和动作。
- 根据前后帧推断隐含动作。
- 做世界模型 rollout。

这比为每个任务训练一个独立模型更统一，也更容易利用异构数据。

三流 Mixture-of-Transformers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MotuBrain 使用 three-stream MoT 架构。可以理解为三个信息流：

- 视觉/视频流。
- 动作流。
- 文本/语言流。

独立文本流能增强语言和动作之间的耦合，让模型更好地理解任务指令如何影响动作。

多视角与跨 embodiment 动作表示
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

真实机器人常有多个相机，MotuBrain 引入 unified multiview modeling 来整合多视角信息。

同时，它采用统一的跨 embodiment 动作表示，目标是让模型学习不同机器人之间可迁移的控制规律，而不是死记某一个机械臂的动作格式。

部署加速
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MotuBrain 很强调推理效率。论文中提到使用多种工程优化：

- step reduction。
- compilation。
- FP8 quantization。
- DiT caching。
- action-only inference。
- chunked closed-loop execution。

这些优化共同服务一个目标：让大型 WAM 真正能在真实机器人上实时运行。

和 Motus 的关系
----------------------------------------

.. list-table::
   :header-rows: 1
   :widths: 22 38 40

   * - 模型
     - 核心贡献
     - 直觉
   * - Motus
     - 统一 latent action world model
     - 把理解、视频、动作放进统一模型
   * - MotuBrain
     - 多视角、跨 embodiment、部署优化
     - 把统一 WAM 推向真实机器人部署

和具身智能的关系
----------------------------------------

具身智能最终需要能适应不同机器人、不同场景、不同任务。MotuBrain 的价值在于尝试把这些能力放进一个统一模型中。

它适合研究：

- 跨机器人迁移。
- 长时序操控。
- 多视角感知与动作生成。
- 视频数据、机器人数据、语言数据的统一使用。

局限
----------------------------------------

- 系统非常复杂，复现成本高。
- 对数据规模和数据质量要求高。
- 统一模型可能带来训练稳定性问题。
- 跨 embodiment 表示仍是难题，不同机器人动力学差异很大。

小结
----------------------------------------

MotuBrain 的核心思想是：**在 Motus 的统一 WAM 基础上加入多视角、语言流、跨 embodiment 动作表示和部署优化，让世界动作模型更接近真实机器人控制。**

参考
----------------------------------------

- MotuBrain Team et al., `MotuBrain: An Advanced World Action Model for Robot Control <https://arxiv.org/abs/2604.27792>`_, 2026.
