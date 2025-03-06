# Dockernize Everything!

## What is Docker

**依照本人的理解** docker就是把操作系统当成一个定制化的软件在跑

docker镜像（image）像是一个程序，可以用dockerfile来自己定制这个操作系统，也可以直接从docker hub上下载

docker容器（container）像是一个进程，是这个对应的镜像的实例化。

所以，docker的工作原理就是，运算仍然是调用本机的资源，但是在你可以在docker里面运行任何一种操作系统，还可以做到定制化。

## Why Docker

所以为什么dockernize everything，因为可以从此解决配环境的问题，灭绝“新手劝退第一步”，防止“在我的电脑上明明可以的！！！”

## Docker + CI

使用Docker的另一个优势就是，使用Docker加上持续集成，可以大大提高开发效率。

- 通过配置流水线，可以实现代码的自动化测试，自动化构建，自动化部署，并且把构建好的镜像存在云端，任何人下载这个镜像就可以一键开跑。

- 避免了配环境的重复工作

- 实现了合理的资源分配，让服务器专注于构建镜像，而不是在每一个机器上都构建一遍

## Docker compose

学习中。。。

## Recommended Reading

📑[Docker official doc](https://docs.docker.com/get-started/overview/)