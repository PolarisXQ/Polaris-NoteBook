配置CI节点
#########################

节点配置
************************

1.节点应该运行在服务器的docker内，而不是直接运行在服务器上

2.按照教程文档配置好docker环境，可以将环境commit一个镜像，方便后续使用

使用Coding做持续集成可以在dockerhub上拉取codingci/default-env镜像，该镜像已经安装好常用工具

但还缺少crontab

.. code-block:: bash

  apt-get install libconfig-crontab-perl libset-crontab-perl python3-crontab

3.运行docker容器，挂载宿主机的docker.sock，才能在容器内部使用宿主机的docker环境

.. code-block:: bash

  docker run --gpus all -dit --ipc=host --net=host --privileged -v /var/run/docker.sock:/var/run/docker.sock -v /home/geekbang/codingci_rm2024: /home/node/codingci_rm2024 codingci/default-env:test

4.余下的跟着教程文档走就行了

常用的构建计划jenkinsfile
***************************



Jenkins + Docker
************************

if you continously fail to checkout, think about if you use git lfs to manage your large files.

if the answer is yes, then you need to add a step in your CI workflow to install git lfs and pull the large files.

.. code-block:: xml

  pipeline {
    agent any
    stages {
      stage('检出') {
        steps {
          checkout([
            $class: 'GitSCM',
            branches: [[name: env.GIT_BUILD_REF]],
            extensions: [
              // 添加 GitLFSPull 插件
              [$class: 'GitLFSPull'],
            ],
            userRemoteConfigs: [[
              url: env.GIT_REPO_URL,
              credentialsId: env.CREDENTIALS_ID
            ]]
          ])
        }
      }
    }
  }
