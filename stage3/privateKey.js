var forge = require('node-forge');

var rsa = forge.pki.rsa;

module.exports = {
  generate_key_pair: function() {
    return rsa.generateKeyPair({bits: 2048, e: 0x10001});
  },

  sign: function(plaintext, privateKey) {
    var md = forge.md.sha1.create();
    md.update(plaintext, 'utf8');
    return forge.util.encode64(privateKey.sign(md));
  },

  valid_signature: function(message, ciphertext, publicKey) {
    try {
      var md = forge.md.sha1.create();
      md.update(message, 'utf8');
      return publicKey.verify(md.digest().bytes(), forge.util.decode64(ciphertext));
    } catch (e) {
      return false;
    }
  },
};

