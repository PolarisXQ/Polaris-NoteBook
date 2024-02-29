# Migrate from OpenCV3 to CV4

## CV_color-convertion
```c++
#include <opencv2/opencv.hpp>
#include <opencv2/imgproc/types_c.h>

#include <opencv2/opencv.hpp>
#include <opencv2/imgproc/types_c.h>
```


## No such file or directory #include <opencv/cv.h>

```cpp
#include <opencv2/imgproc.hpp>
```

## CV_LOAD_IMAGE_UNCHANGED

1. Rename to IMREAD_UNCHANGED

OR 

2. Keep use CV_LOAD_IMAGE_UNCHANGED,but add this header file:

```cpp
#include "opencv2/imgcodecs/legacy/constants_c.h" 
```

## CV_FILLED

CV_FILLED -> cv::FILLED

## CODEC_FLAG_GLOBAL_HEADER

CODEC_FLAG_GLOBAL_HEADER -> AV_CODEC_FLAG_GLOBAL_HEADER

## error: 'AVFMT_RAWPICTURE' was not declared in this scope

add this into cap_ffmpeg_impl.hpp

```cpp
#define AV_CODEC_FLAG_GLOBAL_HEADER (1 << 22)
#define CODEC_FLAG_GLOBAL_HEADER AV_CODEC_FLAG_GLOBAL_HEADER
#define AVFMT_RAWPICTURE 0x0020
```


## check opencv version

```bash
pkg-config --modversion opencv
```

<opencv/cv.h>==> <opencv2/imgproc.hpp>