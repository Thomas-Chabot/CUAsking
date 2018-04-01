/**
* Gets a question from the database
* @param {string} answer The answer to post to the database
* @param {int} questionId The question ID to post the answer for
* @param {string} username The username to post the answer under
* @returns {Array of Object} The results from the post
*/
var main = require ("../../modules/main.js").Main;
var resp = require ("../../modules/respond.js").respond;

module.exports = (answer = "", questionId = 0, username = "", context, callback) => {
  console.log ("Got a request: ", answer, " with QID ", questionId, " with username ", username);
  resp ({questionId, answer, username}, ()=>{
    return new Promise ((fulfill, reject) => {
      main.getUserId (username).then ((id) => {
        main.postAnswer (answer, questionId, id).then ((...a)=> {
          fulfill (...a);
        }, reject);
      });
    });
  }, callback);
};
