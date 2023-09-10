FROM ros:humble-perception-jammy

# source ros environment
RUN echo "source /opt/ros/$ROS_DISTRO/setup.bash" >> ~/.bashrc
RUN echo "force_color_prompt=yes" >> ~/.bashrc

# cloudcompare
# https://www.danielgm.net/cc/release/

# 
RUN apt-get update && apt-get install -y \
    # for using add-apt-repository
    software-properties-common \
    # for download 
    wget

# Install dependencies
RUN apt-get update && apt-get install -y \
    # rviz2
    ros-$ROS_DISTRO-rviz2 \
    # Gazebo
    # ros-humble-gazebo-ros \
    # rqt
    ros-$ROS_DISTRO-rqt \
    ros-$ROS_DISTRO-rqt-common-plugins \
    # navigation2
    ros-$ROS_DISTRO-navigation2 \
    ros-$ROS_DISTRO-nav2-bringup \
    # Turtlebot3
    ros-$ROS_DISTRO-turtlebot3-gazebo \
    # octomap dependencies
    ros-humble-octomap ros-humble-octomap-msgs ros-humble-octomap-mapping \
    ros-humble-octomap-ros ros-humble-octomap-rviz-plugins ros-humble-octomap-server\
    # octomap viewer
    octovis \
    # gridmap dependencies
    # 🫠 if you are learning gridmap, you may need to install the following packages
    # ros-humble-grid-map-demos
    ros-humble-grid-map ros-humble-grid-map-cmake-helpers ros-humble-grid-map-core \
    ros-humble-grid-map-costmap-2d ros-humble-grid-map-cv ros-humble-grid-map-filters \
    ros-humble-grid-map-loader ros-humble-grid-map-msgs ros-humble-grid-map-octomap \
    ros-humble-grid-map-pcl ros-humble-grid-map-ros ros-humble-grid-map-rviz-plugin \
    ros-humble-grid-map-sdf ros-humble-grid-map-visualization 


# LIO-SAM
# Add GTSAM-PPA
RUN add-apt-repository ppa:borglab/gtsam-release-4.1
RUN apt-get install -y \
    ros-humble-perception-pcl \
    ros-humble-pcl-msgs \
    ros-humble-vision-opencv \
    ros-humble-xacro \
    libgtsam-dev libgtsam-unstable-dev 

# Download models for gazebo
RUN mkdir -p /root/.gazebo/models
WORKDIR /root/.gazebo/models
RUN wget http://file.ncnynl.com/ros/gazebo_models.txt
RUN wget -i gazebo_models.txt
# extract models
RUN ls model.tar.g* | xargs -n1 tar xzvf
# clean up
RUN rm model.tar.gz*


# Install extra dependencies with apt

# Install extra dependencies with pip

# add start script
CMD /bin/bash
