# Tracking Multi-Objects

## 最优配对问题

## 匈牙利算法（Hungarian Algorithm）

匈牙利算法是一种在多项式时间内求解任务分配问题的组合优化算法

### 算法流程

生动的解释👉[趣写算法系列之--匈牙利算法](https://blog.csdn.net/dark_scope/article/details/8880547#commentBox)

应用于多目标检测👉[带你入门多目标跟踪](https://zhuanlan.zhihu.com/p/62981901)

匈牙利算法对粗糙匹配的准确率要求很高，也就是要求我们运动模型、外观模型等部件必须进行较为精准的预测，或者预设较高的阈值，只将置信度较高的边才送入匈牙利算法进行匹配，这样才能得到较好的结果。

匈牙利算法的流程大家看到了，有一个很明显的问题相信大家也发现了，按这个思路找到的最大匹配往往不是我们心中的最优。匈牙利算法将每个匹配对象的地位视为相同，在这个前提下求解最大匹配。这个和我们研究的多目标跟踪问题有些不合，因为每个匹配对象不可能是同等地位的，总有一个真实目标是我们要找的最佳匹配，而这个真实目标应该拥有更高的权重，在此基础上匹配的结果才能更贴近真实情况。

## KM算法（Kuhn-Munkres Algorithm）

KM算法解决的是**带权二分图的最优匹配**问题。





