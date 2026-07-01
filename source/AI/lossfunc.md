# Loss Function

## Introduction

In machine learning, the loss function is a method of evaluating how well your algorithm models your dataset. If your predictions are totally off, your loss function will output a higher number. If they’re pretty good, it’ll output a lower one. As you change pieces of your algorithm to try and improve your model, your loss function will tell you if you’re getting anywhere.

## Types of Loss Functions

### Mean Squared Error (MSE)

Mean Squared Error (MSE) is the most commonly used regression loss function. MSE is the sum of squared distances between our target variable and predicted values.

$$
MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2
$$

### Mean Absolute Error (MAE)

Mean Absolute Error (MAE) is another loss function used for regression models. MAE is the sum of absolute differences between our target variable and predicted values.

$$
MAE = \frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|
$$

### Cross-Entropy Loss

Cross-entropy loss, or log loss, measures the performance of a classification model whose output is a probability value between 0 and 1. Cross-entropy loss increases as the predicted probability diverges from the actual label.

$$
H(y, \hat{y}) = -\sum_{i} y_i \log(\hat{y}_i)
$$

### Hinge Loss

Hinge loss is used for training classifiers. The hinge loss is used for "maximum-margin" classification, most notably for support vector machines (SVMs).

$$

L(y) = \max(0, 1 - y \cdot \hat{y})

$$

### Huber Loss

Huber loss is less sensitive to outliers in data than the squared error loss. It’s a loss function used in robust regression, it is less sensitive to outliers in data than the squared error loss.

$$
L_{\delta}(y, \hat{y}) = \begin{cases}
\frac{1}{2}(y - \hat{y})^2 & \text{for } |y - \hat{y}| \leq \delta \\
\delta(|y - \hat{y}| - \frac{1}{2}\delta) & \text{otherwise}
\end{cases}
$$

### Kullback-Leibler Divergence

Kullback-Leibler Divergence is a measure of how one probability distribution diverges from a second, expected probability distribution.

$$
D_{KL}(P||Q) = \sum_{i} P(i) \log(\frac{P(i)}{Q(i)})
$$

### Negative Log Likelihood

Negative log likelihood is the loss function used in probabilistic classifiers. It is the negative log-likelihood of the true labels given the predicted probability.

$$
NLL = -\sum_{i} y_i \log(\hat{y}_i)
$$

### Poisson Loss

Poisson loss is used for regression tasks where the target variable is a count. It is the negative log-likelihood of the Poisson distribution.

$$
L(y, \hat{y}) = \hat{y} - y \log(\hat{y})
$$

### Triplet Loss

Triplet loss is a loss function for machine learning algorithms where a baseline (anchor) input is compared to a positive (truthy) input and a negative (falsy) input. The distance between the anchor and the positive is minimized, and the distance between the anchor and the negative is maximized.

$$
L(a, p, n) = \max(d(a, p) - d(a, n) + \alpha, 0)
$$

### Wasserstein Loss

Wasserstein loss is used in Wasserstein GANs. It is a measure of the distance between two probability distributions.

$$
W(P_r, P_g) = \max_{f \in 1-Lip} \mathbb{E}_{x \sim P_r}[f(x)] - \mathbb{E}_{x \sim P_g}[f(x)]
$$

### Relationship between Loss Functions

- **MSE vs MAE**: MSE is more useful when large errors are particularly undesirable, while MAE is more useful when the dataset contains a large number of outliers.

- **Cross-Entropy vs Hinge Loss**: Cross-entropy loss is used for probabilistic classifiers, while hinge loss is used for classifiers that separate data into classes.

- **Huber Loss vs MSE**: Huber loss is less sensitive to outliers in data than the squared error loss.

- **Cross-Entropy Loss vs Negative Log Likelihood**: [Pytorch详解NLLLoss和CrossEntropyLoss](https://blog.csdn.net/qq_22210253/article/details/85229988)

## Conclusion

Loss functions are a critical component of machine learning algorithms. They are used to evaluate how well your algorithm models your dataset. Different loss functions are used for different types of machine learning tasks, such as regression, classification, and generative adversarial networks.

### References

- [Loss Functions in Machine Learning](https://towardsdatascience.com/understanding-different-loss-functions-for-neural-networks-dd1ed0274718)

- [Loss Functions in Machine Learning](https://machinelearningmastery.com/how-to-choose-loss-functions-when-training-deep-learning-neural-networks/)
