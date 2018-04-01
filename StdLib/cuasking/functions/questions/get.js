/**
* Gets a question from the database
* @param {string} offset An index of which to grab the questions from (by most recent)
* @returns {Array of Object} An array of the 20 last questions from the provided offset.
*/
var main = require ("../../modules/main.js").Main;
var resp = require ("../../modules/respond.js").respond;

module.exports = (offset = 0, context, callback) => {
  resp ({}, ()=>{
    return main.getQuestions (offset);
  }, callback);
};
