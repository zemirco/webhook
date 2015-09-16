
var githubhook = require('githubhook');
var github = githubhook();

github.listen();

github.on('pull_request', function (data) {
  console.log('got data');
  console.log(data);
  console.log('end-------------------');
});
