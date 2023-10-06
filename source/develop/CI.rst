配置CI节点
#########################

- 节点配置

1. 节点应该运行在服务器的docker内，而不是直接运行在服务器上

2. 按照教程文档配置好docker环境，可以commit一个镜像，方便后续使用

    使用Coding做持续集成可以在dockerhub上拉取codingci/default-env镜像，该镜像已经安装好常用工具

3. 运行docker容器，挂载宿主机的docker.sock，才能在容器内部使用宿主机的docker环境

.. code-block:: bash

    docker run --gpus all -dit --ipc=host --net=host --privileged -v /var/run/docker.sock:/var/run/docker.sock -v /home/geekbang/codingci_rm2024: /home/node/codingci_rm2024 codingci/default-env:test

4. 余下的跟着教程文档走就行了