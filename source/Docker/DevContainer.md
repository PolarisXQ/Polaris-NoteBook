# DevContainer: What Why and How

## What is DevContainer

[😎read me if you like to](https://zhuanlan.zhihu.com/p/604545087)


**依照本人的理解**
devcontainer= docker container + VSCode

也可以理解为，运行一个镜像，然后用ssh将VSCode连接到这个镜像上,并且定制化了一些东西，比如说安装了一些插件，配置了一些环境变量等等。然后这些配置是通过编写一个json文件来实现的。

因此，理论上只要我们有共同的dockerfile,.devcontainer文件，就可以实现一键配置环境，一键启动开发环境,而且所有人的环境都是一样的。

优雅！

## Recommended Reading

📑[“在我的电脑上明明可以的” — 图解 DevContainer 构建干净的开发环境](https://zhuanlan.zhihu.com/p/604545087)

📑[VSCode Remote Development](https://code.visualstudio.com/docs/remote/remote-overview)



