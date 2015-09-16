
var githubhook = require('githubhook');
var github = githubhook();

github.listen();

github.on('*', function (data) {
  console.log('got data');
  console.log(data);
  console.log('on first branch');
});
