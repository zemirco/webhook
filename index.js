
var githubhook = require('githubhook');
var github = githubhook();

github.listen();

github.on('pull_request', function(repo, ref, data) {
  console.log('start####################');
  console.log(repo);
  console.log(ref);
  console.log(data);
  console.log('end-------------------');
});
