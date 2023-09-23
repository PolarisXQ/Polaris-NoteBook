# Dockernize Everything!

## What and Why

**依照本人的理解** docker就是把操作系统当成一个软件在跑

docker镜像（image）像是一个程序，可以用dockerfile来自己定制这个操作系统，也可以直接从docker hub上下载

docker容器（container）就是一个进程，可以在这个进程里面运行任何一种操作系统，而且不会影响到本机的操作系统。

所以，docker的工作原理就是，运算仍然是调用本机的资源，但是在你可以在docker里面运行任何一种操作系统，还可以做到定制化。

所以为什么dockernize everything，因为可以从此解决配环境的问题，灭绝“新手劝退第一步”，防止“在我的电脑上明明可以的！！！”

### Docker + CI

Docker的另一个优势就是，只要我写好了dockerfile,上传到github或者任何代码托管平台，并且配置好持续集成的流程，就可以让docker build这一步在服务器上运行，并且把构建好的镜像存在云端，任何人下载这个镜像就可以一键开跑，不用配环境，不用build!

以前我们是在每一个机器上分别配好环境，拉取代码，build,非常耗时，现在只需要在服务器上build一次。

这种分发的思想，还是很高效的。

## Docker compose

学习中。。。

## Recommended Reading

📑[Docker official doc](https://docs.docker.com/get-started/overview/)