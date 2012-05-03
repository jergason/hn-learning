(function () {
  "use strict";
  var config = require('../config')
    , mongoose = require('mongoose')
    , PostSchema = require('./Post')
    , async = require('async')
    ;

  function addPostsToDatabase(posts, cb) {
    var Post
      ;

    mongoose.connect(config.db);
    Post = mongoose.model('Post', PostSchema);
    async.forEach(posts, function (post, done) {
      var newPost = new Post(post)
        ;
      Post.findOne({ "hnId": post.hnId}, function (err, p) {
        if (p) {
          done();
        }

        newPost.save(function () {
          done();
        });
      });
    }, function (err) {
      if (err) {
        return cb(err);
      }
      cb();
    });
  }

  module.exports = addPostsToDatabase;
}());
