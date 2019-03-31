import  pandas as pd
import numpy as np
import data_cleaning

from sklearn.datasets import load_iris
from sklearn.feature_selection import SelectKBest
from sklearn.feature_selection import chi2
from sklearn.tree import DecisionTreeClassifier
from  sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import Normalizer

data = data_cleaning.data_uniform('clean_data.csv')
x,y = data.shape
k = 1/np.log(x)
nij = data.sum(axis=0)

pij = data/nij
result = pij*np.log(pij)
result = np.nan_to_num(result)
#Calculate the information entropy of each index
e = -k*(result.sum(axis=0))
#Calculate the weight
wi = (1-e)/np.sum(1-e)
dict = {}
for i in range(data.shape[1]):
    dict[data.keys()[i]] = wi[i]


x1,y1 = data[data.keys()[:-1]],data[data.keys()[-1]]

X_new=SelectKBest(chi2,k=5).fit_transform(x1,y1)
print (X_new)
#slct = SelectKBest(k="all")
#lct.fit(x1, y1)
#scores = slct.scores_

# 2. 将特征按分数 从大到小 排序
#named_scores = zip(data.keys(), scores)
#sorted_named_scores = sorted(named_scores, key=lambda z: z[1], reverse=True)
#print(sorted_named_scores)


#decision tree
tree = DecisionTreeClassifier(random_state=0)
tree.fit(x1,y1)
print(tree.feature_importances_)

#random forest
rf = RandomForestClassifier(n_estimators=100,random_state=0)
rf.fit(x1,y1)
print(rf.feature_importances_)