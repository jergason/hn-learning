(function () {
  "use strict";
  var model = require('./model')
    , getNewPosts = require('./getNewPosts')
    , fs = require('fs')
    ;

  /**
   * Use the trained model to classify some
   * posts from the "new" page of HN.
   */
  function recommendNewPosts() {
    model.loadModel();
    getNewPosts(function (err, posts) {
      var label
        ;
      posts.forEach(function (post) {
        label = model.classifyPost(post);
        if (label == 'like') {
          console.log(post);
        }
      });
    });
  }

  function testClassify() {

    var data = JSON.parse(fs.readFileSync(__dirname+'/../sample-new.json', 'utf8'))
      ;
    model.loadModel();
    data.items.forEach(function (post) {
      var parsedPost = {}
        , label
        ;
      parsedPost.title = post.title;
      parsedPost.url = post.url;
      parsedPost.submittedBy = post.postedBy;

      label = model.classifyPost(parsedPost);
      if (label == 'like') {
        console.log('liked post:');
        console.log(parsedPost);
      }
    });
    model.loadModel();
  }

  //recommendNewPosts();
  testClassify();

  module.exports = recommendNewPosts;
}());
