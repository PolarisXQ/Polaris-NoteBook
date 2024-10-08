# Visual Slam

[](https://blog.csdn.net/afucc111/article/details/127104948)

## IMU预积分

因为IMU的采样频率高，通常为100Hz - 1000Hz，数据量非常大，在做优化的时候，不可能将如此多的数据都放到状态变量中，因此通常的做法是每隔一段时间提取一个数据，比如每隔1秒提取一个。

但是这样在做后端优化的过程中，当我们进行迭代求解计算来更新和调整PVQ的值时，一旦（比如第 1 秒）的PVQ进行了调整，每一个中间过程以及后面所有的轨迹都要重新再积分算一遍。

有没有什么方法是可以不用如此牵一发而动全身，摆脱冗繁的积分过程？预积分的目的就是尝试将这100次积分过程变成只有1次积分，或者说用1个值来代替100个值，通过预积分模型的应用可以大大节省了计算量。

[视觉惯性里程计的IMU预积分模型](https://zhuanlan.zhihu.com/p/90213963)

## 初始化

为什么要初始化？初始化要做什么？以及初始化的作用？我们初始化的原因是单目惯性紧耦合系统是一个非线性程度很高的系统，首先单目是无法获得空间中的绝对尺度，而IMU又必然存在偏置，在后面进行求解的时候还需要用到重力加速度（包括大小和方向），对于速度比较敏感的条件下，比如说无人机，又要精确的速度信息，因此，如何有效的在紧耦合系统处理之前计算出这些量，对整个紧耦合系统的鲁棒性有着重大的意义（其实这里就可以理解成相机标定一样，没有正确的标定好相机的内参，相机在进行定位的时候必然不准，而且很有可能会挂掉）。所以初始化要做的事其实说起来很简单，就是计算出绝对尺度s、陀螺仪偏置bg、加速度偏置ba、重力加速度G和每个IMU时刻的速度v，VINS中重点说明了加速度计偏置值一般都会和重力加速度耦合到一起（也就是被重力加速度给吸收掉），重力加速度的量级要远大于其加速度偏置，而且在初始化时间内加速度计偏置比较小，很难真正的计算得到，因此忽略加速度计偏置的影响，在初始化中不再计算。初始化的作用是不言而喻的，直接影响整个紧耦合系统的鲁棒性以及定位精度，并且初始化一般都需要一个比较漫长的时间，VINS大概需要十秒左右，ORB_SLAM2结合IMU的时间设定在15秒完成初始化。话不多说，直接进入正题。

### 单目初始化

### 双目初始化

### RGB-D初始化

### IMU初始化


## VINS-Mono

### 视觉惯性联合初始化

视觉惯性联合初始化在第V点的B部分，这里作者给定义的名字叫Visual-Inertia Alignment，即视觉惯性联合初始化（而在ORBSLAM2+IMU的论文里，作者定义的名称就叫IMU initialization，即IMU初始化），为什么定义这样一个名词，我觉得有两个意义，第一在进行陀螺仪偏置初始化的时候要同时使用到IMU测量的旋转和视觉测量的旋转，也就是要联合视觉和惯性的数据。第二这里求得的尺度S的值不仅仅是IMU的，还是视觉和IMU整个系统的尺度。在具体的讲解初始化每个过程的时候，有必要来个总体的概括，初始化在物理意义上的定义其实就是固有参数的标定，在数学模型上的定义其实就是公式（6）的矩阵方程求解，而公式（6）其实就是来自于最原始的PVQ积分公式，其中Q旋转对应着陀螺仪，而PV对应着加速度计，如果不明白的话，不要紧，看完下面的整体推导过程相信聪明的你一定会茅塞顿开。

#### 1. 陀螺仪偏置标定

#### 2. 速度、重力加速度和尺度标定

#### 3. 重力优化

### 基于滑动窗口的单目视觉紧耦合后端优化模型

## ORB-SLAM2

## ORB-SLAM3

从框架图中也可以看出,ORB-SLAM3最突出的两点是IMU融合、地图集(map atlas)以及地图融合(map merging).

这里提下，笔者理解的要使用MLPnP的原因。按照作者的说法是，ePnP是要基于pinhole的形式，因此要修改PnP的算法，使之独立于所用的相机模型。而MLPnP就是一种使用投影线作为输入的算法，不依赖与相机模型。然而此前，笔者自己也基于ORBv2改过支持鱼眼相机的工作。当时笔者使用的是OpenCV支持的fisheye模型，也便于标定和矫正函数的直接调用。并且，笔者使用OpenCV的鱼眼模型是可以直接支持ePnP的。

## Comparision & Analysis

| Algorithm     | Sensors                            | Back-End Optimization Algorithm              | Image Detection Method | Semantic Information | Pros                                | Cons                                         | Real-Time Capabilities |
|---------------|------------------------------------|----------------------------------------------|------------------------|----------------------|-------------------------------------|----------------------------------------------|------------------------|
| ORB-SLAM      | Monocular camera, RGB-D camera      | Bundle adjustment                           | ORB feature points     | No                   | Efficient, robust, widely used     | Limited scalability, prone to drift           | Yes                    |
| DSO           | Monocular camera                    | Direct Sparse Odometry                      | Sparse feature points   | No                   | Efficient, low-drift, real-time     | Limited scalability, requires texture-rich scenes | Yes                    |
| VINS-mono     | Monocular camera, IMU               | Nonlinear Optimization                      | Feature tracking        | No                   | Accurate, robust, handles motion dynamics | Limited scalability, requires calibration     | Yes                    |
| VINS-Fusion   | Monocular camera, IMU, RGB-D camera | Nonlinear Optimization                      | Feature tracking        | Yes                  | Accurate, robust, handles motion dynamics | Limited scalability, requires calibration     | Yes                    |
| ROVIOLI       | Monocular camera, IMU, RGB-D camera | Keyframe-based Optimization                 | Feature tracking        | Yes                  | Accurate, robust, handles large environments | Limited scalability, requires calibration     | Yes                    |
| ElasticFusion | RGB-D camera                        | Global Loop Closure Optimization            | Dense surface fusion    | No                   | Accurate, robust, handles large environments | Computationally intensive, requires GPU       | Yes                    |
| Voxblox       | RGB-D camera                        | Volumetric Fusion                           | Occupancy grids         | No                   | Efficient, handles large environments | Limited scalability, requires volumetric representation | Yes                    |
| SLAM++        | Monocular camera, RGB-D camera      | Optimization and Loop Closure               | Feature matching        | No                   | Accurate, handles large environments | Limited scalability, requires initialization | Yes                    |
| SemanticFusion| RGB-D camera                        | Global Optimization with Semantic Segmentation | Semantic segmentation  | Yes                  | Accurate, incorporates semantic information | Computationally intensive, requires GPU       | Yes                    |
| Mask-Fusion   | RGB-D camera                        | Fusion and Registration                     | Object instance segmentation | Yes          | Accurate, handles multiple objects | Limited scalability, requires object masks    | Yes                    |
| Segmap        | RGB-D camera                        | Graph-based Optimization                    | Feature matching        | Yes                  | Efficient, handles large environments | Limited scalability, requires initialization | Yes                    |
| XIVO          | Monocular camera, IMU               | Optimization and Loop Closure               | Feature matching        | No                   | Accurate, handles large environments | Limited scalability, requires initialization | Yes                    |
| Voxblox++     | RGB-D camera                        | Volumetric Fusion                           | Truncated signed distance function | No | Efficient, handles large environments | Limited scalability, requires volumetric representation | Yes                    |
| Kimera        | Monocular camera, IMU, RGB-D camera | Nonlinear Optimization                      | Keypoint tracking       | Yes                  | Accurate, handles motion dynamics | Limited scalability, requires calibration     | Yes                    |
