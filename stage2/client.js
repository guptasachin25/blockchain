var request = require('request');


const URL = 'http://localhost';

var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

const post = function(port, mount, params) {
  return new Promise((resolve, reject) => {
    request({
      headers: headers,
      url: `${URL}:${port}/${mount}`,
      form: params,
      method: 'POST',
    }, (error, response, body) => {
      if (error) {
        console.log(error);
      }

      if (response) {
        resolve(response.body);
      } else {
        resolve();
      }
    });
  });
};

var client = {
  gossip: function(port, data) {
    var params = {
      data
    };

    return post(port, 'gossip', params);
  },
};

module.exports = client;