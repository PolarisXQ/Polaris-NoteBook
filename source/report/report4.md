# 人机交互开发

## 有关数据集的问题

目前的人体数据集缺乏：

- 多人全身3D姿态数据集，特别是人之间由交互的数据集。

- 单人的2D、3D很多，多人交互的要么交互不明显，要么只有2D，要么是局部的身体（比如手部）。

人体姿态估计算法：

- 有考虑人人交互的

- 有考虑人-物\场景交互的

为什么不将除了某一个人意外的所有物体一视同仁地看待，uniformly地处理所有物体？

- 物理约束一般使用损失函数来表达，比如穿透损失。也有看到用pretrain transformer来学习物理约束的。

- 多人交互关系、时间关系、空间关系等等，一般用图网络来处理。也有用transformer来处理的。

## 进度记录

10-30
- 之前的阅读缺乏目的性，没有针对要解决的问题去看，所以看了很多，但是没有深入。应该带着疑问和目的去看，这样才能有所收获。看别人怎么解决，解决的方法有没有适用的地方，有没有可以借鉴的地方，有没有可以改进的地方。

10-29
- 全方位卡住，代码跑不通，论文看不深刻，

10-27
- 用了mmdetection的几个都跑不起来，不知道是不是显存不够，wham, buddi都卡在同样的地方，配了好久环境啊啊啊，你告诉我跑不起来！
- 感觉加了生成式模型的会是一个方向，结合语义也方便，那么Closely Interactive Human Reconstruction with Proxemics and Physics-Guided Adaption的参考意义就很大，但是他这个代码不太完善啊
- MultiPhys: 作者说代码有问题，所以我复现的和论文展示的不一样 QAQ
- 用diffusion model来生成人体的3D模型的方法效果看着都很不错，指标的提升也很明显，但是diffusion我再理解一下，论文还是有点看不懂

10-25
- AE, VAE, VQ-VAE:https://blog.csdn.net/weixin_43135178/article/details/130592568
- 交互的剩下两篇有点看不懂了，代码也不是很完善，先看看其他的
- 看一下和时序相关的论文
    - WHAM: https://blog.csdn.net/v_july_v/article/details/139885526
- RNN常用于对运动、轨迹等时间序列进行处理

10-24
- 尝试训练一个Closely Interactive Human Reconstruction with Proxemics and Physics-Guided  Adaption的模型
- SMPL：人体模型，包括了人体的形状和姿态，可以用来生成人体的3D模型。建模了一个人体的3D模型，网络学习了输入体态参数如何影响输出的3D模型，学习了输入的姿势参数如何影响输出的3D模型。https://blog.csdn.net/qq_59207181/article/details/140528198
- Transformer：看了推荐的博客和一些解读的视频和文章，大概了解了transformer的原理和应用。

10-23
- interaction相关的论文快速看了一遍还不能完全理解
- MultiPhys: Multi-Person Physics-aware 3D Motion Estimation复现
  - 深度不准确，导致互动中的两个人不在同一个平面，原因是SLAHMR给出的初始值就不够好，提出的方法也不能减少深度上的错误
  - 物理引擎排斥穿透，导致人物突然抖动
  - 可以解决穿模和人物起飞的问题
  - 依赖物理引擎，难以实时

10-22
- 收集到时序上做了处理的相关论文
- 分为Interaction, Temporal, Semantic 几个方面看别人的解决方案。