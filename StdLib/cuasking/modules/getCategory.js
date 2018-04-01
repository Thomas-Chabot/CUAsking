var TextTag     = require ("./topicClassifier/textTag.js").Tag;
var File        = require('./File.js').File;

function getCategory (question) {
  return TextTag(question);
}

module.exports.get = getCategory;
