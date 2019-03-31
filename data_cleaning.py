import pandas as pd
import pylab as pl
def load_file(data_path):
    df = pd.read_csv(data_path)
    df.replace('?',99,inplace=True)
    df['target'].replace([2,3,4],1,inplace=True)
    df.to_csv('clean_data.csv')
    #df.groupby('age')['sex'].plot(kind='bar', legend=True, figsize=(20, 5))

def data_uniform(data_path):
    df1 = pd.read_csv(data_path,index_col=0)
    keys = df1.keys()
    norm_list = [keys[0],keys[2],keys[3],keys[4],keys[6],keys[7],keys[9],keys[10],keys[11],keys[12]]
    temp = pd.DataFrame()
    for i in range(len(keys)):
        if df1.keys()[i] in norm_list:
            temp[df1.keys()[i]] = ((df1[df1.keys()[i]]-min(df1[df1.keys()[i]]))/(max(df1[df1.keys()[i]])-min(df1[df1.keys()[i]])))
        else:
            temp[df1.keys()[i]] = df1[df1.keys()[i]]
    return temp
load_file('processed.csv')