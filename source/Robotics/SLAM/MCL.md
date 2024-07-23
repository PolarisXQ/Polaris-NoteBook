# Monte Carlo Localization

权威阐述见《概率机器人》第8章，移动机器人定位:栅格与蒙特卡罗。是基于粒子滤波的定位算法。

## 蒙特卡洛（Monte Carlo）方法+重要性采样的思想

[AMCL深入解析 1/4 - 蒙特卡洛估计](https://zhuanlan.zhihu.com/p/676811249)

## 粒子滤波(没懂啊🙄)

贝叶斯滤波的思路是：给定一个状态空间，一个观测空间，一个状态转移概率，一个观测概率，一个初始状态概率，然后通过观测数据来更新状态概率。

但是贝叶斯滤波的问题在于：如果状态空间是连续的，那么状态空间的维度会非常高，而且状态空间的分布可能是非高斯的，这样的话，贝叶斯滤波就很难求解了。

最复杂的情况是非线性-非高斯情况，那么就需要用到粒子滤波了。其是一种无参滤波，对于待估计状态的后验概率密度函数不作任何假设，通过大量采样来逼近这个函数分布。

[particle filtering---粒子滤波（讲的很通俗易懂）](https://blog.csdn.net/piaoxuezhong/article/details/78619150)

## 蒙特卡洛定位（Monte Carlo Localization，MCL）& 自适应蒙特卡洛定位（Adaptive Monte Carlo Localization，AMCL）

MCL是基于SIR滤波的定位算法。

<img src="./pic/MCL.png" width="40%"/>

但实际应用时，MCL仍存在三个问题：

1. 无法解决机器人绑架问题；
2. 粒子数无法动态调整，存在冗余问题；
3. 在动态环境中定位失败问题；

增强蒙特卡洛定位（Augmented_MCL，AMCL）算法在MCL的基础上，针对上述问题提出了对应的解决方案，使得其成为机器人领域一个非常基础但实用的算法。

AMCL通过引入随机粒子来解决问题1（机器人绑架问题），引入KLD采样来解决问题2（粒子冗余问题），引入传感器模型来解决问题3（动态环境问题）。

[AMCL深入解析 3/4 - 解决的核心问题](https://zhuanlan.zhihu.com/p/677140623)