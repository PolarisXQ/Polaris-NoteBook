# DevContainer: What Why and How[Optional]

既然使用了Docker，当然还可以考虑使用上DevContainer，来进一步配置开发环境。

## What is DevContainer

[😎read me if you like to](https://zhuanlan.zhihu.com/p/604545087)


**依照本人的理解**
devcontainer = docker container + VSCode

也可以理解为定制了工作空间，比如运行镜像的参数、安装的VSCode插件、进入镜像时需要执行的脚本等等。这些配置都可以通过编写一个json文件来实现。

因此，理论上只要我们有共同的dockerfile,.devcontainer文件，就可以实现一键配置环境，一键启动开发环境,而且所有人的环境，包括VsCode的配置都是一样的。

优雅！

## Recommended Reading

📑[“在我的电脑上明明可以的” — 图解 DevContainer 构建干净的开发环境](https://zhuanlan.zhihu.com/p/604545087)

📑[VSCode Remote Development](https://code.visualstudio.com/docs/remote/remote-overview)



