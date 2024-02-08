# Learning TF2

## Header Files

```cpp
// TransformStamped message type
#include "geometry_msgs/msg/transform_stamped.hpp"

// convenient functions for converting Euler angles to quaternions and vice versa
#include "tf2/LinearMath/Quaternion.h"

// StaticTransformBroadcaster
#include "tf2_ros/static_transform_broadcaster.h"

// TransformBroadcaster 
#include "tf2_ros/transform_broadcaster.h"

// Buffer
#include "tf2_ros/buffer.h"

// TransformListener
#include "tf2_ros/transform_listener.h"

// 
#include "tf2_ros/message_filter.h"
```

## Broadcaster Listeners & Buffers

### Broadcaster

```cpp
// declaration
// shared ptr is used to avoid memory leaks
std::shared_ptr<tf2_ros::StaticTransformBroadcaster> tf_static_broadcaster_;
std::unique_ptr<tf2_ros::TransformBroadcaster> tf_broadcaster_;

// definition
tf_static_broadcaster_ = std::make_shared<tf2_ros::StaticTransformBroadcaster>(this);
tf_broadcaster_ = std::make_unique<tf2_ros::TransformBroadcaster>(this);

// broadcast
tf_static_broadcaster_->sendTransform(tf_static_transform);
// "tf2_ros/static_transform_broadcaster.h"
void sendTransform(const geometry_msgs::msg::TransformStamped & transform);
void sendTransform(const std::vector<geometry_msgs::msg::TransformStamped> & transforms);

tf_broadcaster_->sendTransform(tf_transform)
// "tf2_ros/transform_broadcaster.h"
void sendTransform(const geometry_msgs::msg::TransformStamped & transform);
void sendTransform(const std::vector<geometry_msgs::msg::TransformStamped> & transforms);

```

### Listener & Buffer

```cpp
// declaration
std::shared_ptr<tf2_ros::TransformListener> tf_listener_{nullptr};
std::unique_ptr<tf2_ros::Buffer> tf_buffer_;

// definition
tf_buffer_ = std::make_unique<tf2_ros::Buffer>(this->get_clock());
tf_listener_ = std::make_shared<tf2_ros::TransformListener>(*tf_buffer_);

// query the listener for a specific transformation. 
geometry_msgs::msg::TransformStamped transform;
try
{
    odom_now_tf = tf_buffer_->lookupTransform(toFrameRel, fromFrameRel, tf2::TimePointZero);
}
catch (const tf2::TransformException &ex)
{
    RCLCPP_ERROR(this->get_logger(), "Transform error: %s", ex.what());
    return;
}

// "tf2_ros/buffer.h"
// commonly used functions
geometry_msgs::msg::TransformStamped
  lookupTransform(
    const std::string & target_frame, const std::string & source_frame,
    const tf2::TimePoint & time, const tf2::Duration timeout) const override;
geometry_msgs::msg::TransformStamped
  lookupTransform(
    const std::string & target_frame, const std::string & source_frame,
    const rclcpp::Time & time,
    const rclcpp::Duration timeout = rclcpp::Duration::from_nanoseconds(0)) const;

// used when the time of the source and target frames are different, for more examples, see TIME section below
geometry_msgs::msg::TransformStamped
  lookupTransform(
    const std::string & target_frame, const tf2::TimePoint & target_time,
    const std::string & source_frame, const tf2::TimePoint & source_time,
    const std::string & fixed_frame, const tf2::Duration timeout) const override;
geometry_msgs::msg::TransformStamped
  lookupTransform(
    const std::string & target_frame, const rclcpp::Time & target_time,
    const std::string & source_frame, const rclcpp::Time & source_time,
    const std::string & fixed_frame,
    const rclcpp::Duration timeout = rclcpp::Duration::from_nanoseconds(0)) const;
```

- `tf_listener` is not explicitly called. Once the listener is created, it starts receiving tf2 transformations over the wire(i.e. stores all the coordinate transforms coming from the different tf2 broadcasters.), and buffers them for up to 10 seconds. 

- `canTransform` has the same format as lookupTransform, but it returns a boolean value indicating whether the transformation is available or not.


## Time

- For tf2, time 0 means “the latest available” 
```cpp
transformStamped = tf_buffer_->lookupTransform(
   toFrameRel,
   fromFrameRel,
   tf2::TimePointZero);
```

- The tf2 package has it’s own time type tf2::TimePoint, which is different from rclcpp::Time. Many APIs in the package tf2_ros automatically convert between rclcpp::Time and tf2::TimePoint.
```cpp
rclcpp::Time now = this->get_clock()->now();
transformStamped = tf_buffer_->lookupTransform(
   toFrameRel,
   fromFrameRel,
   now);
```

- Notice that it takes some time before a new transform gets into the buffer, it induce the INFO message if you use `now(rclcpp：：Time())` rather then `tf2::TimePointZero`
```bash
[INFO] [1629873136.345688064] [listener]: Could not transform turtle1 to turtle2: Lookup would
require extrapolation into the future.  Requested time 1629873136.345539 but the latest data
is at time 1629873136.338804, when looking up transform from frame [turtle1] to frame [turtle2]
tf_listener_ = std::make_shared<tf2_ros::TransformListener>(*tf_buffer_);
```

- to get rid of "extrapolation into the future" INFO when using `now`, add timeout parameter to the lookupTransform function
```cpp
rclcpp::Time now = this->get_clock()->now();
transformStamped = tf_buffer_->lookupTransform(
   toFrameRel,
   fromFrameRel,
   now,
   50ms);
```

- (Advanced API for lookupTransform())[https://docs.ros.org/en/humble/Tutorials/Intermediate/Tf2/Time-Travel-With-Tf2-Cpp.html#advanced-api-for-lookuptransform]
```cpp
rclcpp::Time now = this->get_clock()->now();
rclcpp::Time when = now - rclcpp::Duration(5, 0);
t = tf_buffer_->lookupTransform(
    toFrameRel,
    now,
    fromFrameRel,
    when,
    "world",
    50ms);
```

 ## Debug

 [INFO] [1630223557.477636052] [tf2_echo]: Waiting for transform turtle3 ->  turtle1:
Invalid frame ID "turtle3" passed to canTransform argument target_frame - frame does
not exist

[INFO] [1630223557.477636052] [tf2_echo]: Waiting for transform turtle3 ->  turtle1:
Invalid frame ID "turtle3" passed to canTransform argument target_frame - frame does
not exist

```bash
# check specific frames
ros2 run tf2_ros tf2_echo turtle3 turtle1

# check all the frames, it will generate a pdf file
ros2 run tf2_tools view_frames

# check the timestamp
ros2 run tf2_ros tf2_monitor turtle2 turtle1
```

## Quaternion


## Conversion

conversion between tf2 and geometry_msgs\eigen\bullet\KDL is available

see prototype in tf2_geometry_msgs.hpp\tf2_eigen.hpp\tf2_bullet.hpp\tf2_kdl.hpp for more details

<details>
  <summary>tf2_eigen.hpp</summary>
  
  ```cpp
    {} tf2
    

  ```
  
</details>




tf2::doTransform(odom_now, odom_now, odom_now_tf);



 inverseTime 
