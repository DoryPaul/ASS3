import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

data = pd.read_csv('processed.cleveland.data', sep = ",", header = None)
data.columns = ['age', 'sex', 'chest pain type', 'resting blood presure', 'serum cholestoral in mg',
                'fasting blood sugar', 'resting electrocariographic results', 'maximum heart rate',
                'angina', 'oldpek', 'slope', 'major vessels', 'thal', 'target']
data_A10 = data.filter(['age', 'sex' ,'oldpek'], axis = 1)
male_data = data_A10[(data_A10['sex'] == 1)]
female_data = data_A10[(data_A10['sex'] == 0)]
plt.scatter(male_data['age'], male_data['oldpek'], label = 'male oldpek', color = 'b', s = 15)
plt.scatter(female_data['age'], female_data['oldpek'], label = 'female oldpek', color = 'r', s = 15)
plt.title('Blue is Male & Red is Female',fontsize = 9, horizontalalignment = 'center')
plt.suptitle('Oldpek', fontsize=16, horizontalalignment = 'center')
plt.xlabel('Age')
plt.ylabel('Oldpek')
plt.savefig('A10', bbox_inches = 'tight')

