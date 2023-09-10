# On the bumpy road to SLAM

## PCL-Cmake

```cmake
set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
```
or try this
```cmake
# change add_definitions(-std=c++11 ***) 
# to
add_definitions(-std=c++14 ***) 
```


## GTSAM eigen version error

catkin build --cmake-args -DCMAKE_BUILD_TYPE=Release -DGTSAM_USE_SYSTEM_EIGEN=ON