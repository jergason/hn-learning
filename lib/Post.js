(function () {
  "use strict";
  var mongoose = require('mongoose')
    , PostSchema
    ;

  PostSchema = new mongoose.Schema({
      title: String
    , submittedBy: String
    , url: String
    , hnLink: String
    , hnId: { type: Number, index: true }
    , rated: { type: Boolean, default: false }
  });

  module.exports = PostSchema;
}());
