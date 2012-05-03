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
}());
