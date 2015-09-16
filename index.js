
var request = require('request');
var githubhook = require('githubhook');
var github = githubhook();


var TOKEN = 'd7124096a9fd5f39ac31f6c85bd0efb5f5cb4640';
var XKCD_MAX = 1578;



github.listen();

github.on('pull_request', function(repo, ref, data) {

  // set status to pending
  pending(data.pull_request.statuses_url, function(err, err, body) {
    if (err) {
      console.log(err);
    }
    console.log('pending');
    console.log(body);
  });

  // start timer / dummy tests
  setTimeout(function() {

    // set status to success
    success(data.pull_request.statuses_url, function(err) {
      if (err) {
        console.log(err);
      }
      console.log('success');
    });
  }, 1000 * 30);
});

function response(url, state, description, done) {
  request({
    url: url + '?access_token=' + TOKEN,
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
  }, done);
}

function success(url, done) {
  return response(url, 'succes', 'I\'m done', done);
}

function pending(url, done) {
  return response(url, 'pending', 'I\'ll start working right away', done);
}

function error(url, done) {
  return response(url, 'error', 'I could not finish the job', done);
}

function failure(url, done) {
  return response(url, 'failure', 'I could not finish the job', done);
}


/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
