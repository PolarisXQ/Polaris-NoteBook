# WSL2 

## 迁移教程

``` powershell
wsl -l -v  #查看安装的发行版版本
  NAME            STATE           VERSION
* Ubuntu-22.04    Running         2
  Ubuntu-20.04    Running         2
wsl --shutdown  #关闭所有发行版 后可跟名称关闭指定版本

wsl --export Ubuntu-20.04 D:\Ubuntu-20.04.backup.tar  #导出系统 名字和目录随便指定
正在导出，这可能需要几分钟时间。
操作成功完成。

wsl --unregister Ubuntu-20.04 #注销系统
正在注销。
操作成功完成。

#导入系统 到G:\wsl2\Ubuntu20.04 
wsl --import Ubuntu-20.04 G:\wsl2\Ubuntu20.04  D:\Ubuntu-20.04.backup.tar --version 2
正在导入，这可能需要几分钟时间。
操作成功完成。

#配置默认用户 
#ubuntu2004.exe的默认路径在C:\Users\Administrator\AppData\Local\Microsoft\WindowsApps
#进入此路径运行(cmd不用加.\)
ubuntu2004.exe config --default-user techtian
```