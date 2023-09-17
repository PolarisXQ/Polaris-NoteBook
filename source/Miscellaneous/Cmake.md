# How to ues Cmake

## Ninja

- 使用 Ninja 进行 CMake 构建的优点包括：

    1. 构建速度快：Ninja 采用了一些优化策略，相比其他构建系统，构建速度更快。

    2. 易于使用：Ninja 的使用非常简单，只需要在执行 `cmake` 命令时加上 `-GNinja` 参数即可。

    3. 跨平台支持：Ninja 支持多种不同平台，可以在不同的操作系统上使用。

    4. 可读性好：Ninja 的构建文件非常易于阅读和理解，可以方便地进行调试和修改。

- 使用 Ninja 进行 CMake 构建的缺点包括：

    1. 不支持所有的 CMake 功能：Ninja 并不支持所有的 CMake 功能，可能会导致一些构建问题。

    2. 在 Windows 平台上支持不完美：Ninja 并不支持 Visual Studio 的所有功能，在 Windows 平台上可能会导致一些构建问题。

    3. 社区支持不够：相比其他构建系统，Ninja 的社区支持和插件生态系统相对较少。

