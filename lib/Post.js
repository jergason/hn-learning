(function () {
  "use strict";
  var mongoose = require('mongoose')
    ;

  function getPosts(dbConnection) {
    var PostSchema = new mongoose.Schema({
        title: String
      , url: String
      , submittedBy: String
      , hnLink: String
      , hnId: { type: Number, index: true }
      , rated: { type: Boolean, default: false }
    })

    return dbConnection.model('Post', PostSchema);
  }

  module.exports = getPosts;
}());
