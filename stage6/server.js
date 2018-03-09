var express = require('express');
var bodyParser = require('body-parser')
var _ = require('lodash');
var helpers = require('./helpers.js');
var client = require('./client.js');
var PromiseUtils = require('./promise-utils.js');

const STATE = {};
const MOVIES = [
  '3 Idiots',
  'Gangs of Wasseypur',
  'Rang De Basanti',
  'A Wednesday',
  'Anand',
  'Udaan',
  'Lagaan: Once Upon a Time in India',
  'Swades',
  'Taare Zameen Par',
  'Zindagi Na Milegi Dobara',
  'Mughal-E-Azam',
  'Special 26',
  'Pyaasa',
  'Black Friday',
  'Bhaag Milkha Bhaag',
  'Haider',
  'Shahid',
  'Paan Singh Tomar'
];

var version = 0;
const myport = process.argv[2];
const peer_port = process.argv[3];

var updateMyState = function() {
  var movie = _.sample(MOVIES);
  version += 1;

  var data = {};
  data[myport] = JSON.stringify({
    movie,
    version
  });

  helpers.updateState(STATE, data);

  console.log(`My favourite movie is ${movie}`);
  helpers.displayState(STATE);
  client.gossip(peer_port, JSON.stringify(data));
};

var gossip = function() {
  return PromiseUtils.runSerially(_.keys(STATE), port => {
    if (port === myport) {
      return Promise.resolve();
    }
    return client.gossip(port, JSON.stringify(STATE)).then(gossipResponse => {
      if (!gossipResponse) {
        return;
      }
      return helpers.updateState(STATE, JSON.parse(gossipResponse));
    });
  }).then(() => {
    helpers.displayState();
  });
};

updateMyState();
setInterval(updateMyState, 3000);
setInterval(gossip, 8000);

const app = express()

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/gossip', (req, res) => {
  const data = JSON.parse(req.body.data);

  if (!data) {
    res.status(500).send('parameters are not defined');
    return;
  }
  helpers.updateState(STATE, data);
  res.send(JSON.stringify(STATE));
});

app.listen(myport, () => {
  console.log(`Client is listening on port ${myport}!`)
  helpers.displayState(STATE);
});
