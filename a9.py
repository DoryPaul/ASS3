import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

data = pd.read_csv('processed.cleveland.data', sep = ",", header = None)
data.columns = ['age', 'sex', 'chest pain type', 'resting blood presure', 'serum cholestoral in mg',
                'fasting blood sugar', 'resting electrocariographic results', 'maximum heart rate',
                'angina', 'oldpek', 'slope', 'major vessels', 'thal', 'target']
data_A9 = data.filter(['age', 'sex' ,'angina'], axis = 1)
bars = ['< 30', '30-34', '35-39','40-44','45-49','50-54','55-59','60-64','65-69', '70-74', '> 74']
bar_width = 3.0
x = [i*10 for i in range(len(bars))]
x1 = [i*10 + bar_width for i in range(len(bars))]
x2 = [i*10 + bar_width/2 for i in range(len(bars))]
male = []
female = []
for i in range(2):
    male_sub = []
    female_sub = []
    for j in range(len(bars)):
        male_sub.append(len(data_A9[(data_A9['age'] < (30 + 5 * j)) & (data_A9['age'] >= (25 + 5 * j)) & (data_A9['sex'] == 1) & (data_A9['angina'] == i)]))
        female_sub.append(len(data_A9[(data_A9['age'] < (30 + 5 * j)) & (data_A9['age'] >= (25 + 5 * j)) & (data_A9['sex'] == 0) & (data_A9['angina'] == i)]))
    male.append(male_sub)
    female.append(female_sub)
for i in range(len(bars)):
    male_sub_total = male[0][i] + male[1][i]
    if male_sub_total != 0:
        male[0][i] = male[0][i] / male_sub_total
        male[1][i] = male[1][i] / male_sub_total
    else:
        male[0][i] = 0
        male[1][i] = 0
    
    female_sub_total = female[0][i] + female[1][i]
    if female_sub_total != 0:
        female[0][i] = female[0][i] / female_sub_total
        female[1][i] = female[1][i] / female_sub_total
    else:
        female[0][i] = 0
        female[1][i] = 0
plt.bar(x, male[0], width = bar_width, label = 'male angina', color = 'r', zorder = 2)
plt.bar(x1, female[0], width = bar_width, label = 'female angina', color = 'r', zorder = 2)
plt.bar(x, male[1], bottom = male[0], width = bar_width, label = 'male 1', color = 'b', zorder = 2)
plt.bar(x1, female[1], bottom = female[0], width = bar_width, label = 'female 1', color = 'b', zorder = 2)
plt.title('Left is Male & Right is Female',fontsize = 9, horizontalalignment = 'center')
plt.suptitle('Exercise Induced Angina', fontsize=16, horizontalalignment = 'center')
plt.xlabel('Age Group')
plt.ylabel('Percentage')
plt.xticks(x2, bars)
red_label = mpatches.Patch(color = 'r', label = 'Exercise Induced Angina Yes')
blue_label = mpatches.Patch(color = 'b', label = 'Exercise Induced Angina No')
plt.legend(handles=[red_label, blue_label], loc = 'upper center', bbox_to_anchor=(0.5, -0.2))
plt.grid(axis = 'y')
plt.savefig("A9", bbox_inches = 'tight')
