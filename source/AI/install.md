# GPU Env Setup

## Concept

### nvidia-smi和nvcc

**nvidia-smi 显示的 CUDA 版本：**nvidia-smi 显示的 CUDA 版本是与当前 GPU 驱动（driver）程序兼容的 CUDA 运行时版本。这是驱动程序支持的最高 CUDA 版本，但并不意味着系统上安装的 CUDA 工具包版本。
nvcc 显示的 CUDA 版本：nvcc --version 显示的是你实际安装的 CUDA 工具包（Toolkit）的版本。这是你用来编译 CUDA 应用程序的版本。

通常情况下，nvcc`显示的版本应该匹配或低于`nvidia-smi`显示的版本。原因是，nvcc 显示的是你在开发中使用的 CUDA 工具包版本，而 nvidia-smi 则是驱动程序支持的版本。因此，如果你更新了驱动程序但没有更新 CUDA 工具包，可能会出现 nvidia-smi显示的版本比 nvcc 高的情况

### CUDA Driver

是一个底层的接口，直接与 GPU 硬件进行交互。它提供了对 GPU 设备的基本管理功能，包括设备初始化、内存管理、执行控制等。

通常由 NVIDIA 提供，并且随着显卡驱动程序一起安装。它具有较高的灵活性和对硬件的直接控制能力。

可以在没有安装完整的 CUDA Toolkit 的情况下单独使用，适用于需要直接访问 GPU 硬件的专业应用场景。

### CUDA Runtime

是一个高层的接口，建立在 CUDA Driver 之上。它提供了更方便的编程模型和函数库，使得开发者可以更轻松地编写 CUDA 程序。
是 CUDA Toolkit 的一部分，包含了许多常用的函数和库，如数学库、并行算法库等。它简化了 CUDA 编程的复杂性，提高了开发效率。

## Install

### Install CUDA

1. 下载 CUDA Toolkit

查看电脑自带的Cuda版本

```bash
nvidia-smi
```

下载相应版本Cuda安装包

下载Cuda版本是可以像下兼容，例如我的电脑版本是10.2，那么我可以下载10.1版本的Cuda，但不能下载11.0版本的Cuda。

https://developer.nvidia.com/cuda-toolkit-archive

按照提示安装即可

配置环境变量

检验Cuda是否安装成功

```bash
nvcc --version
```

### Install cuDNN

下载 cuDNN

点击如下网页，挑选与Cuda版本相匹配的Cudnn

[cuDNN Archive | NVIDIA Developer](https://developer.nvidia.com/rdp/cudnn-archive)

下载完成后，会得到一个安装包，解压后将里面的三个文件夹bin、include、lib复制，粘贴至Cuda的安装路径替换如下三个文件夹

检验Cudnn是否安装成功

```bash
cd C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v10.2\extras\demo_suite
.\deviceQuery.exe
```

### Install MiniConda

### Install PyTorch in Virtual Environment

https://pytorch.org/get-started/previous-versions/

### 查看显卡支持算力

```bash
cd C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v10.2\extras\demo_suite
.\deviceQuery.exe

# C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8\extras\demo_suite\deviceQuery.exe Starting...

#  CUDA Device Query (Runtime API) version (CUDART static linking)

# Detected 1 CUDA Capable device(s)

# Device 0: "NVIDIA GeForce RTX 2050"
#   CUDA Driver Version / Runtime Version          12.2 / 11.8
#   CUDA Capability Major/Minor version number:    8.6
#   Total amount of global memory:                 4096 MBytes (4294508544 bytes)
#   (16) Multiprocessors, (128) CUDA Cores/MP:     2048 CUDA Cores
#   GPU Max Clock rate:                            1245 MHz (1.25 GHz)
#   Memory Clock rate:                             7001 Mhz
#   Memory Bus Width:                              64-bit
#   L2 Cache Size:                                 1048576 bytes
#   Maximum Texture Dimension Size (x,y,z)         1D=(131072), 2D=(131072, 65536), 3D=(16384, 16384, 16384)
#   Maximum Layered 1D Texture Size, (num) layers  1D=(32768), 2048 layers
#   Maximum Layered 2D Texture Size, (num) layers  2D=(32768, 32768), 2048 layers
#   Total amount of constant memory:               zu bytes
#   Total amount of shared memory per block:       zu bytes
#   Total number of registers available per block: 65536
#   Warp size:                                     32
#   Maximum number of threads per multiprocessor:  1536
#   Maximum number of threads per block:           1024
#   Max dimension size of a thread block (x,y,z): (1024, 1024, 64)
#   Max dimension size of a grid size    (x,y,z): (2147483647, 65535, 65535)
#   Maximum memory pitch:                          zu bytes
#   Texture alignment:                             zu bytes
#   Concurrent copy and kernel execution:          Yes with 1 copy engine(s)
#   Run time limit on kernels:                     Yes
#   Integrated GPU sharing Host Memory:            No
#   Support host page-locked memory mapping:       Yes
#   Alignment requirement for Surfaces:            Yes
#   Device has ECC support:                        Disabled
#   CUDA Device Driver Mode (TCC or WDDM):         WDDM (Windows Display Driver Model)
#   Device supports Unified Addressing (UVA):      Yes
#   Device supports Compute Preemption:            Yes
#   Supports Cooperative Kernel Launch:            Yes
#   Supports MultiDevice Co-op Kernel Launch:      No
#   Device PCI Domain ID / Bus ID / location ID:   0 / 1 / 0
#   Compute Mode:
#      < Default (multiple host threads can use ::cudaSetDevice() with device simultaneously) >      

# deviceQuery, CUDA Driver = CUDART, CUDA Driver Version = 12.2, CUDA Runtime Version = 11.8, NumDevs = 1, Device0 = NVIDIA GeForce RTX 2050
# Result = PASS
```

可以看到是8.6算力
```
CUDA Capability Major/Minor version number:    8.6
```

### 查看pytorch版本&支持的cuda算力

```python
import torch
torch.cuda.get_arch_list()
# [‘sm_37’, ‘sm_50’, ‘sm_60’, ‘sm_70’]
```

## Uninstall 

To remove CUDA Toolkit:

$ sudo apt-get --purge remove "*cublas*" "cuda*"

To remove NVIDIA Drivers:

$ sudo apt-get --purge remove "*nvidia*"
