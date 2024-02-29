# Composition and Intra-process Communication

## Composition

- Main Idea: Combine multiple nodes into a single process

- Advantages:

  - Organize related functionality
  - Improve performance
  - Simplify deployment

- Disadvantages:

  - Tighter coupling
  - Single point of failure

- Types of Composition:
  - Component Container: Component container with a single-threaded executor.
  - Component Container Isolated: Component container with dedicated single-threaded executors for each components.
  - Component Container MT: Component container with a multi-threaded executor.

## Intra-process Communication

- Main Idea: Communicate between nodes within the same process

- Advantages:

  - Efficient communication
  - Simplify data sharing

- Disadvantages:
  - Tighter coupling
  - Limited to a single process?

## Example

```cpp
// FILE: talker_component.hpp
#ifndef COMPOSITION__TALKER_COMPONENT_HPP_
#define COMPOSITION__TALKER_COMPONENT_HPP_

#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

namespace composition
{

class Talker : public rclcpp::Node
{
public:
  COMPOSITION_PUBLIC
  // default parameter is to use intra-process communication
  explicit Talker(const rclcpp::NodeOptions & options=rclcpp::NodeOptions().use_intra_process_comms(true));

protected:
  void on_timer();

private:
  size_t count_;
  rclcpp::Publisher<std_msgs::msg::String>::SharedPtr pub_;
  rclcpp::TimerBase::SharedPtr timer_;
};

}  // namespace composition

#endif  // COMPOSITION__TALKER_COMPONENT_HPP_
```

```cpp
// FILE: talker_component.cpp
#include "talker_component.hpp"

#include <chrono>
#include <iostream>
#include <memory>
#include <utility>

#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

using namespace std::chrono_literals;

namespace composition
{
// Create a Talker "component" that subclasses the generic rclcpp::Node base class.
// Components get built into shared libraries and as such do not write their own main functions.
// The process using the component's shared library will instantiate the class as a ROS node.
Talker::Talker(const rclcpp::NodeOptions & options)
: Node("talker", options), count_(0)
{
  pub_ = create_publisher<std_msgs::msg::String>("chatter", 10);
  timer_ = create_wall_timer(1s, std::bind(&Talker::on_timer, this));
}

void Talker::on_timer()
{
  auto msg = std::make_unique<std_msgs::msg::String>();
  msg->data = "Hello World: " + std::to_string(++count_);
  RCLCPP_INFO(this->get_logger(), "Publishing: '%s'", msg->data.c_str());
  std::flush(std::cout);

  // Put the message into a queue to be processed by the middleware.
  // This call is non-blocking.
  pub_->publish(std::move(msg));
}

}  // namespace composition

#include "rclcpp_components/register_node_macro.hpp"
// Register the component with class_loader.
// This acts as a sort of entry point, allowing the component to be discoverable when its library
// is being loaded into a running process.
RCLCPP_COMPONENTS_REGISTER_NODE(composition::Talker)
```

```cpp
// FILE: main.cpp
#include "rclcpp/rclcpp.hpp"
#include "composition/talker_component.hpp"

// A main function is optional for a component
int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<composition::Talker>());
  rclcpp::shutdown();
  return 0;
}
```

```makefile
# FILE: CMakeLists.txt
cmake_minimum_required(VERSION 3.5)

project(composition)

# Default to C++14
if(NOT CMAKE_CXX_STANDARD)
  set(CMAKE_CXX_STANDARD 14)
endif()

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# find dependencies
find_package(ament_cmake REQUIRED)
find_package(example_interfaces REQUIRED)
find_package(rclcpp REQUIRED)
find_package(rclcpp_components REQUIRED)
find_package(rcutils REQUIRED)
find_package(std_msgs REQUIRED)

# include directories
include_directories(include)

# add the components
add_library(talker_component SHARED
  src/talker_component.cpp)
ament_target_dependencies(talker_component
  rclcpp
  rclcpp_components
  std_msgs)
rclcpp_components_register_nodes(talker_component "composition::Talker") # MUST BE THE SAME AS THE CLASS NAME

add_library(listener_component SHARED
  src/listener_component.cpp)
target_compile_definitions(listener_component
  PRIVATE "COMPOSITION_BUILDING_DLL")
ament_target_dependencies(listener_component
  rclcpp
  rclcpp_components
  std_msgs)
rclcpp_components_register_nodes(listener_component "composition::Listener")

# This use main function to run the component as a standalone node
add_executable(talker_node
  src/main.cpp)
target_link_libraries(talker_node
  talker_component)
ament_target_dependencies(talker_node
    rclcpp
    rclcpp_components
    std_msgs)

# Install the components
install(TARGETS
  talker_component
  listener_component
  ARCHIVE DESTINATION lib
  LIBRARY DESTINATION lib
  RUNTIME DESTINATION bin)

# Install the executables
install(TARGETS
  talker_node
  DESTINATION lib/${PROJECT_NAME})

# Install launch files.
install(DIRECTORY
  launch
  DESTINATION share/${PROJECT_NAME}
)

ament_package()
```

```python
# FILE: launch/talker_component.launch.py
"""Launch a talker and a listener in a component container."""

import launch
from launch_ros.actions import ComposableNodeContainer
from launch_ros.descriptions import ComposableNode


def generate_launch_description():
    """Generate launch description with multiple components."""
    container = ComposableNodeContainer(
            name='my_container',
            namespace='',
            package='rclcpp_components',
            # choose from three types of container as you need
            executable='component_container',
            composable_node_descriptions=[
                ComposableNode(
                    package='composition',
                    plugin='composition::Talker',
                    name='talker',
                    parameters=[{'use_sim_time': False}]
                    extra_arguments=[{'use_intra_process_comms': True}]
                    remappings=[('chatter', 'my_chatter')]
                    ),
                ComposableNode(
                    package='composition',
                    plugin='composition::Listener',
                    name='listener')
            ],
            output='screen',
    )

    return launch.LaunchDescription([container])
```

### Key Points

- The `Talker` class is derived from `rclcpp::Node` and has a constructor that takes a `rclcpp::NodeOptions` object.
- The publisher publishes a message and transfers ownership of the message to the middleware using `std::move`. This make it possible for zero-copy transfer of the message.
- The subscriber's node is created in a similar way to the publisher's node. One thing to note is how the callback function receives the message, as we will see in the next section. 
- Components get built into shared libraries and as such do not write their own main functions. However, you can still write a main function and using `rclcpp::spin` to run the component as a standalone node.
- The intra-process communication is enabled in launch file by setting `use_intra_process_comms` to `True` in the `ComposableNode` description.

### About Listeners' Callback Function

```cpp
listener_callback(const std_msgs::msg::String::SharedPtr msg);
listener_callback(const std_msgs::msg::String::UniquePtr msg);
```

- The callback function can receive the message as either a shared pointer or a unique pointer.
- Use the unique pointer when the message is to be moved to another part of the program. i.e. the message is to be used in only one place. In this case, we can realize zero-copy transfer of the message, which is more efficient.(The message is not copied, but moved to the subscriber's callback function with std::move.)
- Use the shared pointer when the message is to be shared with other parts of the program. i.e. the message is to be used in multiple places.

### More about std::move

When an object is passed to a function, it is typically copied or moved depending on the context. However, in some cases, we may want to explicitly indicate that we want to move the object instead of making a copy. This is where std::move comes into play.

### More About ROS2 Pointer Types

For each pointer type there a non-const and a const typedef:

RawPtr and ConstRawPtr
SharedPtr and ConstSharedPtr
UniquePtr and ConstUniquePtr
WeakPtr and ConstWeakPtr

- RawPtr is a simple pointer to an object.
- SharedPtr is used for shared ownership of an object. It is used when multiple parts of the program need to access the object.
- UniquePtr is used for exclusive ownership of an object. It is used when only one part of the program needs to access the object.
- WeakPtr is used to break circular references between SharedPtr objects.
- ConstSharedPtr is a shared pointer to a const object.
- ConstUniquePtr is a unique pointer to a const object.
- ConstWeakPtr is a weak pointer to a const object.

ConstSharedPtr and UniquePtr are widely used in ROS programming for shared ownership and unique ownership, respectively. However, ConstUniquePtr is not typically utilized due to its contradictory nature.

## References

[About-Composition](https://docs.ros.org/en/foxy/Concepts/About-Composition.html)

[Component Tutorial](https://docs.ros.org/en/foxy/Tutorials/Intermediate/Composition.html)

[Intra-process Communication](https://docs.ros.org/en/foxy/Concepts/About-Intra-Process-Communication.html)

[Code Examples](https://github.com/ros2/demos/tree/foxy)
