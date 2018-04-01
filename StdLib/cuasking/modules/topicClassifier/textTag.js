var indico = require('indico.io');

var stopWords = ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "you're", "you've", "you'll", "you'd", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "she's", "her", "hers", "herself", "it", "it's", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "that'll", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "don't", "should", "should've", "now", "d", "ll", "m", "o", "re", "ve", "y", "ain", "aren", "aren't", "couldn", "couldn't", "didn", "didn't", "doesn", "doesn't", "hadn", "hadn't", "hasn", "hasn't", "haven", "haven't", "isn", "isn't", "ma", "mightn", "mightn't", "mustn", "mustn't", "needn", "needn't", "shan", "shan't", "shouldn", "shouldn't", "wasn", "wasn't", "weren", "weren't", "won", "won't", "wouldn", "wouldn't", "a"]
var setStopWords  = new Set(stopWords)
indico.apiKey =  'dfdb33f299507185178450a350d1a40a';

var strToListWords = function(str){
    return str.split(' ')
}


function strip_punctuation (str) {
 return str.match(/[a-zA-Z0-9]/g).join("");
}

function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

var removeStopWords = function(listOfWords){

    for(var i = 0; i< listOfWords.length; i++){
        listOfWords[i] = strip_punctuation(listOfWords[i])
        if(setStopWords.has(listOfWords[i])){
            delete listOfWords[i]
        }
    }
    listOfWords = cleanArray(listOfWords)
    return listOfWords
}


function tag (dict) {
  return new Promise ((fulfill, reject) => {
    var response = function(dict) {
      var maxKey = Object.keys(dict).reduce(function(a,b){ return dict[a] > dict[b] ? a : b});
      fulfill (maxKey);
    }


    var logError = function(err) {
    console.log(err);
    }

    var mainMaxTag = function(strExample){
      var listOfW = strToListWords(strExample)
      var listOfW = removeStopWords(listOfW)
      var wordsStr = listOfW.join();


    indico.textTags(wordsStr)
      .then(response)
      .catch(logError);
    }

    mainMaxTag (dict);
  });
}

module.exports.Tag = tag;
