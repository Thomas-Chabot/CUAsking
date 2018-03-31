var calculateBest = require ("../modules/calculateBest.js");
var getCategory = require ("../modules/getCategory.js");

var Sql = require ("./Sql.js").Sql;

const host = "cuasking.cjvfsgt6l49t.us-east-1.rds.amazonaws.com";
const user = "ubuntu";
const password = "seeyouasking";

function getDate(){
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

class Main {
  static init () {
    this._sql;
  }
  
  static get _sql () {
    if (this._sqlObj) return this._sqlObj;
    this._sqlObj = new Sql (host, user, password);
    return this._sqlObj;
  }

  static getQuestions (offset) {
    return this._sql.getQuestionsByMostRecent (20, offset);
  }
  static getQuestion (question) {
    return this._sql.getQuestionByText (question);
  }
  static postQuestion (question, userId) {
    return new Promise ((fulfill, reject) => {
      this._sql.getQuestionByText (question).then ((data) => {
        if (data.length > 0)
          calculateBest (question).then (fulfill, reject);
        else{
          getCategory (question).then ((cat) => {
            this._sql.postQuestion (question, userId, cat, getDate()).then ((results)=>{
              fulfill ({id: results.insertId})
            }, reject);
          }, reject);
        }
      }, reject);
    });
  }
  static myQuestions (userId) {
    return this._sql.getQuestionsByUserId (userId);
  }

  static postAnswer (answerText, qId) {
    return this._sql.postAnswer (answerText, qId, getDate());
  }
  static getAnswers (questionId) {
    return this._sql.getAnswers (questionId);
  }

  static userExists (username) {
    return this._sql.users (username).length > 0;
  }
  static addUser (username) {
    return this._sql.postUser (username);
  }
}

module.exports.Main = Main;
