# Liora Rosenberg
# Student number: 11036435

import pandas
import csv
import json

INPUT_CSV = "EUturnout.csv"
reader = pandas.read_csv(INPUT_CSV)

reader = reader.drop(["Election type"], axis=1)

# remove %
reader["Voter Turnout"] = reader["Voter Turnout"].str.strip("%")
reader["Voter Turnout"] = pandas.to_numeric(reader["Voter Turnout"],  errors='coerce')

# put the data in the right format to convert to json
reader = reader.pivot_table(values='Voter Turnout', index='Country', columns='Year', aggfunc='mean')
reader = reader.to_json('EUturnout.json', orient="index")
