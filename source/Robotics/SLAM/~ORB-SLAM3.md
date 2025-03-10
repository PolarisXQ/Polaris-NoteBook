# ORB_SLAM


## ORB（Oriented FAST + Rotated BRIEF） Feature Extraction

__步骤:__

<img src="./pic/step_orb_ext.png" width="60%"/>

1. 输入图像，并对输入图像进行预处理，将其转换成灰度图像；

2. 初始化参数，包括特征点数量nfeatures，尺度scaleFactor，金字塔层数nlevel，初始阈值iniThFAST，最小阈值minThFAST等参数；

3. 计算金字塔图像，源码中使用8层金字塔，尺度因子为1.2，则通过对原图像进行不同层次的resize，可以获得8层金字塔的图像；

~~~
FAST特征点和ORB描述子本身不具有尺度信息，ORBextractor通过构建图像金字塔来得到特征点尺度信息.将输入图片逐级缩放得到图像金字塔,金字塔层级越高,图片分辨率越低,ORB特征点越大.
~~~

4. 计算特征点：

    * 将图像分割成网格，每个网格大小为W*W=30*30像素；
    * 遍历每个网格；
    * 对每个网格提取FAST关键点，先用初始阈值iniThFAST提取，若提取不到关键点，则改用最小阈值minThFAST提取。（注意，初始阈值一般比最小阈值大）

5. 对所有提取到的关键点利用八叉树的形式进行划分：

    * 为了使得分布更加均匀
    * 按照像素宽和像素高的比值作为初始的节点数量，并将关键点坐标落在对应节点内的关键点分配入节点中；
    * 根据每个节点中存在的特征点数量作为判断依据，如果当前节点只有1个关键点，则停止分割。否则继续等分成4份；
    * 按照上述方法不断划分下去，如图3所示，可见出现一个八叉树的结构，终止条件是节点的数目Lnode大于等于要求的特征点数量nfeatures；
    * 对满足条件的节点进行遍历，在每个节点中保存响应值最大的关键点，保证特征点的高性能；

6. 对上述所保存的所有节点中的特征点计算主方向，利用灰度质心的方法计算主方向，上一讲中我们已经讲解过方法，这讲就不再赘述了；

7. 对图像中每个关键点计算其描述子，值得注意的是，为了将主方向融入BRIEF中，在计算描述子时，ORB将pattern进行旋转，使得其具备旋转不变性；(随便理解一下把)


## Feature Matching

__步骤：__

1. 对新来的帧进行特征提取
2. 将特征依据字典树转换成BOW向量
3. 在匹配时我们查找两帧BOW向量中相同ID的词汇，特征匹配只在有相同ID的词汇中进行。显然，这个过程限定了匹配范围，可以提高匹配的速度。当然，匹配的精度跟词汇树的大小和深度有关系。

### 词袋模型

- 字典是预先准备的。
- 优点在于：
    * 把图片抽象成了几个单词的集合，在数学上用向量就可以简单表示，称为BOW向量。
    * 准备字典时，把单词通过多层聚类的方法进行分类，通过树进行索引，这个检索过程能达到对数级别的查找效率。

### 确定最优匹配？？？？

　　ORBSLAM2中将360°分成30个bin，每个bin的范围是12°。对于图像1和图像2任意两个对应匹配特征，我们计算其二者主方向的夹角。根据夹角的大小确定在哪个角度范围里，并将特征索引存入对应bin中。

　　我们统计每个bin中保存的索引数量，取数量最多的前三个bin作为最终的匹配对结果。其他的匹配对全部予以删除。至此，我们的最优匹配就全部确定了。

　　不过，值得注意的是，我们实际上匹配的点只是一部分，另一部分没有匹配到的，在后面会通过共试图关键帧以及局部地图重投影进行进一步匹配，我们会在后续的内容中讲解。

## Motion Estimation

### 在跟踪过程主要分为三种类型，来确定优化的初始值：

<img src="./pic/motion_est.png" width="60%"/>

1. 无运动模型的跟踪，即基于参考帧的跟踪；
2. 基于匀速运动模型的跟踪；
    　ORBSLAM2中每次跟踪成功后，都会将两帧间的相对运动记录下来作为运动模型。在估计下一帧运动时，将前一帧的姿态，乘上这个运动模型，就得到了<span style="color:RGB(0,120,212); font-weight: 600;">当前帧</span>的姿态初值。
3. 重定位(需要用到回环检测)；
        
### 优化方法PNP
PNP是一种将匹配点从三维空间投影到像平面并与观测数据计算误差来估计相机运动的方法，我们也管这种方法叫重投影误差。
使用重投影（与观测的）误差，通过优化的算法解的使得误差最小的运动矩阵,作为运动估计。

基于解析的PNP方法:
1. 只采用少量的匹配对即可估计相对运动;
2. SLAM问题当中，通常约束条件较多，因此基于解析的方法通常不能更好地利用约束条件;
3. 若将错误匹配对纳入解析方程中，会错误估计相机运动
4. 尽管可以通过随机选取多组匹配对进行估算多个相机运动并根据一定条件进行筛选出最合适的相机运动，但是笔者更倾向于用PNP解析解估算出一个初值;
5. 值得一提的是，ORBSLAM2并不用PNP求初值，而是直接用参考帧的运动作为<span style="color:RGB(0,120,212); font-weight: 600;">当前帧</span>的运动初值进行优化;

<span style="color:green;">人生苦短，证明就略过把😎</span>

反正最后得到了误差对运动矩阵的导数式，然后就可以用g2o或者ceres来求解最小误差（最小二乘法）的运动矩阵了。

#### 关于优化算法
        1. 梯度下降法：

        · 只考虑了该点是否在下降

        · 实际上，由于梯度下降法过于贪心，通常会导致锯齿状下降，导致收敛速度缓慢；而且会陷入局部最优或者鞍点问题

        2. 牛顿法：

        · 不仅参考了一点的导数，还参考了导数的导数；考虑了下降后这个方向是不是依然在下降，可以优化梯度下降法中最终可能找到鞍点等错误的点的情况。

        · 而牛顿法尽管使用了二阶近似，提高了下降速度，但对于SLAM问题而言，求解海塞阵的计算量太大，非常不适用；

        ！！！！以下还没读懂！！！！！
        -----------------------------------

        3. 高斯牛顿法：

        　　基于牛顿法改进的高斯牛顿法，通过二次近似二阶泰勒展开，利用雅克比的二次方来近似海塞阵，在计算量和下降速度上可以较好满足SLAM的需求，但存在的隐患是增量的范围超出泰勒展开时限定的微小邻域，导致近似失败；

        4. 列文伯格-马夸尔特法：

        　　列文伯格-马夸尔特法是基于高斯牛顿法进一步改进的，通过限定搜索区域，防止出现近似失败的情况，LM方法也是SLAM中最常用的优化方法。

        -----------------------------------


## <span style="color:green;">KeyFrame</span>

关键帧的目的在于，适当地降低信息冗余度，减少计算机资源的损耗，保证系统的平稳运行

### <span style="color:green;">KF's Selection</span>

1. 若当前处于定位模式，不插入关键帧；

    原因：定位模式是只定位不建图

2. 若局部地图处于全局闭环情况下，不插入关键帧；

    原因：局部地图被占用，插入关键帧会影响全局闭环的优化。

3. 若距离上一次重定位较近，不插入关键帧；

    原因：重定位时，<span style="color:RGB(0,120,212); font-weight: 600;">当前帧</span>通过与局部关键帧匹配并进行运动估计，能够很好地恢复其运动姿态。笔者认为，因为重定位时<span style="color:RGB(0,120,212); font-weight: 600;">当前帧</span>与重定位<span style="color:RGB(195,83,195); font-weight: 600;">候选帧</span>的信息冗余度较低，所以在重定位成功后，<span style="color:RGB(0,120,212); font-weight: 600;">当前帧</span>会作为关键帧插入地图中。而新来的一帧，由于重定位时刚刚插入关键帧，所以不需要频繁插入。

排除了上面三种情况，接下来就需要对关键帧进一步检测，才能确定是否真的需要插入关键帧。进一步检查包含一个必不可少的条件和另外三选一的条件。

1. 内点数必须超过设定的最小阈值，并且重叠度不能太大；

    原因：保证关键帧跟踪的质量，同时，避免引入过多的信息冗余。

三选一的条件：

2.1 距离上次插入关键帧已经过去MAX帧，MAX是ORBSLAM2预设的最大值；

    原因：防止过去太多帧，跟踪丢失。

2.2 距离上次插入关键帧至少过去MIN帧，且局部建图线程处于空闲状态，MIN是ORBSLAM2预设的最小值；

    原因：防止图像重叠度太高，并且局部建图线程有空闲处理新的关键帧。

2.3 局部建图线程中关键帧队列的关键帧数量不超过3个；

    原因：主要也是考虑局部建图线程的处理能力，以及信息的冗余度问题吧。

　　插入关键帧的条件即是必须满足条件1以及满足2.1-2.3中任意一个条件。

### <span style="color:green;">KF's Insertation</span>


## 地图的更新策略



## KP's Triangular

三角化是用来估计相机和地图上的三维点之间的关系。具体来说，当ORB-SLAM使用两个或更多个视角拍摄同一场景时，它会使用三角化算法将这些视角中观察到的特征点转换为三维点。这些三维点可以用于构建地图和定位相机。

当一个特征点在至少两个视角下都有匹配时，ORB-SLAM会使用三角化技术计算该特征点的3D位置。因此，只有那些至少在两个视角下都有匹配的特征点才会被用于三角化。

## Loop Closing

回环检测模块包含两个部分的内容：其一是位置识别，即外观验证，通过图像间的相似度信息进行判断；其二是几何验证，通过回环<span style="color:RGB(195,83,195); font-weight: 600;">候选帧</span>与当前关键帧的几何关系来做进一步验证。

### Loop Detection

1. 利用一范数来度量<span style="color:RGB(0,120,212); font-weight: 600;">当前帧</span>与<span style="color:RGB(46,160,67); font-weight: 600;">共视图关键帧</span>之间的相似度分数，假设共视图中一个关键帧的BOW向量为$w$，<span style="color:RGB(0,120,212); font-weight: 600;">当前帧</span>的BOW向量为$v$，则相似度分数的度量方式为：
$s(w−v)=2∑_{i=1}^N|w_i|+|v_i|−|w_i−v_i|$
　　将所有相似分数进行排序，取最小的匹配分数 $S_{min}$ 作为参考值，用于查找回环<span style="color:RGB(195,83,195); font-weight: 600;">候选帧</span>。

2. 确定最小匹配分数后，排除<span style="color:RGB(0,120,212); font-weight: 600;">当前帧</span><span style="color:RGB(46,160,67); font-weight: 600;">共视图的所有关键帧</span>，我们回环的意义是确定当前相机看到的场景，在很久之前是不是见过。近期看到的<span style="color:RGB(0,120,212); font-weight: 600;">当前帧</span>的<span style="color:RGB(46,160,67); font-weight: 600;">共视图关键帧</span>，这对校正整个场景的误差作用不大。

3. 对<span style="color:RGB(0,120,212); font-weight: 600;">当前帧</span>的BOW向量中的词汇逐个逆向索引在地图中找到相关联的关键帧，参考下图。并统计各个关键帧中与<span style="color:RGB(0,120,212); font-weight: 600;">当前帧</span>相似的词汇数量。排序确定最大的相似词汇数量 $M$，并筛选相似词汇数量大于$0.8×M$的关键帧作为<span style="color:RGB(195,83,195); font-weight: 600;">候选帧 $KF^1_{candidate}$</span>；

4. 将<span style="color:RGB(0,120,212); font-weight: 600;">当前帧</span>与步骤3的<span style="color:RGB(195,83,195); font-weight: 600;">候选帧</span>进行BOW向量计算匹配分数，取匹配分数高于步骤1计算的最小匹配分数 $Smin$ 的<span style="color:RGB(195,83,195); font-weight: 600;">候选帧</span>作为新的<span style="color:RGB(195,83,195); font-weight: 600;">候选帧 $KF^2_{candidate}$</span>；

5. 统计<span style="color:RGB(195,83,195); font-weight: 600;">候选帧集中 $KF^2_{candidate}$</span>
 每个<span style="color:RGB(195,83,195); font-weight: 600;">候选帧</span>的<span style="color:RGB(46,160,67); font-weight: 600;">共视图关键帧</span>与<span style="color:RGB(0,120,212); font-weight: 600;">当前帧</span>的BOW匹配分数总和 $S_total$，并取分数总和大于 $0.75×S_total$ 的<span style="color:RGB(195,83,195); font-weight: 600;">候选帧</span>组成新的<span style="color:RGB(195,83,195); font-weight: 600;">候选帧$KF^3_{candidate}$</span>。
 笔者理解这也是为了确保在一个范围里都能检测到回环，增强回环的可靠性。

6. 在上述<span style="color:RGB(195,83,195); font-weight: 600;">候选帧</span> $KF^3_{candidate}$ 的基础上，我们检测连续三帧都识别到同一个回环，那么就可以进一步缩小<span style="color:RGB(195,83,195); font-weight: 600;">候选帧</span>集，形成最终的<span style="color:RGB(195,83,195); font-weight: 600;">候选帧集 $KF_{final-candudate}$</span>，这在ORBSLAM2中叫一致性验证。

至此，我们的外观验证已经完成了。从步骤1开始到步骤6，ORBSLAM2都是在不断提高筛选条件进而缩小<span style="color:RGB(195,83,195); font-weight: 600;">候选帧集</span>。可以想见，这是在利用词袋模型检索和匹配效率极高的优势，快速完成粗检索，精细化的部分再交由几何验证去进一步确定最终的<span style="color:RGB(195,83,195); font-weight: 600;">候选帧</span>。

### Geometry Validation



## 📑 Learn ORBSLAM2 

 divide the source code into many parts according to their function which can be easily built

👉 [https://github.com/yepeichu123/orbslam2_learn](https://github.com/yepeichu123/orbslam2_learn)

❤️ include a blog that explain algorithm in detail.