(function () {
  "use strict";
  var config = require('../config')
    , mongoose = require('mongoose')
    , Post = require('./Post')
    , async = require('async')
    ;

  function addPostsToDatabase(posts, cb) {
    mongoose.connect(config.db);
    async.forEach(posts, function (post, done) {
      var newPost = new Post(post)
        ;
      Post.findOne({ "hnId": post.hnId}, function (err, p) {
        if (p) {
          console.log('p is ', p);
          return done();
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
