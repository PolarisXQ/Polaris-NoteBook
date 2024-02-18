# Manage how the callbaks are called: Exeturos & CallbackGroups & Qos

## Exeturos

- responsible for managing the execution of callbacks for a set of subscriptions, services, and timers.

## CallbackGroups

- organizing the callbacks of a node in groups.

- The callback group must be stored throughout execution of the node (eg. as a class member), or otherwise the executor won’t be able to trigger the callbacks.

- Callbacks of different callback groups may always be executed in parallel. The Multi-Threaded Executor uses its threads as a pool to process as many callbacks as possible in parallel according to these conditions. For tips on how to use callback groups efficiently, see [Using Callback Groups](https://docs.ros.org/en/humble/How-To-Guides/Using-callback-groups.html).

## Qos

- Quality of Service

## Relationship between Executors and CallbackGroups

CallbackGroups act as the config options for Executors.

For example

- priority of the callback group


## Types of Executors

### SingleThreadedExecutor(Default)

```cpp
int main(int argc, char* argv[])
{
   // Some initialization.
   rclcpp::init(argc, argv);
   ...

   // Instantiate a node.
   rclcpp::Node::SharedPtr node = ...

   // Run the executor.
   rclcpp::spin(node);

   // Shutdown and exit.
   ...
   return 0;
}
```

is equivalent to:

```cpp
int main(int argc, char* argv[])
{
   // Some initialization.
   rclcpp::init(argc, argv);
   ...

   // Instantiate a node.
   rclcpp::Node::SharedPtr node = ...

   // Instantiate a single-threaded executor.
   rclcpp::executors::SingleThreadedExecutor executor;

   // Add the node to the executor.
   executor.add_node(node);

   // Run the executor.
   executor.spin();

   // Shutdown and exit.
   ...
   return 0;
}
```

The call to spin(node) basically expands to an instantiation and invocation of the Single-Threaded Executor.

- used by the container process for components, i.e. in all cases where nodes are created and executed without an explicit main function.


### MultiThreadedExecutor

- number of threads can be specified when creating the executor.

```cpp 
int main(int argc, char* argv[])
{
   // Some initialization.
   rclcpp::init(argc, argv);
   ...

   // Instantiate a node.
   rclcpp::Node::SharedPtr node = ...

   // Instantiate a multi-threaded executor with 4 threads.
   rclcpp::executors::MultiThreadedExecutor executor(4);

   // Add the node to the executor.
   executor.add_node(node);

   // Run the executor.
   executor.spin();

   // Shutdown and exit.
   ...
   return 0;
}
```

### StaticSingleThreadedExecutor

- used in the case where you want to create a single-threaded executor that is not associated with a node.

```cpp
int main(int argc, char* argv[])
{
   // Some initialization.
   rclcpp::init(argc, argv);
   ...

   // Instantiate a single-threaded executor.
   rclcpp::executors::StaticSingleThreadedExecutor executor;

   // Run the executor.
   executor.spin();

   // Shutdown and exit.
   ...
   return 0;
}
```

## Types of CallbackGroups


### Mutually exclusive

- Callbacks of this group must not be executed in parallel.


### Reentrant

- Callbacks of this group may be executed in parallel.

## Come All Together

### Senario 1:  if messages arrive faster than the callbacks can process them

- SingleThreadedExecutor:

    - Sequential message processing.
    - Potential backlog if callbacks are slow.
    - Callback groups and QoS influence execution order and message handling characteristics.

- MultiThreadedExecutor:

    - Concurrent message processing.
    - Reduced backlog but potential synchronization overhead.
    - Callback groups and QoS still influence execution and message handling but with added concurrency considerations.

### Senario 2:  create a executor that take the latest message and execute a time-consuming callback sequentially

```cpp
int main(int argc, char* argv[])
{
   // Some initialization.
   rclcpp::init(argc, argv);
   ...

   // Instantiate a node.
   rclcpp::Node::SharedPtr node = ...

   // Instantiate a single-threaded executor.
   rclcpp::executors::SingleThreadedExecutor executor;

   // Add the node to the executor.
   executor.add_node(node);

   // Create a subscription to a topic.
   rclcpp::Subscription<sensor_msgs::msg::Image>::SharedPtr subscription = ...

   // Create a callback group.
   rclcpp::CallbackGroup::SharedPtr callback_group = node->create_callback_group(
      rclcpp::CallbackGroupType::MutuallyExclusive);
   rclcpp::SubscriptionOptions options;
   options.callback_group = callback_group;

   // Create a subscription to a topic with the callback group.
   rclcpp::Subscription<sensor_msgs::msg::Image>::SharedPtr subscription = node->create_subscription<sensor_msgs::msg::Image>(
      "topic", rclcpp::SensorDataQoS(), std::bind(&callback, std::placeholders::_1), options);

   // Run the executor.
   executor.spin();

   // Shutdown and exit.
   ...
   return 0;
}
```

- '10' is the queue size of the subscription.
- 'rmw_qos_profile_sensor_data' is the QoS profile of the subscription. The main characteristic of this profile is that it is transient local, meaning that the messages are not stored if there are no subscribers.

** ANSWERS FOLLOWING IS GENERATED BY GPT **

- Q: which msg dose the callback function take when the last msg was processed, the latest in the queue or the oldest?
- A: The callback function will process the oldest message in the queue first.

- Q: how to make the callback function take the latest message in the queue?
- A: change the queue size from 10 to 1.

## References

https://docs.ros.org/en/humble/Concepts/Intermediate/About-Executors.html

https://docs.ros.org/en/humble/How-To-Guides/Using-callback-groups.html

https://docs.ros.org/en/humble/Concepts/Intermediate/About-Quality-of-Service-Settings.html