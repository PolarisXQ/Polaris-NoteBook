# ROS -> ROS2 Migration Guide

ros::Time::now()==>rclcpp::Time()

std_msgs/Header.h==>##include <std_msgs/Header.h>

#include <sensor_msgs/Imu.h> ==> #include <sensor_msgs/msg/imu.h>

#include <sensor_msgs/PointCloud2.h>==>#include <sensor_msgs/msg/point_cloud2.hpp>

#include <ros/ros.h>==>#include <rclcpp/rclcpp.hpp>

#include <geometry_msgs/Vector3.h> ==> #include <geometry_msgs/msg/vector3.hpp>

tf:: ==> tf2::

_msgs:: ==> _msgs::msg::

#include <geometry_msgs/PoseWithCovarianceStamped.h> ==> #include <geometry_msgs/msg/pose_with_covariance_stamped.hpp>

#include <nav_msgs/Odometry.h> ==> #include <nav_msgs/msg/odometry.hpp>

#include <nav_msgs/Path.h>==> #include <nav_msgs/msg/path.hpp>

#include <tf/transform_listener.h> ==> #include <tf2_ros/transform_listener.h>

#include <tf/transform_broadcaster.h> ==> #include <tf2_ros/transform_broadcaster.h>

++#include <tf2_ros/buffer.h>

#include <tf/transform_datatypes.h> ==> #include <tf2/LinearMath/Quaternion.h>

#include <sensor_msgs/NavSatFix.h> ==> #include <sensor_msgs/msg/nav_sat_fix.hpp>

#include <visualization_msgs/Marker.h> ==> #include <visualization_msgs/msg/marker.hpp>

header.stamp.toSec()==>header.stamp.sec+header.stamp.nanosec/1e9

or

header.stamp.toSec()==>rclcpp::Time(header.stamp).seconds()

ROS_INFO( )==>RCLCPP_INFO(rclcpp::get_logger("node_name"),

ROS_ASSERT( )==>RCLCPP_ASSERT(rclcpp::get_logger("node_name"),

or assert( )

#include <pcl_ros/point_cloud.h> ==> #include <pcl_conversions/pcl_conversions.h>

#include <visualization_msgs/MarkerArray.h> ==> #include <visualization_msgs/msg/marker_array.hpp>

#include <ros/ros.h> ==> #include <rclcpp/rclcpp.hpp>

#include <livox_ros_driver2/CustomMsg.h> ==> #include <livox_ros_driver2/CustomMsg.h>

#include <std_msgs/Float64MultiArray.h> ==> #include <std_msgs/msg/float64_multi_array.hpp>