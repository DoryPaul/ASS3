import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

data = pd.read_csv('processed.cleveland.data', sep = ",", header = None)
data.columns = ['age', 'sex', 'chest pain type', 'resting blood presure', 'serum cholestoral in mg',
                'fasting blood sugar', 'resting electrocariographic results', 'maximum heart rate',
                'angian', 'oldpek', 'slope', 'major vessels', 'thal', 'target']
data_A8 = data.filter(['age', 'sex' ,'maximum heart rate'], axis = 1)
male_data = data_A8[(data_A8['sex'] == 1)]
female_data = data_A8[(data_A8['sex'] == 0)]
plt.scatter(male_data['age'], male_data['maximum heart rate'], label = 'male maximum heart rate', color = 'b', s = 15)
plt.scatter(female_data['age'], female_data['maximum heart rate'], label = 'female maximum heart rate', color = 'r', s = 15)
plt.title('Blue is Male & Red is Female',fontsize = 9, horizontalalignment = 'center')
plt.suptitle('Maximum Heart Rate', fontsize=16, horizontalalignment = 'center')
plt.xlabel('Age')
plt.ylabel('Heart Rate')
plt.savefig('A8', bbox_inches = 'tight')