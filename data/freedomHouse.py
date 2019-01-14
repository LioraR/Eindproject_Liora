# Liora Rosenberg
# Student number: 11036435

import pandas
import csv
import json

INPUT_CSV = "freedomHouse.csv"
reader = pandas.read_csv(INPUT_CSV)

reader = reader.drop(["Election type"], axis=1)

print(reader)

# put the data in the right format
reader = reader.pivot_table(values='Freedom house', index='Country', columns='Year', aggfunc='mean')

print(reader)
#reader = reader.set_index('Country')
reader = reader.to_json('freedomHouse.json', orient="index")
