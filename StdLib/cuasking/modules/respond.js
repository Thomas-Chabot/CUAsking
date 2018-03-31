function respond (data, f, callback) {
  for (var name in data) {
    if (!el[name]) {
      callback (`The ${name} argument must be provided`);
      return;
    }
  }

  f().then ((results)=>{
    callback (null, results);
  }, (err)=>{
    console.log (err);
    callback (new Error("Server error"));
  });
}

module.exports.respond = respond;
