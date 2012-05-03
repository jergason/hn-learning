(function () {
  "use strict";
  var config = require('../config')
    , mongoose = require('mongoose')
    , PostSchema = require('./Post')
    , getOldPosts = require('./getOldTop')
    , addPostsToDb = require('./addPostsToDb')
    ;

  // TODO: why does this just hang?
  function addTopToDb() {
    getOldPosts(function (err, posts) {
      addPostsToDb(posts, function(err) {
        console.log('done!');
      });
    });
    //var Post
      //;

    //mongoose.connect(config.db);
    //Post = mongoose.model('Post', PostSchema);
    //getOldPosts(function (err, posts) {
      //var length = posts.length
        //;
      //if (err) {
        //console.log('uh oh, error!');
        //return err;
      //}
      //posts.forEach(function (post, i) {
        //var newPost = new Post(post)
          //;
        //Post.findOne({ "hnId": post.hnId}, function (err, p) {
          //// TODO: check if it exists
          //console.log('On post ' + i + ' of ' + length);
          //if (!p) {
            //newPost.save();
          //}
        //});
      //});
    //});
  }

  addTopToDb();
}());
