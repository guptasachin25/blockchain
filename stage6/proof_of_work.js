var forge = require('node-forge');
var _ = require('lodash');

const NUM_ZEROES = 4;

const FIRST = 33;
const LAST = 126;

function next (string) {
  var length = string.length;
  var index = length - 1;

  while (index >= 0 && string.charCodeAt(index) === LAST) {
    index -= 1;
  }

  if (index === -1) {
    //console.log(_.repeat(String.fromCharCode(FIRST), length + 1));
    console.log('...');
    return _.repeat(String.fromCharCode(FIRST), length + 1);
  }

  var leftString = string.substring(0, index);
  var charCode = string.charCodeAt(index);

  return leftString +
    String.fromCharCode(charCode + 1) +
    _.repeat(String.fromCharCode(LAST), length - index - 1);
}

exports.hash = function(message) {
  var md = forge.md.sha256.create();
  md.update(message);
  return md.digest().toHex();
}

exports.is_valid_nonce = function(hash) {
  return _.startsWith(hash, _.repeat('0', NUM_ZEROES));
}

exports.find_nonce = function(message) {
  var nonce = "The quick brown fox jumps over the lazy dog"
  var count = 0

  while (!is_valid_nonce(nonce, message)) {
    nonce = next(nonce);
    count += 1;
  }
  console.log(count, nonce, hash(message + nonce));
}