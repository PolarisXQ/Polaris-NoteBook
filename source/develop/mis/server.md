# 服务器使用指南

## 压缩包

### 解压

```shell    
tar -xvf filename.tar
# 或者使用zip解压
unzip filename.zip
```

### 压缩

```shell
tar -zcvf filename.tar.gz filename
# 或者使用zip压缩
zip -r filename.zip filename
```

## 安装可视化桌面和远程桌面

### 服务器端

1. 安装

```bash
apt-get update && apt-get upgrade -y
# 安装桌面
install xorg xdm xfce4

# 安装基本的依赖包
apt update && apt install -y libglu1-mesa-dev mesa-utils xterm xauth x11-xkb-utils xfonts-base xkb-data libxtst6 libxv1

# 安装libjpeg-turbo和turbovnc
export TURBOVNC_VERSION=2.2.5

export LIBJPEG_VERSION=2.0.90

wget http://aivc.ks3-cn-beijing.ksyun.com/packages/libjpeg-turbo/libjpeg-turbo-official_${LIBJPEG_VERSION}_amd64.deb

wget http://aivc.ks3-cn-beijing.ksyun.com/packages/turbovnc/turbovnc_${TURBOVNC_VERSION}_amd64.deb

dpkg -i libjpeg-turbo-official_${LIBJPEG_VERSION}_amd64.deb
dpkg -i turbovnc_${TURBOVNC_VERSION}_amd64.deb

#删除安装包
rm -rf *.deb
```

2. 启动

以后每一次开启桌面都要执行以下命令

```bash
# 如果再次启动，删除上一次的临时文件，否则无法正常启动，jupyter无法正常开启
rm -rf /tmp/.X1*
#在6006端口启动VNC服务端
USER=root /opt/TurboVNC/bin/vncserver :1 -desktop X -auth /root/.Xauthority -geometry 1920x1080 -depth 24 -rfbwait 120000 -rfbauth /root/.vnc/passwd -fp /usr/share/fonts/X11/misc/,/usr/share/fonts -rfbport 6006
# 检查是否启动，如果有vncserver的进程，证明已经启动
ps -ef | grep vnc
# 启动桌面
export DISPLAY=:1
startxfce4
```

下面是第一次启动时候会出现的提示：

```
You will require a password to access your desktops.
```

第一次输密码要6位，短了则重启动重输入一个，

然后符合要求则会跳出第二个提示：

```
Would you like to enter a view-only password (y/n)?
```

第二次的密码别输入，直接选择 n，然后回车

### 本机端

1. 安装VNC Viewer

https://www.realvnc.com/en/connect/download/viewer/

2. ssh远程登陆

在本地电脑的终端(cmd / powershell / terminal等)中执行代理命令：

```bash
# 根据情况修改IP和端口
ssh -CNg -L 6006:127.0.0.1:6006 root@123.456.789.666 -p 56789
```

连接过程中须保证会话开启，如果是在终端执行的命令那么终端不能关闭

3. 配置VNC Viewer

地址填写：127.0.0.1:6006

密码是刚才在服务器端设置的密码

Done!