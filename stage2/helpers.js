var _ = require('lodash');

module.exports = {
  displayState: function(state) {
    console.log('\n\n\n');
    console.log('##################################');
    console.log('--------CURRENT STATE----------\n\n');

    _.forEach(state, (value, port) => {
      const json = JSON.parse(value);
      console.log(`${port}  =>   movie: ${json.movie}, version: ${json.version}`);
    });


    console.log('\n\n##################################');
    console.log('\n\n\n');
  },

  updateState: function(state, data) {
    _.forEach(data, (pstate, port) => {
      const portdata = JSON.parse(pstate);
      const movie = portdata.movie;
      const version = portdata.version;

      var json = JSON.parse(state[port] || '{}');

      if (!json.version || (json.version && json.version < version)) {
        state[port] = pstate;
        return;
      }
    });
  },
};