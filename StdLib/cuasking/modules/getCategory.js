var PythonShell = require('python-shell');
var File        = require('./File.js').File;

function getCategory (question) {
  return new Promise((fulfill, reject) => {
    var options = {
      mode: 'text',
      args: [question]
    };

    PythonShell.run('python/classifier/indicoConnect.py', options, (err) => {
      if (err) reject(err);

      File.read ('result.txt').then ((data) => {
        fulfill (data);
      }, reject);
    });
  });
}

module.exports.get = getCategory;
