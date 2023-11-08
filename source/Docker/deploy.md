# Step by Step in detail: Deploy in NUC

Finally we can deploy our code to the robot!

## 1. install ubuntu in NUC

## 2. install docker, docker-compose, ssh

```bash
sudo apt-get install docker.io
sudo apt-get install docker-compose
sudo apt-get install openssh-server
```

## 3. Use Docker Without sudo

otherwise vscode docker extension will not work

```bash
# Step 1: Create/Make a Docker Group
sudo groupadd docker
#   groupadd: group 'docker' already exists

# Step 2: Add your user to the docker group.
sudo usermod -aG docker $USER
# The “usermod” command modifies an account of user on the system.
# The “-aG docker” option adds the new user to the Docker group. The “-a” flag determines that the user should be added to the group, the “-G” flag specifies the group to which user should be added.
# The “docker” is the group name.
# “$USER” is a variable for the current user’s username.

# Step 3: Log out and log back in so that your group membership is re-evaluated.
newgrp docker

# Step 4: Verify that you can run docker commands without sudo.
docker run hello-world
```

## 4. connect to NUC with ssh

I prefer the wireless way.

- turn on your personal hotspot on your computer.

- connect to the hotspot with NUC
    
    in nuc, connect to the hotspot via cmd line

    ```bash
    # NUC
    nmcli device wifi connect <your_hotspot_name> password <your_hotspot_password>
    ```
    or use GUI if you like

- find the ip address of NUC

    in nuc, run

    ```bash
    # NUC
    ifconfig
    ```

- connect your computer to NUC with ssh

    in your computer, Open VsCode and click remote Explorer, then click the plus button

    then just follow the instructions.

    ```bash
    # your computer
    ssh <username>@<ip_address>
    ```

    for example

    ```bash
    # your computer
    ssh sentry@192.168.137.235
    ```

    then you can see the NUC in your remote explorer. Connect to it.

## 5. pull your docker image from docker hub

follow the instruction in coding "制品仓库"

```bash
# NUC
docker pull <your_image_name>
```

install docker extension in the remote vscode

finnally you can see your image in the image list

## 6. run the image

```bash
export DISPLAY=<your hotspot ip>:0.0
sudo xhost + && sudo docker run -it --network=host --privileged -v /dev:/dev -e DISPLAY=${DISPLAY} sentry:v0.0
```

- --network=host: use host network, livox lidar trasfer data via UDP, and I am tired of forwarding ports. Do not care about security!

- --privileged: use host devices, such as USB, GPU(Though we do not have one 🙃), etc.

- -e: set environment variables, DISPLAY is used for GUI visualization # TODO:

- -v: mount host devices, so that it support hot plug

## 7. connect to docker run in NUC

open docker extension in remote vscode, you can see the container list, attach a vscode window to the container.

DONE!

## 8. [OPTIONAL] test GUI forwarding()

Run GUI in NUC and Forward it to your computer(not recommended)
-----------------------------------------------------------------

in your computer, open XLaunch, and follow the instruction. Remember to check the "Disable access control" option.

in docker container in NUC, run

```bash
rviz2
```
if you can see the rviz2 window in your computer, then it works!`

if not working, in docker container, try to run

```bash
code /etc/ssh/sshd_config
```

add the following lines to the end of the file

```
Port 22

PermitRootLogin yes

ChallengeResponseAuthentication no

UsePAM yes

X11Forwarding yes

X11UseLocalhost no
```

then restart ssh service

```bash
sudo service ssh restart
# or 
/etc/init.d/ssh restart
```
then try rviz again.

Run GUI in Your Computer and receive ROS topic from NUC(recommended)
--------------------------------------------------------------------

you are not required to start a contrainer with DISPLAY environment variable, so the command looks like this

```bash
# in NUC
sudo docker run -it --network=host --privileged -v /dev:/dev sentry:v0.0
```

then in your computer, start a contrainer for GUI visualization

```bash
# in your computer
docker run --gpus all -dit --ipc=host --net=host --privileged -e DISPLAY=host.docker.internal:0.0 -e NVIDIA_DRIVER_CAPABILITIES=all -e ROS_MASTER_URI=http://<your NUC_IP>:11311/ ros:noetic-perception
```

both in the container and your computer, add these lines in correspoding files

```bash
# in ~/.bashrc
export ROS_HOSTNAME=<NUC_NAME>
export ROS_MASTER_URI=http://<your NUC_IP>:11311
export ROS_IP=<your NUC_IP>
```

```bash
# in /etc/hosts
<your NUC_IP> <NUC_NAME>
<your COMPUTER_IP> <COMPUTER_NAME>
```

then start a node to see if it works

```bash
# in NUC's container
roslaunch livox_ros_driver livox_lidar_msg.launch
roslaunch fast_lio mapping.launch
```

```bash
# in your computer's container
rviz
```