# 【GIT-4】进阶仓库管理

教程定位：进阶

## git lfs

git lfs 是一个 Git 的扩展，用于存储大文件。

### 安装

```bash
brew install git-lfs
```

### 使用

```bash
git lfs install # 初始化
git lfs track "*.psd" # 添加需要追踪的文件
git add .gitattributes # 提交.gitattributes文件
git add file.psd # 提交文件
git commit -m "add psd file" # 提交
git push origin master # 推送
```

## git submodule

git submodule 是在一个仓库中引入另一个仓库。

### 添加子模块

```bash
git submodule add
```

### 克隆包含子模块的仓库

```bash
git clone --recursive
```

如果在克隆仓库时没有使用 --recursive 参数，可以使用以下命令初始化子模块

```bash
git submodule init
```

然后更新子模块

```bash
git submodule update
```

### 更新子模块

如果子模块有更新，需要更新子模块

```bash
git submodule update
```

## gitignore

.gitignore 文件用于指定忽略的文件。比如python项目，可以忽略 pycache 文件夹。

### 创建

```bash
touch .gitignore
```

### 编辑

```txt
*.pyc
__pycache__
```

可以使用通配符，比如 *.pyc 表示忽略所有以 .pyc 结尾的文件。
对于文件夹，可以使用 / 表示忽略文件夹下的所有文件。

### 生效

```bash
git add .gitignore
git commit -m "add gitignore"
git push origin master
```

如果已经提交了不想提交的文件，可以使用以下命令删除

```bash
git rm --cached file
```

## 同时提交并推送到两个仓库

一份代码如何同时提交并推送到两个仓库, 需要明确从哪个仓库拉取代码

查看仓库绑定情况

```shell
git remote -v

# origin  git@e.coding.net:mrathena/code.study/python.apex.weapon.auto.recognize.and.suppress.git (fetch)
# origin  git@e.coding.net:mrathena/code.study/python.apex.weapon.auto.recognize.and.suppress.git (push)
```
 

再绑定另外一个远程仓库, 该仓库只推不拉

```shell
git remote set-url --add origin git@github.com:mrathena/python.apex.weapon.auto.recognize.and.suppress.git
git remote -v
 
# origin  git@e.coding.net:mrathena/code.study/python.apex.weapon.auto.recognize.and.suppress.git (fetch)
# origin  git@e.coding.net:mrathena/code.study/python.apex.weapon.auto.recognize.and.suppress.git (push)
# origin  git@github.com:mrathena/python.apex.weapon.auto.recognize.and.suppress.git (push)
```

这时候执行推送, 大概率只能成功推到第一个仓库, 后绑定的仓库会拒绝, 要求先获取一次

可以执行 git push -f 强制推送一次, 后续 git push 就正常了