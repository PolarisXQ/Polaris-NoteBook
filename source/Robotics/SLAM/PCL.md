# Learing PCL

## KD-Tree

k-d tree是每个节点均为k维数值点的二叉树

[PCL之kd-tree详解](https://blog.csdn.net/m0_37816922/article/details/124778183)

[K-D TREE算法原理及实现](https://www.cnblogs.com/flyinggod/p/8727584.html)

## [RANSAC](https://blog.csdn.net/weixin_48147838/article/details/131815563)

## [Filter](https://blog.csdn.net/weixin_43925768/article/details/129183368)

## [CropHull 任意多边形内部点云提取](https://blog.csdn.net/weixin_44444810/article/details/123593580)

## [点云表面法线估算](https://blog.csdn.net/TimeRiverForever/article/details/115671162)

## 快速点特征直方图PFH/FPFH

### 什么是PFH/FPFH特征

点快速特征直方图(Fast Point Feature Histogram, FPFH)通俗地来说就是表示三维点的一种特征，类似二维图像中的SIFT、SURF、ORB特征等，都是携带了某种特定的信息。类似二维图像的配准，FPFH也可以用于三维点云之间的配准。 

### FPFH特征的定义

FPFH(Fast Point Feature Histograms)是一种基于点对关系的局部特征描述子，它通过计算每个点周围邻域内其他点与该点之间的法向量差异来构建直方图从而描述该点在局部区域内的几何形状。

### PFH特征的计算

1. 首先，对于每个点p，需要找到与其距离小于r的所有点
2. 然后，对于这之中每两个距离小于r的点q，需要计算其之间的法向量差异，因此复杂度是O(k^2)。
3. 接下来，将所有法向量差异放入一个直方图中，并进行归一化处理。这样就得到了该点p在其邻域内的PFH特征。
4. 最后，可以将所有点的PFH特征拼接起来，得到整个点云的PFH特征描述子

### FPFH特征的计算

1. 首先，对于每个点p，需要找到其k近邻 (k-Nearest Neighbors) ，这里可以使用kd-tree或者octree等数据结构进行快速查找
2. 然后，对于每个邻域内的点q，需要计算其与p之间的法向量差异。具体来说可以使用以下公式
$\Delta \theta = \cos^{-1}(n_p \cdot n_q)$
其中$n_p$和$n_g$分别表示p和q的法向量，因此复杂度是O(k)。
3. 接下来，将所有邻域内g与p之间法向量差异的值放入一个直方图中，并进行归一化处理。这样就得到了该点p在其邻域内的FPFH特征。
4. 最后，可以将所有点的FPFH特征拼接起来，得到整个点云的FPFH特征描述子

### FPFH的优缺点
- 优点:
    - 计算速度快:由于FPFH是基于点对关系构建直方图，因此计算速度非常快
    - 对噪声和采样密度变化具有鲁棒性: 由于使用了法向量差异作为直方图构建依据，因此对噪声和采样密度变化具有较好的鲁棒性
- 缺点
    - 对于不规则形状的物体，FPFH特征的描述效果可能不如其他特征描述子
    - FPFH特征只能描述局部几何形状，无法描述全局信息。因此，在处理全局信息时需要将多个局部FPFH特征拼接起来使用。

## RANSAC算法(随机抽样一致性)

RANSAC的思想：在点云数据中随机抽取一部分作为样本，根据所选的点云数据得到拟合模型的参数，然后用剩余的点云数据验证所求模型是否最优，通过迭代多次求出最优模型。

算法流程：

<pic src="https://img-blog.csdnimg.cn/a87879582241480092b534d911139bc9.jpeg" width="20%"/>

## SAC-IA算法(采样一致性)

该算法的总体思路如下：

将需要配准的目标点云P中选择n个采样点。为了保证所选取的采样点尽可能有不同的FPFH特征，采样点的距离一般要选择的恰当，尽可能分散，一般要大于预定的最小距离d；

在模板点云Q中查找与目标点云P中具有相似FPFH特征的对应点，这些点可能是一个或多个，但是从这些点中选取一个作为最终的对应点。

根据以上步骤得到对应点集，计算目标点云和模板点云之间的刚性变换矩阵，同时计算出配准后的误差，以及点云配准后的质量。

重复以上三个步骤，找到误差和最小的变换，然后用于点云的粗配准。
文献通过查找大量不同的对应点集，快速找到良好的转换关系。采用Huber惩罚函数来确定最小误差和。

- 解决点云数据之间的初始对齐问题
- 基本可以实现角度上的对齐
- 基于采样一致性的方法，通过迭代的方式找到最优的平面模型

## ICP algorithm

[ICP原理](https://www.jianshu.com/p/a7dbb4a3df5c)

### 算法步骤

#### 1. 定义代价函数

代价函数就是经过transform后的source点云$\vec{S}$和target点云$\vec{Q}$之间所有对应点之间的欧氏距离。

实现上，首先计算两个点云的几何中心，并将两个点云平移到原点，这样可以简化代价函数，这样需要找到的使得代价函数最小的transform就只有旋转矩阵R。T的求解方法是$T=\vec{Q}-R\vec{S}^T$

#### 2. 寻找对应点

为了加速计算，我们不需要计算 Target 点云中每个点到 Source 点云中一点的距离。可以设定一个阈值，当距离小于阈值时，就将其作为对应点。

甚至不需要两个点集中的所有点。可以指用从某一点集中选取一部分点，一般称这些点为 控制点（Control Points）

#### 3. 优化

ICP的优化基于最小二乘法，通过最小化代价函数来求解最优的旋转矩阵R。

#### 4. 收敛条件

检查是否达到收敛条件，如，迭代次数达到上限，或者两次迭代之间的误差小于某个阈值。

如果没有达到收敛条件，就回到第二步，重新计算对应点，然后再次优化。否则，就认为找到了最优的旋转矩阵R。就可以将 Source 点云通过 R 进行旋转，然后再平移，就可以得到两个点云之间的最优对齐。算法结束。

### PCL中的ICP参数

```python
{'solver_euclidean_fitness_epsilon':1e-5},
{'solver_transformation_epsilon':1e-5},
{'solver_max_correspondence_distance':2.0},
{'solver_correspondence_randomness':20},
{'solver_max_optimizer_iterations':20},
{'solver_use_reciprocal_correspondences':True},
{'solver_use_trimmed':True},
{'solver_use_point_to_plane':True},
{'solver_point_to_plane_weight':1.0},
{'solver_point_to_point_weight':1.0},
```

## NDT algorithm(Normal Distributions Transform)

[NDT算法原理](https://www.cnblogs.com/kuangxionghui/p/9686698.html)

