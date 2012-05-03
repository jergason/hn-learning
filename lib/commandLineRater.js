(function () {
  "use strict";

  var config = require('../config')
    , mongoose = require('mongoose')
    , db = mongoose.createConnection(config.db)
    , Post = require('./Post')(db)
    , currentPost
    , fs = require('fs')
    , output = process.stdout
    , input = process.stdin
    , model = require('./model')
    ;

  setup();

  function setup() {
    //load the model or create if it doesn't exist
    try {
      model.loadModel();
    }
    catch (e) {
      model.createModel();
      model.saveModel();
    }

    input.resume();
    input.setEncoding('utf8');
    input.on('data', processInput);
    output.write('Welcome to the HN Post rater!\nAs you see posts, type "like" or "dislike" to like or dislike them.\nType "quit" to exit.\n');
    getNewCurrentPost();
  }

  function getNewCurrentPost(cb) {
    var randVal = Math.random()
      ;
    if (!cb) {
      cb = function () {};
    }
    Post.findOne({ 'rated': false, 'random': { $gte: randVal }}, function (err, m) {
      Post.findOne({ 'rated': false, 'random': { $lte: randVal }}, function (err2, m2) {
        if (m) {
          currentPost = m;
        }
        else if (m2) {
          currentPost = m2;
        }
        else {
          currentPost = m2;
          return cb(null);
        }

        output.write(JSON.stringify(currentPost.toJSON()));
        output.write('\n\n');
        cb(null, m);
      });
    });
  }

  function processInput(data) {
    var dat
      , liked
      ;
    dat = data.toLowerCase().split(/\s+/)[0].trim();
    if (dat != 'like' && dat != 'dislike' && dat != 'quit') {
      output.write('Sorry, input must be either "like" or "dislike" for liking or disliking a post, or "quit" to exit.\n');
      return;
    }

    if (dat == 'quit') {
      output.write('See ya later!');
      model.saveModel();
      process.exit();
    }

    if (!currentPost) {
      output.write('No post yet. Either you have rated them all, or I\'m still fetching them from the database.');
      return;
    }

    model.trainModel(currentPost, dat);
    liked = (dat == 'like');
    updateCurrentPostAndFetchNewPost(liked);
  }

  function updateCurrentPostAndFetchNewPost(liked) {
    if (!currentPost) {
      throw new Error("no current post!");
    }

    currentPost.liked = liked;
    currentPost.rated = true;
    currentPost.save(function (err) {
      currentPost = null;
    });

    getNewCurrentPost(function (err) {
      if (err) {
        throw err;
      }
    });
  }

}());
