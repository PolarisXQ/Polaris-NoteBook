import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
# 设置中文字体，fname是我的电脑中的字体的路径
font = FontProperties(fname='C:\Windows\Fonts\simfang.ttf', size=10)
timesnewroman = FontProperties(fname='C:\Windows\Fonts\\times.ttf', size=10)
# Your data

# 实验五 改变电枢端电压的调速
# x = [220.0,188.0,180.4,160.0,139.5,119.4,110.1]
# y = [1600,1365,1278,1124,978,829,761]

# 实验五 改变励磁电流的调速
x = [0.564,0.486,0.433,0.390,0.366,0.329]
y = [1600,1650,1700,1750,1800,1850]

# 实验一电动运行
x1 = [0.50,0.62,0.70,0.81,0.90,1.01]
y1 = [1280,1258,1240,1200,1172,1147]

# 实验一转速反接
x2 = [0.40,0.42,0.45,0.48,0.50,0.52]
y2 = [0,-90,-200,-292,-407,-524]

# 实验一能耗制动发电
x3 = [0.15,0.19,0.22,0.25,0.27]
y3 = [-513,-705,-807,-906,-978]

# Create a figure and a set of subplots
fig, ax = plt.subplots(dpi=100)

# Plot x - y 
ax.plot(x, y,marker='o',label='实测数据')
# Set the title for the figure
ax.set_title('$n=f(I_{f})$函数曲线', fontproperties=font,)
# Show grid lines
ax.grid(True)
# show xy axis
# ax.axhline(y=0, color='k',linewidth=1)
# ax.axvline(x=0, color='k',linewidth=1)
# # Set the labels for the x and y axes
ax.set_xlabel('$I_{f}/A$', fontproperties=font,)
ax.set_ylabel('$n/rpm$', fontproperties=font,)

# 拟合直线
import numpy as np

select_x=x
select_y=y
z1 = np.polyfit(select_x, select_y, 1) # 用1次多项式拟合,2次多项式拟合需要改为2
p1 = np.poly1d(z1) # 生成多项式对象
print(z1)
print(p1)
 # 误差值
print(np.std(select_y-p1(select_x)))

# 画图
# 生成x轴数据
x_fit = np.arange(np.min(select_x),np.max(select_x), 0.001)
# 生成y轴数据
y_fit = p1(x_fit)
# 画图
ax.plot(x_fit, y_fit, 'r--', label='拟合曲线', linewidth=2)
ax.legend(loc='upper left', prop=font)
plt.show()

# for [x,y,desc,min,max] in ([x1,y1,"电动运行",-0.6,0.65],[x2,y2,"转速反接制动",0,0.65],[x3,y3,"能耗制动",-0.6,0.65]):
#     select_x=x
#     select_y=y
#     z1 = np.polyfit(select_x, select_y, 1) # 用1次多项式拟合,2次多项式拟合需要改为2
#     p1 = np.poly1d(z1) # 生成多项式对象
#     print(z1)
#     print(p1)
#     # 误差值
#     print(np.std(select_y-p1(select_x)))

#     # 画图
#     # 生成x轴数据
#     x_fit = np.arange(min,max,0.05)
#     # 生成y轴数据
#     y_fit = p1(x_fit)
#     # 画图
#     ax.plot(x_fit, y_fit,linewidth=2, label=desc)
# ax.legend(loc='upper left', prop=font)
# plt.show()

# z1=[-3800,1424]
# z2=[-2037.35,1424]
# z3=[-3800,0]
# z4=[-2037.35,0]
# n1=709
# n2=803
# points=[]
# for [z,desc,min,max] in ([z1,"电动运行$R_\Omega=R_{Amax}$",-0.2,0.5],[z3,"能耗制动$R_\Omega=R_{Amax}$",-0.3,0.05]):
#     p1 = np.poly1d(z) # 生成多项式对象
#     # 画图
#     # 生成x轴数据
#     x_fit = np.arange(min,max,0.05)
#     # 生成y轴数据
#     y_fit = p1(x_fit)
#     # 画图
#     ax.plot(x_fit, y_fit,linewidth=2, label=desc)
#     pointy=n1
#     pointx=(pointy-z[1])/z[0]
#     points.append([pointx,pointy])
    

# for [z,desc,min,max] in ([z2,"电动运行$R_\Omega=R_{Amax}/2$",-0.3,0.5],[z4,"能耗制动$R_\Omega=R_{Amax}/2$",-0.54,0.05]):
#     p1 = np.poly1d(z) # 生成多项式对象
#     # 画图
#     # 生成x轴数据
#     x_fit = np.arange(min,max,0.05)
#     # 生成y轴数据
#     y_fit = p1(x_fit)
#     # 画图
#     ax.plot(x_fit, y_fit,linewidth=2, label=desc)
#     pointy=n2
#     pointx=(pointy-z[1])/z[0]
#     points.append([pointx,pointy])

# # draw 2 lines, connecting points12 and points34
# print(points)
# points12=points[0:2]
# points34=points[2:4]
# ax.plot([points12[0][0],points12[1][0]],[points12[0][1],points12[1][1]],'o--',linewidth=2,)
# ax.plot([points34[0][0],points34[1][0]],[points34[0][1],points34[1][1]],'o--',linewidth=2)

# # show data aside points
# ax.text(points12[0][0],points12[0][1]+20,'(%.3f,%.3f)'%(points12[0][0],points12[0][1]),fontproperties=timesnewroman)
# ax.text(points12[1][0],points12[1][1]+20,'(%.3f,%.3f)'%(points12[1][0],points12[1][1]),fontproperties=timesnewroman)
# ax.text(points34[0][0],points34[0][1]+20,'(%.3f,%.3f)'%(points34[0][0],points34[0][1]),fontproperties=timesnewroman)
# ax.text(points34[1][0],points34[1][1]+20,'(%.3f,%.3f)'%(points34[1][0],points34[1][1]),fontproperties=timesnewroman)
    
ax.legend(loc='upper left', prop=font)
plt.show()