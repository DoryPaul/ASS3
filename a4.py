import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

data = pd.read_csv('processed.cleveland.data', sep = ",", header = None)
data.columns = ['age', 'sex', 'chest pain type', 'resting blood presure', 'serum cholestoral in mg',
                'fasting blood sugar', 'resting electrocariographic results', 'maximum heart rate',
                'angian', 'oldpek', 'slope', 'major vessels', 'thal', 'target']
data_A4 = data.filter(['age', 'sex' ,'resting blood presure'], axis = 1)
male_data = data_A4[(data_A4['sex'] == 1)]
female_data = data_A4[(data_A4['sex'] == 0)]
plt.scatter(male_data['age'], male_data['resting blood presure'], label = 'male blood presure data', color = 'b', s = 15)
plt.scatter(female_data['age'], female_data['resting blood presure'], label = 'female blood presure data', color = 'r', s = 15)
plt.title('Blue is Male & Red is Female',fontsize = 9, horizontalalignment = 'center')
plt.suptitle('Resting Blood Presure', fontsize=16, horizontalalignment = 'center')
plt.xlabel('Age')
plt.ylabel('Blood Presure')
plt.savefig('A4', bbox_inches = 'tight')