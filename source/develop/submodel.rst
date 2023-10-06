关联仓库的管理
########################

使用GIT
************************
涉及内部仓库之间的引用采用 submodule 进行版本管理

将引用项目作为submodule添加到主项目中：

.. code-block:: bash

    # 添加submodule
    git submodule add <远程引用模块仓库地址>


子项目版本管理和主项目版本管理是分发的，主项目中的子项目更新需要手动操作：

.. code-block:: bash

    # 更新子模块
    git submodule update --init

使用VCS
************************

需要在仓库中加入deps.repos文件

.. code-block:: yaml

    repositories:
    rmoss_interfaces:
        type: git
        url: https://github.com/robomaster-oss/rmoss_interfaces.git
        version: humble
    rmoss_core:
        type: git
        url: https://github.com/robomaster-oss/rmoss_core.git
        version: humble
    rmoss_mindvision_driver:
        type: git
        url: https://github.com/robomaster-oss/rmoss_mindvision_driver.git
        version: humble


使用vcs工具进行仓库管理

.. code-block:: bash

    vcs import --recursive < rm_hardware_driver/deps.repos # clone依赖仓库


使用packages.xml(ROS)
************************



