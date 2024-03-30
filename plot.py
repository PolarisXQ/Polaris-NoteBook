# 国家    人均 GDP(美元)  生活满意度
# 匈牙利  12 240  4.9
# 韩国    27 195  5.8
# 法国    37 675  6.5
# 澳大利亚    50 962  7.3
# 美国    55 805  7.2

# 绘制数据散点图
import matplotlib.pyplot as plt

# 数据
countries = ['Hungary', 'Korea', 'France', 'Australia', 'USA']
gdp_per_capita = [12240, 27195, 37675, 50962, 55805]
life_satisfaction = [4.9, 5.8, 6.5, 7.3, 7.2]

# 绘制散点图
plt.scatter(gdp_per_capita, life_satisfaction)

# 添加国家标签
for i in range(len(countries)):
    plt.annotate(countries[i], (gdp_per_capita[i], life_satisfaction[i]))

# 添加坐标轴标签
plt.xlabel('GDP per capita')
plt.ylabel('Life satisfaction')

# 显示图形
plt.show()

import numpy as np
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1)

plt.scatter(X, y)
plt.xlabel('X')
plt.ylabel('y')
plt.show()

X_b = np.c_[np.ones((100, 1)), X] # add x0 = 1 to each instance
theta_best = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y)

print(theta_best)


X_new = np.array([[0], [2]])
X_new_b = np.c_[np.ones((2, 1)), X_new] # add x0 = 1 to each instance
y_predict = X_new_b.dot(theta_best)
print(y_predict)

plt.plot(X_new, y_predict, "r-")
plt.plot(X, y, "b.")
plt.axis([0,2,0,15])
plt.show()

import sklearn
from sklearn.linear_model import LinearRegression
lin_reg = LinearRegression()
lin_reg.fit(X, y)
print(lin_reg.intercept_, lin_reg.coef_)
print(lin_reg.predict(X_new))

import numpy as np
theta_best_svd, residuals, rank, s = np.linalg.lstsq(X_b, y, rcond=1e-6)
print(theta_best_svd)

print(np.linalg.pinv(X_b).dot(y))


# 这个Python脚本使用matplotlib和sklearn对一个数据集进行简单的线性回归。数据集代表了五个国家（匈牙利、韩国、法国、澳大利亚和美国）的人均GDP和生活满意度。

# 描述
# 该脚本首先绘制了五个国家的人均GDP与生活满意度的散点图。然后，它生成一个随机数据集，并使用正规方程和sklearn的LinearRegression对其进行线性回归。脚本还计算了数据集的伪逆。

# 使用的库
# matplotlib：用于绘制数据和回归线。
# numpy：用于数值计算。
# sklearn：用于进行线性回归。