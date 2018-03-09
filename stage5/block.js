
var _ = require('lodash');
var PW = require('./proof_of_work.js');

class Block {
  constructor (prev_block, msg) {
    this.own_hash = null;
    this.nonce = null;

    this.prev_block_hash = prev_block && prev_block.getHash();
    this.msg = msg;
  }

  mine_block() {
    this.nonce = PW.find_nonce(`${this.prev_block_hash} ${this.msg}`);
    this.own_hash = PW.hash(this.full_block(nonce))
  }

  isValid() {
    this.PW.is_valid_nonce(this.own_hash);
  }

  toString() {
    return _.join([
      '',
      _.repeat('-', 80),
      `Previous hash: ${this.prev_block_hash}`,
      `Message: ${this.msg}`,
      `Nonce: ${this.nonce}`,
      `Own hash: ${this.own_hash}`,
      _.repeat('-', 80),
    ],'\n');
  }

  full_block() {
    return _.join([this.prev_block_hash, this.msg, this.own_hash, this.nonce], '-');
  }
}