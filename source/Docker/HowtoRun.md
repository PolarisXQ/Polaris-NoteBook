# Some Useful Command for Docker

## How to Run a Container
```bash
docker run [option] [image_name]
```
- --gpus all 要在主机上安装 NVIDIA Container Toolkit
    - all：在容器内启用所有可用的GPU设备
    - 0,1,2：在容器内启用指定的GPU设备，这里的数字表示GPU设备的索引号
    - gpu-model-name:3：在容器内启用指定型号和数量的GPU设备，这里的 gpu-model-name 是GPU设备型号的名称，数字 3 表示要启用3个该型号的GPU设备

- -name: name for container

- -it: 分配一个伪终端并保持STDIN打开，以便您可以与容器进行交互

- -d: 让容器在后台运行

- -v 挂载一个卷（volume）到容器中，文件同步修改
    - <span style="color:purple;">【Windows format】E:\file\path\in\host:/home/file/path/in/container</span>

- -e: 设置环境变量
    - <span style="color:purple;">Windos中设置docker内端口转发到xlaunch中的方法:  DISPLAY=host.docker.internal:0.0</span>

    - NVIDIA_DRIVER_CAPABILITIES=all 选项是为了在容器中启用NVIDIA GPU加速，以便在容器内运行需要GPU的应用程序。

    
- --ipc：表示容器使用主机的 IPC（进程间通信）命名空间。

- --privileged：表示容器将以特权模式运行，可以访问主机的所有设备和文件系统。特别是显卡！！！

- --network 选项是为了将容器连接到网络,有host，none，bridge三种模式

- --pid host 与物理机共享PID命名空间


## OPTIONS FOR ROS

__To make two container communicate with each other：__

in container A， run roscore with a specific URI and net;
in container B & C, connet to container A with the same net, ros-master URI;
so B&C are using the same roscore and share the same network

- -e ROS_MASTER_URI=http://ros-master:11311 

## EXAMPLE
```bash
docker run -v E:\robotics\orbslam2_learn:/home/orbslam2 -e DISPLAY=host.docker.internal:0.0 -dit thiagofalcao/opencv3
```

```bash
docker run -dit --name sim-server --network net-sim ^
	--gpus all ^
	-e ROS_MASTER_URI=http://ros-master:11311 ^
	-e DISPLAY=^%DISPLAY% ^
	-e QT_X11_NO_MITSHM=1 ^
	-e NO_AT_BRIDGE=1 ^
	-e LIBGL_ALWAYS_SOFTWARE=1 ^
	-e NVIDIA_DRIVER_CAPABILITIES=all ^
	-v /tmp/.X11-unix:/tmp/.X11-unix ^
	%SERVER_IMAGE% 
```

```shell
docker run -dit --network net-sim --gpus all -e NVIDIA_DRIVER_CAPABILITIES=all -e DISPLAY=host.docker.internal:0.0 client:latest
```

```shell
docker run --gpus all -dit --ipc=host --net=host --privileged -e DISPLAY=host.docker.internal:0.0 -e NVIDIA_DRIVER_CAPABILITIES=all kimera:mine /bin/bash
```

For Mid360
```shell
docker run -dit -p 56101:56101/udp -p 56201:56201/udp -p 56301:56301/udp -p 56401:56401/udp -p 56501:56501/udp --privileged -e DISPLAY=host.docker.internal:0.0 -e NVIDIA_DRIVER_CAPABILITIES=all rm_sentry:app
```

apt install -Y libnet-ifconfig-wrapper-perl iputils-ping 

## How to Commit

现在，我们需要将容器中的更改更新到原始镜像。首先，我们需要获取容器 ID：
```shell
docker ps -l
```

找到容器 ID 后，可以使用以下命令生成一个新的镜像：

```shell
docker commit CONTAINER_ID NEW_IMAGE_NAME[:tag(latest)]
```


