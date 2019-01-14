# Liora Rosenberg
# Student number: 11036435

import pandas
import csv
import json

INPUT_CSV = "freedomHouse.csv"
reader = pandas.read_csv(INPUT_CSV)

print(reader)
# change format of reader and remove data
#reader = reader.drop(["1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980"],

reader = reader.drop(["Jan.-Feb. 1973", "Jan.-Feb. 1974", "Jan.-Feb. 1975", "Jan.-Feb. 1976", "Jan.-Feb. 1977", "1978", "1979",
                      "1980", "1981", "1982", "1983-84", "1984-85", "1985-86", "1986-87", "1987-88", "1988-89", "1989-90", "1990-91",
                      "1991-92", "1992-93", "1993-94", "1994-95", "1995-96", "1996-97", "1997-98", "1998-99", "1999-2000"],
                     axis=1)

print(reader)
