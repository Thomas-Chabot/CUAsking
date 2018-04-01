/**
* Gets all answers for a given question
* @param {int} questionId The question to get the answers for
* @returns {Array of Object} An array of Answer objects.
*/
var main = require ("../../modules/main.js").Main;
var resp = require ("../../modules/respond.js").respond;

module.exports = (questionId = 0, context, callback) => {
  resp ({questionId}, ()=>{
    return main.getAnswers (questionId);
  }, callback);
};
