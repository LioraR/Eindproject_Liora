# Liora Rosenberg
# Student number: 11036435

import pandas
import csv
import json

INPUT_CSV = "invalidVote.csv"
reader = pandas.read_csv(INPUT_CSV)

reader = reader.drop(["Election type"], axis=1)

reader["Invalid votes"] = reader["Invalid votes"].str.strip("%")
reader["Invalid votes"] = pandas.to_numeric(reader["Invalid votes"],  errors='coerce')

# put the data in the right format to convert to json
reader = reader.pivot_table(values='Invalid votes', index='Country', columns='Year', aggfunc='mean')
reader = reader.to_json('invalid.json', orient="index")
