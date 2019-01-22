# Liora Rosenberg
# Student number: 11036435

import pandas
import csv
import json

INPUT_CSV = "VAP Turnout.csv"
reader = pandas.read_csv(INPUT_CSV)

reader = reader.drop(["Election type"], axis=1)

reader["VAP Turnout"] = reader["VAP Turnout"].str.strip("%")
reader["VAP Turnout"] = pandas.to_numeric(reader["VAP Turnout"],  errors='coerce')

# put the data in the right format
reader = reader.pivot_table(values='VAP Turnout', index='Country', columns='Year', aggfunc='mean')

#if reader["Voter Turnout"] == "null":
#    print('x')
    #reader["Voter Turnout"] = None

print(reader)

#reader = reader.set_index('Country')
reader = reader.to_json('vap.json', orient="index")
