/**
* Gets a question from the database
* @param {string} question The question being asked
  @param {int}    userId   The ID of the user asking the question
* @returns none
*/
var main = require ("../../modules/main.js").Main;
var resp = require ("../../modules/respond.js").respond;

module.exports = (question = "", username = "", context, callback) => {
  resp ({question, username}, ()=>{
    return new Promise ((fulfill, reject) => {
      main.getUserId (username).then ((id) => {
        main.postQuestion (question, id).then (fulfill, reject);
      })
    });
  }, callback);
};
