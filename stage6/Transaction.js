var PKI = require('./PKI.js');
var _ = require('lodash');
var PW = require('./proof_of_work.js');

class Transaction {
  constructor(from, to, amount, priv_key) {
    this.from = from
    this.to = to
    this.amount = amount
    this.signature = PKI.sign(this.message(), priv_key)
  }

  is_valid_signature() {
    if (this.genesis_txn()) {
      return true;
    }
    return PKI.valid_signature(this.message(), this.signature, this.from);
  }

  genesis_txn() {
    return _.isNil(this.from);
  }

  message() {
    return PW.hash(_.join([this.from, this.to, this.amount], '_'));
  }

  toString() {
    return this.message();
  }
}
