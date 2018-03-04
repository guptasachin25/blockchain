var request = require('request');


const URL = 'http://localhost:3000'
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

const post = function(mount, params) {
  request({
    headers: headers,
    url: `${URL}/${mount}`,
    form: params,
    method: 'POST',
  }, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
};

var client = {

  request_balance: function () {
    request.get(`${URL}/balance/sachin`, (error, response, body) => {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    });
  },

  create_user: function(username) {
    var params = {
      username: username,
    };

    post('users', params);
  },

  transfer: function(sender, receiver, amount) {
    var params = {
      sender,
      receiver,
      amount,
    };

    post('transfer', params);
  },
};

module.exports = client;