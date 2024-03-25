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

## 8. [OPTIONAL] test GUI forwarding

**对于linux->windows:**

1. windowns安装Xlaunch[https://sourceforge.net/projects/xming/]
2. 启动Xlaunch时勾选disable acess control
3. 在linux的./bashrc中写入export DISPLAY=[自己电脑IP]:0.0
4. source bashrc即可转发图形界面

**对于linux->linux**
1. 在ssh配置文件中加入“X11Forwarding yes ForwardX11Trusted yes”
例如：
  Host 192.168.0.101
  HostName 192.168.0.101
  User scurm
  ForwardX11 yes
  ForwardX11Trusted yes
2. 保存配置重新ssh连接即可转发图形界面
3. 如果不行再试试在命令行中输入“xhost +"

## 9. DOCKER开机自启动

对于Ubuntu18.04以上的系统，如果是使用命令sudo apt-get install -y docker.io安装的docker，都可以使用下列命令设置开机启动docker

```bash
systemctl enable docker
```

## 10. 容器自启动

```bash
docker update --restart=always 容器名字或ID
``` 

或者在运行镜像时就加入–restart=always属性

```bash
docker run -itd --name test --restart=always amd64/ubuntu:18.04 /bin/bash 
```

**启动时运行脚本**

```bash
docker run  -itd --name test --restart=always amd64/ubuntu:18.04 /bin/bash  PATH/run.sh
```

- PATH 是 docker 中的绝对路径
- 前面必须有 /bin/bash

**执行多个脚本**

有些时候，如果我们需要使用多个脚本，可以使用一个脚本来启动其它的脚本，也可以使用下列命令

```bash
docker run -itd --name test --restart=always amd64/ubuntu:18.04 /bin/bash PATH/1.sh;PATH/2.sh;PATH/
```

**docker容器启动后退出**

使用 docker ps -a可以查看容器的运行状态，如果我们使用docker start启动容器后，容器自动退出，且docker ps -a看到状态为Exit(0)，那么说明是我们写的脚本没有循环，导致docker执行完脚本以后自动退出，那么只要在自己写的脚本后面加上/bin/bash，如下

```bash
#!/bin/bash
#ls
#cd /
#more
/bin/bash
```

重新打开一个bash，就可以防止容器执行完脚本后退出

对于ROS镜像，默认的启动脚本是ros_entrypoint.sh，位于docker内部的根目录下。如果我们需要在启动容器后执行自己的脚本，可以在ros_entrypoint.sh的最后加上自己的脚本