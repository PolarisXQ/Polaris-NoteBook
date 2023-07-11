# How to Run a Container

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

- --privileged：表示容器将以特权模式运行，可以访问主机的所有设备和文件系统。

- -net 选项是为了将容器连接到网络

## EXAMPLE
```bash
docker run -v E:\robotics\orbslam2_learn:/home/orbslam2 -e DISPLAY=host.docker.internal:0.0 -it thiagofalcao/opencv3
```

