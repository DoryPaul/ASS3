import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

data = pd.read_csv('processed.cleveland.data', sep = ",", header = None)
data.columns = ['age', 'sex', 'chest pain type', 'resting blood presure', 'serum cholestoral in mg',
                'fasting blood sugar', 'resting electrocariographic results', 'maximum heart rate',
                'angina', 'oldpek', 'slope', 'major vessels', 'thal', 'target']
data_A11 = data.filter(['age', 'sex' ,'slope'], axis = 1)
bars = ['< 30', '30-34', '35-39','40-44','45-49','50-54','55-59','60-64','65-69', '70-74', '> 74']
bar_width = 3.0
x = [i*10 for i in range(len(bars))]
x1 = [i*10 + bar_width for i in range(len(bars))]
x2 = [i*10 + bar_width/2 for i in range(len(bars))]
male = []
female = []
for i in range(1,4):
    male_sub = []
    female_sub = []
    for j in range(len(bars)):
        male_sub.append(len(data_A11[(data_A11['age'] < (30 + 5 * j)) & (data_A11['age'] >= (25 + 5 * j)) & (data_A11['sex'] == 1) & (data_A11['slope'] == i)]))
        female_sub.append(len(data_A11[(data_A11['age'] < (30 + 5 * j)) & (data_A11['age'] >= (25 + 5 * j)) & (data_A11['sex'] == 0) & (data_A11['slope'] == i)]))
    male.append(male_sub)
    female.append(female_sub)
plt.bar(x, male[0], width = bar_width, label = 'male 1', color = 'r', zorder = 2)
plt.bar(x1, female[0], width = bar_width, label = 'female 1', color = 'r', zorder = 2)
plt.bar(x, male[1], bottom = male[0], width = bar_width, label = 'male 2', color = 'b', zorder = 2)
plt.bar(x1, female[1], bottom = female[0], width = bar_width, label = 'female 2', color = 'b', zorder = 2)
plt.bar(x, male[2], bottom = [i+j for i,j in zip(male[0],male[1])], width = bar_width, label = 'male 3', color = 'y', zorder = 2)
plt.bar(x1, female[2], bottom = [i+j for i,j in zip(female[0],female[1])], width = bar_width, label = 'female 3', color = 'y', zorder = 2)
plt.title('Left is Male & Right is Female',fontsize = 9, horizontalalignment = 'center')
plt.suptitle('Slope', fontsize=16, horizontalalignment = 'center')
plt.xlabel('Age Group')
plt.ylabel('Value Count')
plt.xticks(x2, bars)
red_label = mpatches.Patch(color = 'r', label = '1')
blue_label = mpatches.Patch(color = 'b', label = '2')
yellow_label = mpatches.Patch(color = 'y', label = '3')
plt.legend(handles=[red_label, blue_label, yellow_label])
plt.grid(axis = 'y')
plt.savefig("A11", bbox_inches = 'tight')