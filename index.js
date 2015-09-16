
var request = require('request');
var githubhook = require('githubhook');
var config = require('./config');



var XKCD_MAX = 1578;



// configure server that listens on webhooks
var github = githubhook();

// start server
github.listen();

// listen on pull requests
github.on('pull_request', function(repo, ref, data) {

  // set status to pending
  pending(data.pull_request.statuses_url);

  // start timer / dummy tests
  setTimeout(function() {

    // set status to success
    success(data.pull_request.statuses_url);
  }, 1000 * 30);
});



/**
 * Send response to statuses api
 */
function response(url, state, description) {
  console.log('sending: ' + state);
  request({
    url: url + '?access_token=' + config.token,
    headers: {
      'User-Agent': 'HBM-Team'
    },
    method: 'POST',
    json: {
      state: state,
      target_url: 'http://xkcd.com/' + getRandomInt(1, XKCD_MAX),
      description: description,
      context: 'ci/maja'
    }
  }, function(err, res, body) {
    if (err) {
      console.log(err);
    }
    if (res.statusCode !== 201) {
      console.log(res);
      console.log(body);
    }
  });
}

function success(url) {
  return response(url, 'success', 'I\'m done');
}

function pending(url) {
  return response(url, 'pending', 'I\'ll start working right away');
}

function error(url) {
  return response(url, 'error', 'I could not finish the job');
}

function failure(url) {
  return response(url, 'failure', 'I could not finish the job');
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
