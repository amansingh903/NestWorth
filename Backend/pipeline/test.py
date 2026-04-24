import pandas as pd
df = pd.read_csv('../../Data/india_housing_prices.csv')
print(df.shape)
print(df.columns.tolist())
print(df.head(3))