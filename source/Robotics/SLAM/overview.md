# A Simple Overview

## Geometry Method

ORB

[TSDF](https://www.guyuehome.com/15664)

Mesh

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
