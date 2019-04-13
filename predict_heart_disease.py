from sklearn.neighbors import KNeighborsClassifier
from sklearn.utils import shuffle
from sklearn.metrics import precision_score, accuracy_score, recall_score
from data_cleaning import data_uniform, input_data_uniform
import matplotlib.pyplot as plt
import pandas as pd
import requests
from flask import Flask, jsonify, request
from flask_restful import Resource, Api

app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False

def load_data(data, split_percent):
    df = shuffle(data)

    iris_x = df.drop('target', axis=1).values
    iris_y = df['target'].values

    split_point = int(len(iris_x) * split_percent)
    iris_X_train = iris_x[:split_point]
    iris_y_train = iris_y[:split_point]
    iris_X_test = iris_x[split_point:]
    iris_y_test = iris_y[split_point:]

    return iris_X_train, iris_y_train, iris_X_test, iris_y_test

def plot_decison_regions(X, y):
    plt.figure()
    plt.xlabel("Number of iterations")
    plt.ylabel("Accuracy score")
    plt.title("Accuracy Graph")
    plt.axis([1,100,0,1])
    plt.plot(X, y)
    plt.show()

def get_accuracy_score(data):
    csv_file = 'clean_data.csv'
    temp = data_uniform(csv_file)
    data = input_data_uniform(csv_file, data)
    iris_X_train, iris_y_train, iris_X_test, iris_y_test = load_data(temp, 0.9)

    maxp = 0
    maxn = 1
    accuracy_list = []
    for n in range(1, 101):
        knn = KNeighborsClassifier(n_neighbors=n)
        knn.fit(iris_X_train, iris_y_train)
        predictions = knn.predict(iris_X_test)
        if predictions[0] > maxp:
            maxp = predictions[0]
            maxn = n
        accuracy_list.append(accuracy_score(iris_y_test, predictions))

    n_list = [i for i in range(1, 101)]
    plot_decison_regions(n_list, accuracy_list)
    prob = 0
    for acc in accuracy_list:
        prob = max(prob, acc)

    knn = KNeighborsClassifier(n_neighbors=maxn)
    knn.fit(iris_X_train, iris_y_train)
    return knn.predict(data)[0]