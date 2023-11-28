import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
# 设置中文字体，fname是我的电脑中的字体的路径
font = FontProperties(fname='C:\Windows\Fonts\simfang.ttf', size=10)

# Your data
y_values = [4.95,
15.25,
25.55,
35.85,
46.15,
56.45,
66.75,
77.05,
87.35,
97.65,
108.45]
x_values= [0.0,
0.12,
0.31,
0.47,
0.65,
0.86,
1.12,
1.47,
1.96,
2.85,
7.5]
# Create a figure and a set of subplots
fig, ax = plt.subplots()

# Plot y_values
ax.plot(x_values,y_values,marker='o',color='grey')

# Set labels
ax.set(xlabel='$U_{ct}$/V', ylabel='$U_d$',
       title='输入-输出特性')
# Show grid
ax.grid(True)
# Display the figure
plt.show()