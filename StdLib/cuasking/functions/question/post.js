/**
* Gets a question from the database
* @param {string} question The question being asked
  @param {int}    username   The name of the user asking the question
* @returns none
*/
var main = require ("../../modules/main.js").Main;
var resp = require ("../../modules/respond.js").respond;

module.exports = (question = "", username = "", context, callback) => {
  console.log (question, username, context.params);
  resp ({question, username}, ()=>{
    return new Promise ((fulfill, reject) => {
      main.getUserId (username).then ((id) => {
        main.postQuestion (question, id).then (fulfill, reject);
      })
    });
  }, callback);
};
