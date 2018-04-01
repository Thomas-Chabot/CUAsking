function strip_punctuation (str) {
  return str.match(/[a-zA-Z0-9]/g).join("");
}
