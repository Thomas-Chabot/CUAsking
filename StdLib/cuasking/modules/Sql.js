var mysql = require ("mysql");

class Sql {
  constructor (host, name, pw) {
    this._dets = {host, name, pw};
    this._connect ();

    this._waiting = [ ];
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
    return this._query (`select * from Question join User on User.UserId where QuestionId=${questionId}`);
  }
  getQuestionByText (questionText) {
    return this._query (`select * from Question join User on User.UserId where QuestionText=${questionText}`);
  }

  getAnswers (questionId) {
    return this._query (`select * from Answer where QuestionId=${questionId}`);
  }

  getUserId (username) {
    return this._query (`select UserId from User where username=${username}`);
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
  postUser (username) {
    return this._query (`insert into User values (NULL, ${username})`);
  }

  _query (query) {
    return new Promise ((fulfill, reject) => {
      var run = () => {
        console.log ("HI GEORGIE");
        this._con.query (query, (err, res) => {
          console.log ("RESULT: ", res);

          if (err) reject (err);
          else fulfill (res);
        });
      }

      console.log ("./");

      if (!this._con)
        this._waitForConnection().then (run, reject);
      else run();
    });
  }

  _waitForConnection () {
    return new Promise ((fulfill, reject) => {
      this._waiting.push (fulfill);
    });
  }

  _connect () {
    return new Promise ((fulfill, reject) => {
      var con = mysql.createConnection({
        host: this._dets.host,
        user: this._dets.name,
        password: this._dets.pw,
        database: "Cuasking"
      });

      console.log ("Hi?");

      con.connect ((err) => {
        if (err) reject (err);
        else {
          this._con = con;

          // fulfill waiting processes
          for (var f of this._waiting) f();

          fulfill ();
        }
      });
    });
  }
}

module.exports.Sql = Sql;
