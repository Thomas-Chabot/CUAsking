function respond (data, f, callback) {
  for (var name in data) {
    if (!data[name]) {
      callback (new Error (`The ${name} argument must be provided`));
      return;
    }
  }

  f().then ((results)=>{
    callback (null, results);
  }, (err)=>{
    console.log (err, err.stack);
    callback (new Error("Server error"));
  });
}

module.exports.respond = respond;
