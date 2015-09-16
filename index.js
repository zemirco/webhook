
var request = require('request');
var githubhook = require('githubhook');
var github = githubhook();



var XKCD_MAX = 1578;



github.listen();

github.on('pull_request', function(repo, ref, data) {
  console.log('start####################');
  console.log(repo);
  console.log(ref);
  console.log(data);
  console.log('start####################');

  // set status to pending
  pending(data.pull_request.statuses_url, function(err) {
    if (err) {
      console.log(err);
    }
  });

  // start timer / dummy tests
  setTimeout(function() {

    // set status to success
    success(data.pull_request.statuses_url, function(err, res, body) {
      if (err) {
        console.log(err);
      }
      console.log(res);
      console.log(body);
    });
  }, 1000 * 30);
});



function response(url, state, done) {
  request({
    url: url,
    headers: {
      'User-Agent': 'HBM-Team'
    },
    method: 'POST',
    json: {
      state: state,
      target_url: 'http://xkcd.com/' + getRandomInt(1, XKCD_MAX),
      description: 'The build succeeded!',
      context: 'continuous-integration/maja'
    }
  }, done);
}

function success(url, done) {
  return response(url, 'success', done);
}

function pending(url, done) {
  return response(url, 'pending', done);
}

function error(url, done) {
  return response(url, 'error', done);
}

function failure(url, done) {
  return response(url, 'failure', done);
}


/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
