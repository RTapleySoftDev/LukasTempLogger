import csv
import json
import pandas as pd
import os



csv_file = pd.DataFrame(pd.read_csv('static/files/20190218-150856.csv', sep = ",", header = 0, index_col = False))
print(csv_file)
print("********************************************************************************")
print(csv_file.to_json(orient = "records",  double_precision = 10, force_ascii = True, default_handler = None))
print("********************************************************************************")

fileList = os.listdir("static/files/")[:-1]
print(fileList)
print("********************************************************************************")

ammendedFileList = [ f.replace('-','0') for f in fileList]
ammendedFileList = [os.path.splitext(x)[0] for x in ammendedFileList]
print(ammendedFileList)
print("********************************************************************************")

sortedFileList = sorted(ammendedFileList, reverse= True)
print(sortedFileList)
print("********************************************************************************")

fileIn = sortedFileList[0]
fileApp = fileIn[:8] + "-" + fileIn[9:]
print(fileApp)
print("********************************************************************************")
fileApp = fileApp[:] + ".csv" 
print(fileApp)
print("********************************************************************************")
