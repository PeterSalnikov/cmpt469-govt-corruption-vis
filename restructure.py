import pandas as p
import json

with open("wgidataset.json") as file:
    data = json.load(file)

length = len(data)
# print(data[0].items())

countryDict = {}

countries = []
for i in range(length):
    for key,value in data[i].items():
        if key == "countryname" and not({"name":value} in countries):
            countryDict["name"] = value
            countries.append(countryDict)
            countryDict = {}
        # if key == "countryname" and not(key in countries): 
        # if key == "countryname" and not(key+": "+value in countries):
            # countries.append(key+": "+value)
# print(countries)
#the way to construct the nested dict that you need
paramsDict = {}
paramsDict["vae"] = 2.5
yearDict = {str(1996) : paramsDict}

countries[0]["years"] = yearDict

print(countries[0])
print(countries[1])
yearPer = []
years = []
vae = []
obj = {}
vals = {}

for i in range(1):
    for key,value in data[i].items():
        if key == "countryname":
            prevCountry = value
            curCountry = value

# for i in range(length):
#     for key,value in data[i].items():

#         if key == "countryname":
#             curCountry = value

#         # print(i)
#         if curCountry == prevCountry:
#             if key == "year":
#                 yearPer.append(key+": "+str(value))
#                 # print("here")
#                 if i == length - 1:
#                     years.append(yearPer)
#                     # print("last one")

#         else:
#             years.append(yearPer)
#             yearPer = []
#             # print("not here")
        # prevCountry = curCountry
# REWORK FOR DICT
# tmp = []
# string = ""

# prevCountry = ""

# for i in range(length):
#     for key,value in data[i].items():

#         if key == "countryname":
#             curCountry = value

#         # print(i)
#         if curCountry == prevCountry:
#             if key == "year":
#                 string += str(value)+": "
#                 # obj.append(string)
#                 # string = ""

#             if key == "vae":
#                 string += str(value)
#                 # obj.append(string)
#                 # string = ""
#                 obj.append(string)
#                 string = ""

#         else:
#             if key == "countryname":
#                 obj.append(key+": "+value)
#                 vals.append(obj)
#                 obj = {}
#                 string = ""

        # prevCountry = curCountry

# print(len(countries))
# print(len(years))

# length = len(countries)

# countryYears = []
# for i in range(length):
#     tmp = []
#     tmp.append(countries[i])
#     tmp.append(years[i])
#     countryYears.append(tmp)

# print(years)

# countryYears = [countries, years]
# print(vals)
output = json.dumps(countries) # New JSON string
with open("sample.json", "w") as outfile:
    outfile.write(output)