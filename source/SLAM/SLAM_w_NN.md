# SLAM with Nerual Network

## Overview

| Algorithm | Time | Nerual Network | Details |
| -------- | -------- | -------- | -------- |
| SG-SLAM |  | ncnn+mobilenetv3_lite(backbone) | |
| kimera-semantic |  | Row 2, Column 3 ||

## implementation tools
![](./pic/impltol.webp)
腾讯公司开发的移动端平台部署工具——NCNN；Intel公司针对自家设备开开发的部署工具——OpenVino；NVIDIA公司针对自家GPU开发的部署工具——TensorRT；Google针对自家硬件设备和深度学习框架开发的部署工具——MediaPipe；由微软、亚马逊 、Facebook 和 IBM 等公司共同开发的开放神经网络交换格式——ONNX(Open Neural Network Exchange)。除此之外，还有一些深度学习框架有自己的专用部署服务：比如TensorFlow自己提供的部署服务：TensorFlow Serving、TensorFlow Lite，pytorch自己提供的部署服务：libtorch。

👉[深度学习模型部署综述（ONNX/NCNN/OpenVINO/TensorRT）](https://mp.weixin.qq.com/s?__biz=MzU2NjU3OTc5NA==&mid=2247560125&idx=2&sn=001988bca941a9404ac8fe7a351b514d&chksm=fca9ec80cbde659689922250b3138e752cfccf50fde18f07016b7673bf1289bb8bd25bb4f636&scene=27)


## Semantic Segmentation 

### Yolact
YOLACT，一个实时的检测+分割的one-stage框架。
将分割分为Prototype mask和Mask Coefficients两个部分的组合的思想非常好。
实际使用感觉，相比mask rcnn，yolact的漏检，误检，泄露问题都明显多一些。可以在精度要求不高，速度要求高的场合考虑使用。

### MIT-SemSeg

### Yolo-Seg
👉 [作者对YoloSeg的说明](https://github.com/ultralytics/yolov5/issues/10049)
👉 [For More Details about Yolo](../CV/Yolo.md)

### Mask-rcnn

## SG-SLAM

## kimera-semantic