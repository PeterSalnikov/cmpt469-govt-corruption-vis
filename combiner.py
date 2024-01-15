import pandas as p
import json

with open("wgidataset.json") as wgiFile:
    wgi = json.load(wgiFile)

    wgiLen = len(wgi)

    # print(wgiLen)

    prevCountry = wgi[0]["countryname"]
    # print(prevCountry)

tmp = {}
params = {}
countries = {}
years = {}
list = []

dYears = {}
dParams = {}
dCountries = {}

dParams["vae"] = None
dParams["pve"] = None
dParams["gee"] = None
dParams["rqe"] = None
dParams["rle"] = None
dParams["cce"] = None

for i in range(wgiLen):

    cur = wgi[i]
    curCountry = cur["countryname"]
    
    params["vae"] = cur["vae"]
    params["pve"] = cur["pve"]
    params["gee"] = cur["gee"]
    params["rqe"] = cur["rqe"]
    params["rle"] = cur["rle"]
    params["cce"] = cur["cce"]
    # print(params)

    if curCountry == prevCountry:
        years[str(cur["year"])] = params
        dYears[str(cur["year"])] = dParams
        # print(cur["year"])

    # elif prevCountry == "":
    #     continue

    else:
        countries["name"] = prevCountry
        countries["years"] = years
        years = {}
        list.append(countries)
        countries = {}
        # years = {}
        # print(countries)
    params = {}
    prevCountry = curCountry

# print(list[1])

dCountries["years"] = dYears

# objArr = {"years":yearsArr}

with open("world.topojson") as file:
    world = json.load(file)

    countries = world["objects"]["countries"]["geometries"]
    # print(countries[0])
    length = len(countries)
    # print(length)
iter = 0

# print(len(list))

for i in range(length):
    # print(iter)
    for j in range(len(list)):

        properties = countries[i]["properties"]
        if list[j]["name"] == properties["name"]:
            properties["years"] = list[j]["years"]
            iter += 1
            print(iter)
            # print(list[j]["years"])

for i in range(length):
    properties = countries[i]["properties"]
    print("good")
    if not "years" in properties:
        properties["years"] = dYears


output = json.dumps(world) # New JSON string
with open("sample.json", "w") as outfile:
    outfile.write(output)

