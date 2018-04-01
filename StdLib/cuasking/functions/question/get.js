/**
* Gets a question from the database
* @param {string} question The question to post
* @returns {Array of Object} An array of answers for the question (if previously asked) or POST details
*/
var main = require ("../../modules/main.js").Main;
var resp = require ("../../modules/respond.js").respond;

module.exports = (question = "", context, callback) => {
  resp ({question}, ()=>{
    return main.getQuestion (question);
  }, callback);
};
