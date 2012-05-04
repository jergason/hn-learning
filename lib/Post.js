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
      , liked: Boolean
      , random: { type: Number, default: function () {return Math.random();} }
    });

    return dbConnection.model('Post', PostSchema);
  }

  module.exports = getPosts;
}());
