import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
data = pd.read_csv('processed.cleveland.data', sep = ",", header = None)
data.columns = ['age', 'sex', 'chest pain type', 'resting blood presure', 'serum cholestoral in mg',
                'fasting blood sugar', 'resting electrocariographic results', 'maximum heart rate',
                'angian', 'oldpek', 'slope', 'major vessels', 'thal', 'target']
data_A7 = data.filter(['age', 'sex' ,'resting electrocariographic results'], axis = 1)
bars = ['< 30', '30-34', '35-39','40-44','45-49','50-54','55-59','60-64','65-69', '70-74', '> 74']
bar_width = 3.0
x = [i*10 for i in range(len(bars))]
x1 = [i*10 + bar_width for i in range(len(bars))]
x2 = [i*10 + bar_width/2 for i in range(len(bars))]
male = []
female = []
for i in range(3):
    male_sub = []
    female_sub = []
    for j in range(len(bars)):
        male_sub.append(len(data_A7[(data_A7['age'] < (30 + 5 * j)) & (data_A7['age'] >= (25 + 5 * j)) & (data_A7['sex'] == 1) & (data_A7['resting electrocariographic results'] == i)]))
        female_sub.append(len(data_A7[(data_A7['age'] < (30 + 5 * j)) & (data_A7['age'] >= (25 + 5 * j)) & (data_A7['sex'] == 0) & (data_A7['resting electrocariographic results'] == i)]))
    male.append(male_sub)
    female.append(female_sub)
plt.bar(x, male[0], width = bar_width, label = 'male 0', color = 'r', zorder = 2)
plt.bar(x1, female[0], width = bar_width, label = 'female 0', color = 'r', zorder = 2)
plt.bar(x, male[1], bottom = male[0], width = bar_width, label = 'male 1', color = 'b', zorder = 2)
plt.bar(x1, female[1], bottom = female[0], width = bar_width, label = 'female 1', color = 'b', zorder = 2)
plt.bar(x, male[2], bottom = [i+j for i,j in zip(male[0],male[1])], width = bar_width, label = 'male 2', color = 'y', zorder = 2)
plt.bar(x1, female[2], bottom = [i+j for i,j in zip(female[0],female[1])], width = bar_width, label = 'female 2', color = 'y', zorder = 2)
plt.title('Left is Male & Right is Female',fontsize = 9, horizontalalignment = 'center')
plt.suptitle('Resting Electrocariographic Results', fontsize=16, horizontalalignment = 'center')
plt.xlabel('Age Group')
plt.ylabel('Value Count')
plt.xticks(x2, bars)
red_label = mpatches.Patch(color = 'r', label = 'Normal')
blue_label = mpatches.Patch(color = 'b', label = 'ST-T wave abnormality')
yellow_label = mpatches.Patch(color = 'y', label = 'Left ventricular hypertrophy')
plt.legend(handles=[red_label, blue_label, yellow_label],loc = 'upper center', bbox_to_anchor=(0.5, -0.2))
plt.grid(axis = 'y')
plt.savefig("A7", bbox_inches = 'tight')

