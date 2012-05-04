(function () {
  "use strict";
  desc('Wipe out the model, and retrain it from all rated items in the database.');
  task('retrain', function () {
    var model = require('./lib/model')
      , mongoose = require('mongoose')
      , config = require('./config')
      , db = mongoose.createConnection(config.db)
      , Post = require('./lib/Post')(db)
      ;

    function trainModel(m) {
      return function (post) {
        m.trainModel(post, (post.liked) ? 'like' : 'dislike');
      }
    }

    model.createModel();
    Post.find({ rated: true }, function (err, posts) {
      posts.forEach(trainModel(model));
      model.saveModel();
      console.log('saved the model!');
      db.close();
      complete();
    });
  }, {async: true});


  desc('Add the past few years of posts from HNArchive to the DB if they are not already there.');
  task('load_from_hnarchive', function () {
    var getHNArchivePosts = require('./lib/getOldTop')
      , addPostsToDb = require('./lib/addPostsToDb')
      ;
      getOldPosts(function (err, posts) {
        addPostsToDb(posts, function(er1) {
          console.log('done!');
          complete();
        });
      });
  }, {async: true});

  desc('Reset the random numbers on each post.');
  task('randomize_posts', function () {
    var mongoose = require('mongoose')
      , async = require('async')
      , config = require('./config')
      , db = mongoose.createConnection(config.db)
      , Post = require('./lib/Post')(db)

    function doneWithAsync(err) {
      console.log('done!');
      db.close();
      complete();
    }

    function asyncRerandomizePost(post, done) {
      post.random = Math.random();
      post.save(function () {
        done();
      });
    }

    Post.find({}, function (err, posts) {
      async.forEach(posts, asyncRerandomizePost, doneWithAsync);
    });
  }, {async: true});
}());
