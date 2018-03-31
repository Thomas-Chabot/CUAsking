/**
* Gets a question from the database
* @param {string} name Who you're saying hello to
* @returns {string}
*/
var main = require ("../../modules/main.js").Main;
var resp = require ("../../modules/respond.js").respond;

module.exports = (username = "", questionId = 0, context, callback) => {
  resp ({username}, ()=>{
    return new Promise ((fulfill, reject) => {
      main.getUserId (username).then ((id) => {
        main.myQuestions (id).then (fulfill, reject);
      });
    });
  }, callback);
};
