# Learning PCL

## Filter

- [PCL滤波大全、原理+代码实例+操作步骤](https://blog.csdn.net/weixin_43925768/article/details/129183368)

### [CropHull 任意多边形内部点云提取](https://blog.csdn.net/weixin_44444810/article/details/123593580)

## Data Structure

### KD-Tree

k-d tree是每个节点均为k维数值点的二叉树

[PCL之kd-tree详解](https://blog.csdn.net/m0_37816922/article/details/124778183)

[K-D TREE算法原理及实现](https://www.cnblogs.com/flyinggod/p/8727584.html)

### Octree

### VoxelGrid

## Feature Extraction

### [点云表面法线估算](https://blog.csdn.net/TimeRiverForever/article/details/115671162)

### 快速点特征直方图PFH/FPFH

#### 什么是PFH/FPFH特征

点快速特征直方图(Fast Point Feature Histogram, FPFH)通俗地来说就是表示三维点的一种特征，类似二维图像中的SIFT、SURF、ORB特征等，都是携带了某种特定的信息。类似二维图像的配准，FPFH也可以用于三维点云之间的配准。 

#### FPFH特征的定义

FPFH(Fast Point Feature Histograms)是一种基于点对关系的局部特征描述子，它通过计算每个点周围邻域内其他点与该点之间的法向量差异来构建直方图从而描述该点在局部区域内的几何形状。

#### PFH特征的计算

1. 首先，对于每个点p，需要找到与其距离小于r的所有点
2. 然后，对于这之中每两个距离小于r的点q，需要计算其之间的法向量差异，因此复杂度是O(k^2)。
3. 接下来，将所有法向量差异放入一个直方图中，并进行归一化处理。这样就得到了该点p在其邻域内的PFH特征。
4. 最后，可以将所有点的PFH特征拼接起来，得到整个点云的PFH特征描述子

#### FPFH特征的计算

1. 首先，对于每个点p，需要找到其k近邻 (k-Nearest Neighbors) ，这里可以使用kd-tree或者octree等数据结构进行快速查找
2. 然后，对于每个邻域内的点q，需要计算其与p之间的法向量差异。具体来说可以使用以下公式
$\Delta \theta = \cos^{-1}(n_p \cdot n_q)$
其中$n_p$和$n_g$分别表示p和q的法向量，因此复杂度是O(k)。
3. 接下来，将所有邻域内g与p之间法向量差异的值放入一个直方图中，并进行归一化处理。这样就得到了该点p在其邻域内的FPFH特征。
4. 最后，可以将所有点的FPFH特征拼接起来，得到整个点云的FPFH特征描述子

#### FPFH的优缺点
- 优点:
    - 计算速度快:由于FPFH是基于点对关系构建直方图，因此计算速度非常快
    - 对噪声和采样密度变化具有鲁棒性: 由于使用了法向量差异作为直方图构建依据，因此对噪声和采样密度变化具有较好的鲁棒性
- 缺点
    - 对于不规则形状的物体，FPFH特征的描述效果可能不如其他特征描述子
    - FPFH特征只能描述局部几何形状，无法描述全局信息。因此，在处理全局信息时需要将多个局部FPFH特征拼接起来使用。
