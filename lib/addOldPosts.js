(function () {
  "use strict";
  var getOldPosts = require('./getOldTop')
    , addPostsToDb = require('./addPostsToDb')
    ;

  // TODO: why does this just hang?
  function addTopToDb() {
    getOldPosts(function (err, posts) {
      addPostsToDb(posts, function(err) {
        console.log('done!');
      });
    });
  }

  addTopToDb();
}());
