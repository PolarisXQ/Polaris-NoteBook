# An Simple Overview

## Geometry Method


| Algorithm     | Sensors                 | Back-End Optimization Algorithms     | Image Detection Methods    | Semantic Information |
|---------------|-------------------------|--------------------------------------|----------------------------|----------------------|
| ORB-SLAM      | Monocular, Stereo [IMU] ,Depth     | Pose graph optimization [g2o]             | ORB feature matching       | Absence              |
| DSO           | Monocular               | Direct Sparse Odometry (DSO) [g2o]        | Photometric error minimization, feature tracking   | Absence              |
| VINS-mono     | Monocular               | Visual-Inertial Optimization (VIO)   | Feature tracking, IMU integration   | Absence              |
| VINS-Fusion   | Monocular, Stereo, IMU  | Visual-Inertial Optimization (VIO)   | Feature tracking, IMU integration   | Absence              |
| ROVIOLI       | Monocular, IMU, LiDAR   | Pose graph optimization              | Feature matching, IMU integration, LiDAR odometry   | Absence              |
| ELASTICFUSION | RGB-D, IMU              | Pose graph optimization              | RGB-D frame-to-frame tracking, surfel fusion   | Absence              |
| VOXBLOX       | RGB-D                   | Volumetric fusion                     | TSDF volume integration, feature-based tracking  | Absence              |
| SLAM++        | Monocular, Stereo, IMU  | Pose graph optimization               | Feature matching, IMU integration, geometric constraints  | Absence              |
| SemanticFusion| RGB-D                   | Volumetric fusion                      | Semantic segmentation, depth fusion  | Presence             |
| Mask-fusion   | RGB-D                   | Volumetric fusion                      | Instance segmentation, depth fusion  | Presence             |
| Segmap        | RGB-D                   | Pose graph optimization, volumetric representation | Feature-based tracking, segmentation  | Presence             |
| XIVO          | Monocular, Stereo, IMU  | Pose graph optimization              | Feature matching, IMU integration, geometric constraints  | Absence              |
| Voxblox++     | RGB-D                   | Volumetric fusion                     | Feature-based tracking, surfel mapping  | Absence              |
| Kimera        | RGB-D, IMU              | Pose graph optimization, volumetric fusion | Feature matching, IMU integration, surfel mapping, semantic segmentation | Presence             |
