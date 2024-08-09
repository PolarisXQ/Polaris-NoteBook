# ML 中的常用指标

## 1. 分类问题

### 1.1 准确率（Accuracy）

准确率是分类问题中最常用的指标之一，它表示分类正确的样本数占总样本数的比例。

$$
\text{Accuracy} = \frac{\text{TP} + \text{TN}}{\text{TP} + \text{TN} + \text{FP} + \text{FN}}
$$


### 1.2 精确率（Precision）

精确率是指分类器预测为正类别的样本中，真正为正类别的样本数占总预测为正类别的样本数的比例。

$$
\text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}}
$$

### 1.3 召回率（Recall）

召回率是指分类器预测为正类别的样本中，真正为正类别的样本数占总真正为正类别的样本数的比例。

$$
\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}}
$$

### 1.4 F1 Score

F1 Score 是精确率和召回率的调和平均数。

$$
\text{F1 Score} = \frac{2 \times \text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}
$$

### 1.5 ROC 曲线

ROC 曲线是以假正例率（FPR）为横轴，真正例率（TPR）为纵轴的曲线。ROC 曲线下的面积（AUC）越大，分类器的性能越好。

### 1.6 PR 曲线

PR 曲线是以召回率为横轴，精确率为纵轴的曲线。PR 曲线下的面积（AUC）越大，分类器的性能越好。

## 2. 回归问题

### 2.1 均方误差（Mean Squared Error）

均方误差是回归问题中最常用的指标之一，它表示预测值与真实值之间的差值的平方和的均值。

$$
\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2
$$

### 2.2 平均绝对误差（Mean Absolute Error）

平均绝对误差是预测值与真实值之间的差值的绝对值的均值。

$$
\text{MAE} = \frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|
$$

### 2.3 R2 Score

R2 Score 是回归问题中最常用的指标之一，它表示预测值与真实值之间的差值的平方和与真实值之间的差值的平方和的比值。

$$
\text{R2 Score} = 1 - \frac{\sum_{i=1}^{n} (y_i - \hat{y}_i)^2}{\sum_{i=1}^{n} (y_i - \bar{y})^2}
$$

其中，$\bar{y}$ 表示真实值的均值。

## 3. 聚类问题

### 3.1 轮廓系数（Silhouette Coefficient）

轮廓系数是聚类问题中最常用的指标之一，它表示样本与其所属簇内的样本之间的距离与样本与其最近的其他簇内的样本之间的距离之差的比值。

$$
\text{Silhouette Coefficient} = \frac{b - a}{\max(a, b)}
$$

其中，$a$ 表示样本与其所属簇内的样本之间的平均距离，$b$ 表示样本与其最近的其他簇内的样本之间的平均距离。

### 3.2 Calinski-Harabasz Index

Calinski-Harabasz Index 是聚类问题中最常用的指标之一，它表示簇内的样本之间的距离与簇间的样本之间的距离之比。

$$
\text{Calinski-Harabasz Index} = \frac{b}{a}
$$

其中，$a$ 表示簇内的样本之间的平均距离，$b$ 表示簇间的样本之间的平均距离。

## 4. 降维问题

### 4.1 方差贡献率（Variance Contribution Rate）

方差贡献率是降维问题中最常用的指标之一，它表示每个主成分对总方差的贡献率。

$$
\text{Variance Contribution Rate} = \frac{\text{explained variance}}{\text{total variance}}
$$

其中，$\text{explained variance}$ 表示主成分对总方差的贡献，$\text{total variance}$ 表示总方差。

### 4.2 累积方差贡献率（Cumulative Variance Contribution Rate）

累积方差贡献率是降维问题中最常用的指标之一，它表示前 $n$ 个主成分对总方差的贡献率之和。

$$
\text{Cumulative Variance Contribution Rate} = \sum_{i=1}^{n} \text{Variance Contribution Rate}_i
$$

其中，$\text{Variance Contribution Rate}_i$ 表示第 $i$ 个主成分对总方差的贡献率。

## 5. 生成对抗网络

### 5.1 生成对抗网络（GAN）的损失函数

生成对抗网络（GAN）的损失函数由生成器（Generator）和判别器（Discriminator）的损失函数组成。

$$
\text{Loss}_{\text{GAN}} = \text{Loss}_{\text{Generator}} + \text{Loss}_{\text{Discriminator}}
$$

其中，$\text{Loss}_{\text{Generator}}$ 表示生成器的损失函数，$\text{Loss}_{\text{Discriminator}}$ 表示判别器的损失函数。

### 5.2 生成器（Generator）的损失函数

生成器（Generator）的损失函数由生成器的输出与真实样本之间的差值的损失函数组成。
