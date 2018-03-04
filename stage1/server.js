var express = require('express');
var bodyParser = require('body-parser')
var _ = require('lodash');

const BALANCES = {
  'sachin': 100000,
};

const displayBalances = function() {
  console.log('\n\n\n');
  console.log('##################################');
  console.log('--------CURRENT BALANCES----------\n\n');

  _.forEach(BALANCES, (value, key) => {
    console.log(key, '  =>   ', value);
  });


  console.log('\n\n##################################');
  console.log('\n\n\n');
};

const app = express()

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.all('/', (req, res) => {
  console.log(req);
});

app.get('/balance/:user', (req, res) => {
  if (!BALANCES[req.params.user]) {
    res.status(500).send('USER NOT FOUND');
  }
  res.send(BALANCES[req.params.user].toString());
});

app.post('/users', (req, res) => {
	console.log(req.body);
  const username = req.body.username;
  const amount = req.body.amount || 0;

  if (!username) {
    res.status(500).send('username is not defined');
    return;
  } else if (BALANCES[username]) {
    res.status(500).send('username already exists');
    return;
  }

  BALANCES[username] = parseFloat(amount);
  displayBalances();
  res.send(`USER ${username} CREATED with amount ${amount}`);
});

app.post('/transfer', (req, res) => {
	console.log(req.body);
  const fromUser = req.body.sender;
  const toUser = req.body.receiver;
  const amount = req.body.amount;

  if (!toUser || !fromUser || !amount) {
    res.status(500).send('sender or receiver or amount is not defined');
    return;
  } else if (_.isUndefined(BALANCES[toUser]) || _.isUndefined(BALANCES[fromUser])) {
    res.status(500).send('Either toUser or fromUser is not registered');
    return;
  } else if (BALANCES[fromUser] < parseFloat(amount)) {
    res.status(500).send('Insufficient Balance');
    return;
  }

  BALANCES[fromUser] -= parseFloat(amount);
  BALANCES[toUser] += parseFloat(amount);
  displayBalances();
  res.send('Transfer SUCCESSFUL!!');
});

app.listen(3000, () => {
  console.log('Blockchain listening on port 3000!')
  displayBalances();
});
