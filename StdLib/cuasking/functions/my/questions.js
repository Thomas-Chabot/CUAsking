/**
* Gets a question from the database
* @param {string} username The username of the user for which to get questions.
* @returns {Array of Object} An array of questions posted by the user.
*/
var main = require ("../../modules/main.js").Main;
var resp = require ("../../modules/respond.js").respond;

module.exports = (username = "", questionId = 0, context, callback) => {
  resp ({username}, ()=>{
    return new Promise ((fulfill, reject) => {
      main.getUserId (username).then ((id) => {
        main.myQuestions (id).then ((...a)=> {
          fulfill (...a);
        }, reject);
      });
    });
  }, callback);
};
