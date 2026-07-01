# Step by Step in detail: Launch the Development Workspace

首先~确保必要的软件已经安装好了，包括Docker，VSCode，Xming等等。具体参阅[📑准备工作](../Docker/CustomImage.md#准备工作)

不使用DevContainer的话
----------------------------------------------
可以直接运行镜像，然后attach到VSCode中，具体的命令可以参考[📑Some Useful Command for Docker](../Docker/UsefulCommand.md)

大致就是

.. code-block:: bash

    docker run -v [local_workspace]:[container_workspace] -e DISPLAY=host.docker.internal:0.0 -dit [image_name]

然后在VSCode的Docker插件中attach到这个容器中，就可以在容器中进行开发了。

如果使用DevContainer的话
----------------------------------------------
如果他人已经配置好了DevContainer，那么你只需要把他的repo clone下来，请阅读下面的1，2，3，4
如果没有，那么你需要自己配置DevContainer，步骤是1，2，5*，3，4

## 1. Pull the image.

For Tencent Coding.项目-> 制品管理：制品仓库->拉取

## 2. Clone the repo.

## 3. config devcontainer.json

modify at least these item:
```json
"image":"rm_sentry:test2", // to the name of the image you just pulled
```

and notice that this will mount your local workspace folder into the container, they are binded, i.e. if you change the file in the container, it will change the file in your local workspace folder, and vice versa.

```json
"workspaceFolder": "/home/sentry_ws", // workdir in container
"workspaceMount": "source=${localWorkspaceFolder},target=${containerWorkspaceFolder}/src,type=bind", //mount your local file into container, ${containerWorkspaceFolder}=="workspaceFolder"
```

## 4. Open the folder in DevContainer

- Click the green button in the bottom left corner of VSCode(remenber to install the extension)

- Click "Reopen in Container" and wait for the container to be built.

- Start your development! Enjoy it!

## 5. 编写配置文件

- Create a folder called .devcontainer in the repo, and create a file called devcontainer.json in it

    now you have a folder structure like this

    ```bash
    your_repo
    ├── .devcontainer
    │   └── devcontainer.json
    ├── README.md
    ├── package1
    ├── package2
    ...

- Write your own devcontainer.json

    This json file defines how your container will be built and run.

    ```json
    {
        "name": "sentry_dev",
        "image":"rm_sentry:test2",
        "runArgs": [
            // "--cap-add=SYS_PTRACE", // enable debugging, e.g. gdb

            // "--ipc=host", // shared memory transport with host, e.g. rviz GUIs

            "--network=host", // network access to host interfaces, e.g. eth0

            // "--pid=host", // DDS discovery with host, without --network=host

            "--privileged", // device access to host peripherals, e.g. USB

            // "--security-opt=seccomp=unconfined", // enable debugging, e.g. gdb

            "--gpus all" 
        ],
        "workspaceFolder": "/home/sentry_ws", // workdir in container
        "workspaceMount": "source=${localWorkspaceFolder},target=${containerWorkspaceFolder}/src,type=bind", //mount your local file into container, ${containerWorkspaceFolder}=="workspaceFolder"

        // "onCreateCommand": ".devcontainer/on-create-command.sh",
        // "updateContentCommand": ".devcontainer/update-content-command.sh",
        // "postCreateCommand": ".devcontainer/post-create-command.sh",

        "remoteEnv": {
            "DISPLAY": "host.docker.internal:0.0", // forward X11 display to host, e.g. rviz GUIs
            // NOTICE that this is for windows, for mac, you should use "host.docker.internal:0"
            // NOTICE that XLaunch should be running on local machine
            "NVIDIA_DRIVER_CAPABILITIES":"all" // enable GPU acceleration
            //     "OVERLAY_MIXINS": "release ccache lld",
            //     "CCACHE_DIR": "/tmp/.ccache"
        },
        // "mounts": [
        //     {
        //         "source": "ccache-${devcontainerId}",
        //         "target": "/tmp/.ccache",
        //         "type": "volume"
        //     },
        //     {
        //         "source": "overlay-${devcontainerId}",
        //         "target": "/opt/overlay_ws",
        //         "type": "volume"
        //     }
        // ],
        // "features": {
        //     "ghcr.io/devcontainers/features/desktop-lite:1": {},
        //     "ghcr.io/devcontainers/features/github-cli:1": {},
        //     "ghcr.io/rocker-org/devcontainer-features/apt-packages:1": {
        // 		"upgradePackages": true,
        // 		"packages": ""
        // 	}
        // },
        "customizations": {
            // "codespaces": {
            //     "openFiles": [
            //         "doc/development/codespaces.md"
            //     ]
            // },
            "vscode": { // install extension in container
                "settings": {},
                "extensions": [
                    // gadget
                    "aaron-bond.better-comments",
                    "PKief.material-icon-theme",
                    // C++
                    "ms-vscode.cpptools",
                    "ms-vscode.cpptools-extension-pack",
                    "ms-vscode.cpptools-themes",
                    // python
                    "ms-python.vscode-pylance",
                    "ms-python.python",
                    // CMake
                    "twxs.cmake",
                    "ms-vscode.cmake-tools",
                    // Github Copilot
                    "GitHub.copilot",
                    "GitHub.copilot-chat",
                    "GitHub.copilot-labs",
                    // note
                    "VisualStudioExptTeam.vscodeintellicode",
                    "VisualStudioExptTeam.intellicode-api-usage-examples",
                    // XML
                    "DotJoshJohnson.xml",
                    // PCD viewer
                    "tatsy.vscode-3d-preview",
                    // nav2 default
                    // "althack.ament-task-provider",
                    // "eamodio.gitlens",
                    // "esbenp.prettier-vscode",
                    // "ms-iot.vscode-ros",
                    // "streetsidesoftware.code-spell-checker"

                ]
            }
        }
    }
    ```

    这里说明一下mount的功能，也就是挂载。上面的这条命令，就是把你本地的文件夹挂载到了container里面，这样你在container里面的操作，就会直接影响到你本地的文件夹，也就是说，你在container里面写的代码，就会直接保存到你本地的文件夹里面，这样就不用每次都把代码从container里面拷贝出来了。

    在本地改动也同样会影响到container里面的文件。建议是统一在一个地方做修改，免得冲突。


## Official Guides

- [https://code.visualstudio.com/docs/devcontainers/create-dev-container#_set-up-a-folder-to-run-in-a-container](https://code.visualstudio.com/docs/devcontainers/create-dev-container#_set-up-a-folder-to-run-in-a-container)

- [https://containers.dev/guides](https://containers.dev/guides)
