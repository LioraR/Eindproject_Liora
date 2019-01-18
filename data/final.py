# Liora Rosenberg
# Student number: 11036435

import pandas
import csv
import json

INPUT_CSV = "final.csv"
reader = pandas.read_csv(INPUT_CSV)

reader = reader.drop(["Election type"], axis=1)

print(reader)

# put the data in the right format
reader = reader.pivot_table(values=['Voter Turnout', 'VAP Turnout', 'Invalid votes', 'Freedom House - Political Rights', 'Freedom House - Civil liberties'], index='Country', columns='Year', aggfunc='mean')

print(reader)
#print(reader)
#reader = reader.set_index('Country')
reader = reader.to_json('final.json', orient="index")
