import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
data = pd.read_csv('processed.cleveland.data', sep = ",", header = None)
data.columns = ['age', 'sex', 'chest pain type', 'resting blood presure', 'serum cholestoral in mg',
                'fasting blood sugar', 'resting electrocariographic results', 'maximum heart rate',
                'angian', 'oldpek', 'slope', 'major vessels', 'thal', 'target']




data_A3 = data.filter(['age', 'sex' ,'chest pain type'], axis = 1)
bars = ['< 30', '30-34', '35-39','40-44','45-49','50-54','55-59','60-64','65-69', '70-74', '> 74']
bar_width = 3.0
x = [i*10 for i in range(len(bars))]
x1 = [i*10 + bar_width for i in range(len(bars))]
x2 = [i*10 + bar_width/2 for i in range(len(bars))]
male = []
female = []
for i in range(1,5):
    male_sub = []
    female_sub = []
    for j in range(len(bars)):
        male_sub.append(len(data_A3[(data_A3['age'] < (30 + 5 * j)) & (data_A3['age'] >= (25 + 5 * j)) & (data_A3['sex'] == 1) & (data_A3['chest pain type'] == i)]))
        female_sub.append(len(data_A3[(data_A3['age'] < (30 + 5 * j)) & (data_A3['age'] >= (25 + 5 * j)) & (data_A3['sex'] == 0) & (data_A3['chest pain type'] == i)]))
    male.append(male_sub)
    female.append(female_sub)
plt.bar(x, male[0], width = bar_width, label = 'male 0', color = 'r', zorder = 2)
plt.bar(x1, female[0], width = bar_width, label = 'female 0', color = 'r', zorder = 2)
plt.bar(x, male[1], bottom = male[0], width = bar_width, label = 'male 1', color = 'b', zorder = 2)
plt.bar(x1, female[1], bottom = female[0], width = bar_width, label = 'female 1', color = 'b', zorder = 2)
plt.bar(x, male[2], bottom = [i+j for i,j in zip(male[0],male[1])], width = bar_width, label = 'male 2', color = 'y', zorder = 2)
plt.bar(x1, female[2], bottom = [i+j for i,j in zip(female[0],female[1])], width = bar_width, label = 'female 2', color = 'y', zorder = 2)
plt.bar(x, male[3], bottom = [i+j+k for i,j,k in zip(male[0],male[1],male[2])], width = bar_width, label = 'male 3', color = 'g', zorder = 2)
plt.bar(x1, female[3], bottom = [i+j+k for i,j,k in zip(female[0],female[1],female[2])], width = bar_width, label = 'female 3', color = 'g', zorder = 2)
plt.title('Left is Male & Right is Female',fontsize = 9, horizontalalignment = 'center')
plt.suptitle('Chest Pain Type', fontsize=16, horizontalalignment = 'center')
plt.xlabel('Age Group')
plt.ylabel('Value Count')
plt.xticks(x2, bars)
red_label = mpatches.Patch(color = 'r', label = 'typical angin')
blue_label = mpatches.Patch(color = 'b', label = 'atypical angina')
yellow_label = mpatches.Patch(color = 'y', label = 'non-anginal pain')
green_label = mpatches.Patch(color = 'g', label = 'asymptomatic')
plt.legend(handles=[red_label, blue_label, yellow_label, green_label])
plt.grid(axis = 'y')
plt.savefig("A3", bbox_inches = 'tight')

