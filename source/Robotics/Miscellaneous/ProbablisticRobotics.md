# Probablistic Robotics

第Ⅰ部分 基础知识
第1章 绪论 1
1.1 机器人学中的不确定性 1
1.2 概率机器人学 2
1.3 启示 6
1.4 本书导航 7
1.5 概率机器人课程教学 7
1.6 文献综述 8
第2章 递归状态估计 10
2.1 引言 10
2.2 概率的基本概念 10
2.3 机器人环境交互 14
2.3.1 状态 15
2.3.2 环境交互 16
2.3.3 概率生成法则 18
2.3.4 置信分布 19
2.4 贝叶斯滤波 20
2.4.1 贝叶斯滤波算法 20
2.4.2 实例 21
2.4.3 贝叶斯滤波的数学推导 23
2.4.4 马尔可夫假设 25
2.5 表示法和计算 25
2.6 小结 26
2.7 文献综述 26
2.8 习题 27
第3章 高斯滤波 29
3.1 引言 29
3.2 卡尔曼滤波 30
3.2.1 线性高斯系统 30
3.2.2 卡尔曼滤波算法 31
3.2.3 例证 32
3.2.4 卡尔曼滤波的数学推导 33
3.3 扩展卡尔曼滤波 40
3.3.1 为什么要线性化 40
3.3.2 通过泰勒展开的线性化 42
3.3.3 扩展卡尔曼滤波算法 44
3.3.4 扩展卡尔曼滤波的数学推导 44
3.3.5 实际考虑 46
3.4 无迹卡尔曼滤波 49
3.4.1 通过无迹变换实现线性化 49
3.4.2 无迹卡尔曼滤波算法 50
3.5 信息滤波 54
3.5.1 正则参数 54
3.5.2 信息滤波算法 55
3.5.3 信息滤波的数学推导 56
3.5.4 扩展信息滤波算法 57
3.5.5 扩展信息滤波的数学推导 58
3.5.6 实际考虑 59
3.6 小结 60
3.7 文献综述 61
3.8 习题 62
第4章 非参数滤波 64
4.1 直方图滤波 64
4.1.1 离散贝叶斯滤波算法 65
4.1.2 连续状态 65
4.1.3 直方图近似的数学推导 67
4.1.4 分解技术 69
4.2 静态二值贝叶斯滤波 70
4.3 粒子滤波 72
4.3.1基本算法 72
4.3.2 重要性采样 75
4.3.3 粒子滤波的数学推导 77
4.3.4 粒子滤波的实际考虑和特性 79
4.4 小结 85
4.5 文献综述 85
4.6 习题 86
第5章 机器人运动 88
5.1 引言 88
5.2 预备工作 89
5.2.1 运动学构型 89
5.2.2 概率运动学 89
5.3 速度运动模型 90
5.3.1 闭式计算 91
5.3.2 采样算法 92
5.3.3 速度运动模型的数学推导 94
5.4 里程计运动模型 99
5.4.1 闭式计算 100
5.4.2 采样算法 102
5.4.3 里程计运动模型的数学推导 104
5.5 运动和地图 105
5.6 小结 108
5.7 文献综述 109
5.8 习题 110
第6章 机器人感知 112
6.1 引言 112
6.2 地图 114
6.3 测距仪的波束模型 115
6.3.1 基本测量算法 115
6.3.2 调节固有模型参数 119
6.3.3 波束模型的数学推导 121
6.3.4 实际考虑 126
6.3.5 波束模型的局限 127
6.4 测距仪的似然域 127
6.4.1 基本算法 127
6.4.2 扩展 130
6.5 基于相关性的测量模型 131
6.6 基于特征的测量模型 133
6.6.1 特征提取 133
6.6.2 地标的测量 133
6.6.3 已知相关性的传感器模型 134
6.6.4 采样位姿 135
6.6.5 进一步的考虑 137
6.7 实际考虑 137
6.8 小结 138
6.9 文献综述 139
6.10 习题 139
第Ⅱ部分 定 位
第7章 移动机器人定位:马尔可夫与高斯 142
7.1 定位问题的分类 144
7.2 马尔可夫定位 146
7.3 马尔可夫定位图例 147
7.4 扩展卡尔曼滤波定位 149
7.4.1 图例 149
7.4.2 扩展卡尔曼滤波定位算法 151
7.4.3 扩展卡尔曼滤波定位的数学推导 151
7.4.4 物理实现 157
7.5 估计一致性 161
7.5.1 未知一致性的扩展卡尔曼滤波定位 161
7.5.2 极大似然数据关联的数学推导 162
7.6 多假设跟踪 164
7.7 无迹卡尔曼滤波定位 165
7.7.1 无迹卡尔曼滤波定位的数学推导 165
7.7.2 图例 168
7.8 实际考虑 172
7.9 小结 174
7.10 文献综述 175
7.11 习题 176
第8章 移动机器人定位:栅格与蒙特卡罗 179
8.1 介绍 179
8.2 栅格定位 179
8.2.1 基本算法 179
8.2.2 栅格分辨率 180
8.2.3 计算开销 184
8.2.4 图例 184
8.3 蒙特卡罗定位 189
8.3.1 图例 189
8.3.2 蒙特卡罗定位算法 191
8.3.3 物理实现 191
8.3.4 蒙特卡罗定位特性 194
8.3.5 随机粒子蒙特卡罗定位:失效恢复 194
8.3.6 更改建议分布 198
8.3.7 库尔贝克-莱布勒散度采样:调节样本集合大小 199
8.4 动态环境下的定位 203
8.5 实际考虑 208
8.6 小结 209
8.7 文献综述 209
8.8习题 211
第Ⅲ部分 地图构建
第9章 占用栅格地图构建 213
9.1 引言 213
9.2 占用栅格地图构建算法 216
9.2.1 多传感器信息融合 222
9.3 反演测量模型的研究 223
9.3.1 反演测量模型 223
9.3.2 从正演模型采样 224
9.3.3 误差函数 225
9.3.4 实例与深度思考 226
9.4 最大化后验占用地图构建 227
9.4.1 维持依赖实例 227
9.4.2 用正演模型进行占用栅格地图构建 228
9.5 小结 231
9.6 文献综述 231
9.7 习题 232
第10章 同时定位与地图构建 235
10.1 引言 235
10.2 基于扩展卡尔曼滤波的SLAM 237
10.2.1 设定和假设 237
10.2.2 已知一致性的SLAM问题 238
10.2.3 EKF SLAM的数学推导 241
10.3 未知一致性的EKF SLAM 244
10.3.1 通用EKF SLAM算法 244
10.3.2 举例 247
10.3.3 特征选择和地图管理 250
10.4 小结 252
10.5 文献综述 253
10.6 习题 256
第11章 GraphSLAM算法 258
11.1 引言 258
11.2 直觉描述 260
11.2.1 建立图形 260
11.2.2 推论 262
11.3 具体的GraphSLAM算法 265
11.4 GraphSLAM算法的数学推导 270
11.4.1 全SLAM后验 271
11.4.2 负对数后验 272
11.4.3 泰勒表达式 272
11.4.4 构建信息形式 273
11.4.5 浓缩信息表 274
11.4.6 恢复机器人路径 277
11.5 GraphSLAM算法的数据关联 278
11.5.1 未知一致性的GraphSLAM算法 279
11.5.2 一致性测试的数学推理 281
11.6 效率评价 283
11.7 实验应用 284
11.8 其他的优化技术 288
11.9 小结 290
11.10 文献综述 291
11.11 习题 293
第12章 稀疏扩展信息滤波 294
12.1 引言 294
12.2 直观描述 296
12.3 SEIF SLAM算法 298
12.4 SEIF的数学推导 301
12.4.1 运动更新 301
12.4.2 测量更新 304
12.5 稀疏化 304
12.5.1 一般思想 304
12.5.2 SEIF的稀疏化 306
12.5.3 稀疏化的数学推导 307
12.6 分期偿还的近似地图恢复 308
12.7 SEIF有多稀疏 310
12.8 增量数据关联 313
12.8.1 计算增量数据关联概率 313
12.8.2 实际考虑 315
12.9 分支定界数据关联 318
12.9.1 递归搜索 318
12.9.2 计算任意的数据关联概率 320
12.9.3 等价约束 320
12.10 实际考虑 322
12.11 多机器人SLAM 325
12.11.1 整合地图 326
12.11.2 地图整合的数学推导 328
12.11.3 建立一致性 329
12.11.4 示例 329
12.12 小结 332
12.13 文献综述 333
12.14 习题 334
第13章 FastSLAM算法 336
13.1 基本算法 337
13.2 因子分解SLAM后验 338
13.2.1 因式分解的SLAM后验的数学推导 339
13.3 具有已知数据关联的FastSLAM算法 341
13.4 改进建议分布 346
13.4.1 通过采样新位姿扩展路径后验 346
13.4.2 更新可观察的特征估计 348
13.4.3 计算重要性系数 349
13.5 未知数据关联 351
13.6 地图管理 352
13.7 FastSLAM算法 353
13.8 高效实现 358
13.9 基于特征的地图的 FastSLAM 360
13.9.1 经验思考 360
13.9.2 闭环 363
13.10 基于栅格的FastSLAM算法 366
13.10.1 算法 366
13.10.2 经验见解 366
13.11 小结 369
13.12 文献综述 371
13.13 习题 372
第Ⅳ部分 规划与控制
第14章 马尔可夫决策过程 374
14.1 目的 374
14.2 行动选择的不确定性 376
14.3 值迭代 380
14.3.1 目标和报酬 380
14.3.2 为完全能观测的情况寻找最优控制策略 383
14.3.3 计算值函数 384
14.4 机器人控制的应用 387
14.5 小结 390
14.6 文献综述 391
14.7 习题 392
第15章 部分能观测马尔可夫决策过程 394
15.1 动机 394
15.2 算例分析 395
15.2.1 建立 395
15.2.2 控制选择 397
15.2.3 感知 398
15.2.4 预测 402
15.2.5 深度周期和修剪 404
15.3 有限环境POMDP算法 407
15.4 POMDP的数学推导 409
15.4.1 置信空间的值迭代 409
15.4.2 值函数表示法 410
15.4.3 计算值函数 410
15.5 实际考虑 413
15.6 小结 416
15.7 文献综述 417
15.8 习题 419
第16章 近似部分能观测马尔可夫决策过程技术 421
16.1 动机 421
16.2 QMDP 422
16.3 AMDP 423
16.3.1 增广的状态空间 423
16.3.2 AMDP算法 424
16.3.3 AMDP的数学推导 426
16.3.4 移动机器人导航应用 427
16.4 MC-POMDP 430
16.4.1 使用粒子集 430
16.4.2 MC-POMDP算法 431
16.4.3 MC-POMDP的数学推导 433
16.4.4 实际考虑 434
16.5 小结 435
16.6 文献综述 436
16.7 习题 436
第17章 探测 438
17.1 介绍 438
17.2 基本探测算法 439
17.2.1 信息增益 439
17.2.2 贪婪技术 440
17.2.3 蒙特卡罗探测 441
17.2.4 多步技术 442
17.3 主动定位 442
17.4 为获得占用栅格地图的探测 447
17.4.1 计算信息增益 447
17.4.2 传播增益 450
17.4.3 推广到多机器人系统 452
17.5 SLAM探测 457
17.5.1 SLAM熵分解 457
17.5.2 FastSLAM探测 458
17.5.3 实验描述 460
17.6 小结 462
17.7 文献综述 463
17.8 习题 466
参考文献 468