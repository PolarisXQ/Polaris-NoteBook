# Learning Lidar Slam

## Basic Concept

A.纯LIDAR方法
基于ICP、G-ICP进行匹配，以及结合点到平面和点到直线的距离进行迭代匹配计算(LOAM、Lego-Loam)。

B.松耦合LIO
将IMU的积分结果作为点云匹配的初值，或者对IMU积分以及点云匹配分别处理，然后再基于EKF进行滤波融合。

C.紧耦合LIO
将原始云点数据和IMU原始数据一起放在图优化或者滤波器中构建残差函数，并进行优化。
————————————————

                            版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
                        
原文链接：https://blog.csdn.net/guanjing_dream/article/details/135291383

## 从滤波器到SLAM：FAST-LIO，基于EKF的Lidar-IMU SLAM



## LIO-SAM

基于优化的

比较于FAST-LIO等基于滤波的方法：滤波器是由先验信息+运动模型+观测信息三个方面点顺序执行，以实现位姿状及其协方差的估计和更新，也正因为滤波器的框架如此，若是先验(上一时刻)状态出现了问题，比如位姿跟丢、计算错误等，那么在该时刻之后的状态都会出现问题以致纠正不回来了，而基于优化方法的位姿求解则会考虑更多时刻 (关键) 下的状态信息和观测信息，即使有某一时刻的状态量和协方差是outlier，系统也有一定的能力维稳。

[[激光SLAM]运行LIO-SAM时存在的一些问题](https://blog.csdn.net/Travis_X/article/details/113103067)

https://github.com/kahowang/FAST_LIO_SAM/tree/master with livox support

https://github.com/gisbi-kim/SC-LIO-SAM no livox support

https://github.com/JokerJohn/LIO_SAM_6AXIS/tree/main with livox support