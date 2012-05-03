(function () {
  "use strict";
  var mongoose = require('mongoose')
    , PostSchema
    , Post
    ;

  PostSchema = new mongoose.Schema({
      title: String
    , url: String
    , submittedBy: String
    , hnLink: String
    , hnId: { type: Number, index: true }
    , rated: { type: Boolean, default: false }
  });


  Post = mongoose.model('Post', PostSchema);

  module.exports = Post;
}());
