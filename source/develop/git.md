# GIT

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