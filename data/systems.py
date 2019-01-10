# Liora Rosenberg
# Student number: 11036435

import pandas
import csv
import json

INPUT_CSV = "politicalsystems.csv"
reader = pandas.read_csv(INPUT_CSV)

print(reader)


reader = reader.set_index('State')
reader = reader.to_json('systems.json', orient="index")
