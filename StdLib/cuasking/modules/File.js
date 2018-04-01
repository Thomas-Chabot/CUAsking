var fs = require ("fs");

class File {
  static read (filePath) {
    return new Promise((fulfill, reject) => {
      fs.readFile (filePath, (err, contents) => {
        if (err) reject (err);
        else {
          fulfill (contents.toString ());
        }
      });
    });
  }
  
  static write (filePath, data) {
    return new Promise ((fulfill, reject) => {
      fs.appendFile (filePath, data, (err) => {
        if (err) reject (err);
        fulfill ();
      });
    });
  }
}

module.exports.File = File;
