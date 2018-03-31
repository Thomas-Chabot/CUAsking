/**
* Gets a question from the database
* @returns {string}
*/

var main = require ("../modules/main.js");
main.init ();

module.exports = ((context, callback) => {
  callback (null, "Hello World");
});
