# 开发记录(09.15-10.31)

## ✅ navigation2导航定位方案测试

- 🗓️2023.09.24
- fast_lio/lio_sam/kiss_icp (定位算法) + dll （重定位算法） + navigation2 （导航框架）
- dll算法配准效果

    <img src="./pic/dll.png"  width="90%">

- fastlio建图转八叉树地图

    <img src="./pic/octo.gif"  width="90%">

## ✅ ego_planner导航方案仿真测试

- 🗓️2023.09.24
- 效果不佳，还需要调试。
- 而且为了将三维导航适用于二维，需要带上很多其他的算法包，感觉没有必要

- 🗓️2023.09.29 详见代码注释以及readme文档

## 🟩 尝试将farPlanner与navigation2中的localPlanner（Controller）结合

- 🗓️2023.09.30 navigation2对系统的完整性要求比较高，locolPlanner[nav2]在没有localcost map的情况下似乎无法运行，虽然有nav2有很多现成的conntroller可以使用，但是该方案暂缓

## ✅ 迁移代码至ROS1

- 🗓️2023.09.30
- 制作了镜像
- 用于部署在rikibot上
- 装车

    <img src="./pic/car.jpg"  width="90%">

- FASTLIO_MAPPING

    <img src="./pic/mapping.gif"  width="90%">

## 🟩 使用FAST_LIO_LOCALIZATION

- 🗓️2023.10.01 对初始点的要求比较奇怪，配准经常失败，暂时不用这个方案

## ✅ Localization方案原理理解

- 🗓️2023.10.02 ICP and its variants..
- 🗓️2023.10.03 DLL，NDT; TODO: ACML,ACML3D,EKF,UKF...

## ✅ git规范文档
- 🗓️2023.10.06 

## ✅ 为localPlanner[CMU]加入全向运动模型的支持

- 🗓️2023.09.30
- localPlanner默认是差分运动模型，依照作者描述和实际跑起来的效果，localplanner的算法优先转向再前进，并且在很多算法里都需要这种调整
- 用差分来控制全向也未必不行，先看效果，需要的话再加入全向
- localPlanner的路径是写死的，从一开始设计就没有考虑到全向的运动模型。
- 解决方案：1.差分转全向 2.按照localPlanner的设计思路，重写全向的localPlanner 3.接入其他的全向localPlanner算法 4.把twowaydrive改成fourwaydriver
- 🗓️2023.10.09/10 仿真环境内加入了对全向运动的支持，最后是按照localPlanner的设计思路，重写了全向的localPlanner按照localPlanner的设计思路，重写全向的localPlanner

- 进化过程

    振荡版

    <img src="./pic/oscillation.gif"  width="90%">

    修正版，并且保留了原作者的一些设计思路，详见代码注释和readme

    <img src="./pic/final.gif"  width="90%">

    加入了全向轮的twoWayDrive控制模式，可以看到如果是后侧的点会先转向

    <img src="./pic/notwowaydrive.gif"  width="90%">

## ✅ coding持续集成

- 🗓️2023.09.30
- 教程文档在博客中更新
- 带有lfs管理的仓库持续集成问题会比较多，暂时还是先把大文件删除了
- 🗓️2023.10.03 分为开发镜像和部署镜像
- 🗓️2023.10.10 极客邦节点日常掉线。。。配置了更新代码自动化部署的流水线，可以将最新的代码同步并构建到用于部署的镜像上，但是由于节点掉线，无法测试，等待节点恢复后测试。

## ✅ 集群控制仿真环境搭建

- 🗓️2023.10.16 完成搭建
    
    <img src="./pic/cluster.png"  width="90%">

## ✅ Docker使用文档

- 🗓️2023.10.17

## ✅ 月结会+新规发布

- 🗓️2023.10.18-21 读新规，PPT，进度规划

## 🟩 仿真测试

### local_planner

- 🗓️2023.10.08 CMU仿真环境加入麦轮支持

### far_planner导航算法仿真测试

- 🗓️2023.09.24 仿真内效果很好
    <img src="./pic/simu.png"  width="90%">
    <img src="./pic/farplanner.png"  width="90%">
    
