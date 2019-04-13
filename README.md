# Comp9321ASS3
Assignment 3 of COMP9321
# How to run?
Firstly,run Api.py to get data from backend.

# clean data
Because the data include some dirty data like '?' which may influence the accuracy, we need to replace it with cleaning data.
### a) replace '?' with the number 99.
### b) the data of 'target' include the number 2,3,4, we update these number with 1.

# data normalization
We use Min-Max Normalization to normalize the data.
The formula is : x' = (x - X_min) / (X_max - X_min)
# calculate the weight of each attribute
Using stochastic gradient rise to calculate the weights

# Prediction of heart disease
First, I need to get trainning data from clean_data.csv and divide it into both trainning data and test data. Second, set trainning count from 1 to 100 to train knn model to get the number as when the probability is maximum. Simultaneously, draw line table between trainning counts and accuracy. Finally, build a knn model by this number and get input data by which take data normalization. To get the result of prediction by normalized input data. Converting the result as json and returning to the client.

# Api
Using flask and flask_restplus to create api to provide the data to the front end.




