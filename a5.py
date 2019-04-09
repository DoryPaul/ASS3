import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

data = pd.read_csv('processed.cleveland.data', sep = ",", header = None)
data.columns = ['age', 'sex', 'chest pain type', 'resting blood presure', 'serum cholestoral in mg',
                'fasting blood sugar', 'resting electrocariographic results', 'maximum heart rate',
                'angian', 'oldpek', 'slope', 'major vessels', 'thal', 'target']
data_A5 = data.filter(['age', 'sex' ,'serum cholestoral in mg'], axis = 1)
male_data = data_A5[(data_A5['sex'] == 1)]
female_data = data_A5[(data_A5['sex'] == 0)]
plt.scatter(male_data['age'], male_data['serum cholestoral in mg'], label = 'male serum cholestoral in mg', color = 'b', s = 15)
plt.scatter(female_data['age'], female_data['serum cholestoral in mg'], label = 'female serum cholestoral in mg', color = 'r', s = 15)
plt.title('Blue is Male & Red is Female',fontsize = 9, horizontalalignment = 'center')
plt.suptitle('Serum Cholestoral in mg', fontsize=16, horizontalalignment = 'center')
plt.xlabel('Age')
plt.ylabel('Serum Cholestoral in mg')
plt.savefig('A5', bbox_inches = 'tight')