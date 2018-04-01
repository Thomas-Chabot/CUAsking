import indicoio
import matplotlib.pyplot as pl
import sys
import operator
from nltk.corpus import stopwords
from string import punctuation

def strip_punctuation(s):
    return ''.join(c for c in s if c not in punctuation)

def main():
    resultFileName = 'result.txt'
    questionWords = set()
    questionWords.update(['what', 'when', 'why', 'which', 'who', 'how', 'whose', 'whom'])
    indicoio.config.api_key = 'dfdb33f299507185178450a350d1a40a'
    questionStr = sys.argv[1]
    questionStr = questionStr.lower()
    questionStr = strip_punctuation(questionStr)

    print(questionStr)
    print(questionWords)
    # with open(questionFile, 'r') as f:
    #     allLines = f.readlines()

    stops = set(stopwords.words("english"))
    questionList = questionStr.split()

    print(questionList)
    questionList = [word for word in questionList if (word not in stops and word not in questionWords)]
    questionStr = ' '.join(questionList)
    print(questionStr)
    resDict = indicoio.text_tags(questionStr)
    maxTag = max(resDict.items(), key=operator.itemgetter(1))[0]
    #print(maxTag)
    with open(resultFileName, 'w') as f:
        f.write(maxTag)


    # resDictKeys = list(resDict.keys())
    # resDictNumKeys = [i for i in range(len(resDictKeys))]
    # resDictVals = list(resDict.values())
    #
    # pl.bar(resDictNumKeys, resDictVals, color='g')
    # pl.xticks(resDictNumKeys, resDictKeys, rotation='vertical')
    #
    # pl.show()

main()

#For visualization
