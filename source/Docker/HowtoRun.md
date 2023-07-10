# How to Run a Container

```bash
docker run [option] [image_name]
```

- -name: name for container

- -it: 分配一个伪终端并保持STDIN打开，以便您可以与容器进行交互

- -d: 让容器在后台运行

- -v 挂载一个卷（volume）到容器中 
    - <span style="color:purple;">【Windows format】E:\file\path\in\host:/home/file/path/in/container</span>

- -e: 设置环境变量
    - <span style="color:purple;">Windos中设置docker内端口转发到xlaunch中的方法:  DISPLAY=host.docker.internal:0.0</span>
    


## EXAMPLE
```bash
docker run -v E:\robotics\orbslam2_learn:/home/orbslam2 -e DISPLAY=host.docker.internal:0.0 -it thiagofalcao/opencv3
```

