/**
* Gets a question from the database
* @param {string} name Who you're saying hello to
* @returns {string}
*/
var main = require ("../../modules/main.js").Main;
var resp = require ("../../modules/respond.js").respond;

module.exports = (userId = 0, questionId = 0, context, callback) => {
  resp ({userId}, ()=>{
    return main.myQuestions (userId);
  }, callback);
};
