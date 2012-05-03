(function () {
  "use strict";
  var request = require('request')
    , hnApiUrl = 'http://api.ihackernews.com'
    ;


  function getNewPosts(cb) {
    request.get(hnApiUrl + '/new', function(err, res, body) {
      var posts = JSON.parse(body)
        , parsedPosts = []
        ;
      if (err) {
        return cb(err, null);
      }

      posts.forEach(function (post) {
        parsedPosts.push({
            title: post.title
          , url: post.url
          , submittedBy: post.postedBy
          , hnLink: 'http://news.ycombinator.com/item?id=' + post.id
          , hnId: post.id
        });
      });
      return cb(null, parsedPosts);
    });
  }

  module.exports = getNewPosts;
}());
