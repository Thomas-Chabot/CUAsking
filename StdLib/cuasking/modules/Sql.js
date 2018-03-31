var mysql = require ("mysql");

class Sql {
  constructor (host, name, pw) {
    this._dets = {host, name, pw};
    this._connect ();
  }


  getQuestionsByMostRecent (numResults, offset) {
    if (!numResults) numResults = 20;
    if (!offset) offset = 0;

    return this._query (`select * from Question order by Date LIMIT ${numResults} OFFSET ${offset}`);
  }

  getQuestionsByUserId (userId) {
    return this._query (`select QuestionId from
        (select * from Question where UserId=${userId})
        join Answer on QuestionId`).then (fulfill, reject);
  }
  getQuestion (questionId) {
    return this._query (`select * from Question where QuestionId=${questionId}`);
  }
  getQuestionByText (questionText) {
    return this._query (`select * from Question where QuestionText=${questionText}`);
  }

  getAnswers (questionId) {
    return this._query (`select * from Answer where QuestionId=${questionId}`);
  }

  users (username) {
    return this._query (`select * from User where username=${username}`);
  }


  postQuestion (question, userId, category, date) {
    return this._query (`insert into Question values (NULL, ${question}, ${userId}, ${category})`);
  }
  postAnswer (answer, questionId, date) {
    return this._query (`insert into Answer values (NULL, ${questionId}, ${answer})`);
  }
  postUser (username, userId) {
    return this._query (`insert into User values (NULL, ${username})`);
  }

  _query (query) {
    return new Promise ((fulfill, reject) => {
      this._con.query (query, (err, res) => {
        if (err) reject (err);
        else fulfill (res);
      });
    });
  }

  _connect () {
    return new Promise ((fulfill, reject) => {
      console.log (this._dets.host, this._dets.name, this._dets.pw);
      var con = mysql.createConnection({
        host: this._dets.host,
        user: this._dets.name,
        password: this._dets.pw,
        database: "Cuasking"
      });

      console.log ("Connecting\n");
      
      con.connect ().then ((err) => {
        if (err) reject (err);
        else {
          console.log ("Connected to ", con);
          this._con = con;
          fulfill ();
        }
      });
    });
  }
}

module.exports.Sql = Sql;
