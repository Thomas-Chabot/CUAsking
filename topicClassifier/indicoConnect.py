import indicoio
import matplotlib.pyplot as pl
import sys
import operator


resultFileName = 'result.txt'
indicoio.config.api_key = 'dfdb33f299507185178450a350d1a40a'
questionStr = sys.argv[1]



resDict= indicoio.text_tags(questionStr)
maxTag = max(resDict.items(), key=operator.itemgetter(1))[0]
with open(resultFileName, 'w') as f:
    f.write(maxTag)



#For visualization
# resDictKeys = list(resDict.keys())
# resDictNumKeys = [i for i in range(len(resDictKeys))]
# resDictVals = list(resDict.values())
#
#
# pl.bar(resDictNumKeys, resDictVals, color='g')
# pl.xticks(resDictNumKeys, resDictKeys, rotation = 'vertical')
#
# pl.show()