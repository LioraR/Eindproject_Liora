# Liora Rosenberg
# Student number: 11036435

import pandas
import csv
import json

INPUT_CSV = "freedomHouse.csv"
reader = pandas.read_csv(INPUT_CSV)

# election type is all the same (EU turnout)
reader = reader.drop(["Election type"], axis=1)

# put the data in the right format to convert to json
reader = reader.pivot_table(values='Freedom house', index='Country', columns='Year', aggfunc='mean')
reader = reader.to_json('freedomHouse.json', orient="index")
