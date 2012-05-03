(function () {
  "use strict";

  var config = require('../config')
    , mongoose = require('mongoose')
    , db = mongoose.createConnection(config.db)
    , Post = require('./Post')(db)
    , currentPost
    , output = process.stdout
    , input = process.stdin
    ;

  input.resume();
  input.setEncoding('utf8');
  input.on('data', processInput);
  output.write('Welcome to the HN Post rater!\nAs you see posts, type "yes" or "no" to like or dislike them.\nType "quit" to exit.\n');
  getNewCurrentPost();

  // print out some instructions
  // get the first result
  // wait for rating
  // get next result
  
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

        output.write(JSON.stringify(m.toJSON()));
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
    if (dat != 'yes' && dat != 'no' && dat != 'quit') {
      output.write('Sorry, input must be either "yes" or "no" for liking or disliking a post, or "quit" to exit.\n');
      return;
    }

    if (dat == 'quit') {
      output.write('See ya later!');
      // TODO: cleanup
      process.exit();
    }

    if (!currentPost) {
      output.write('No post yet. Either you have rated them all, or I\'m still fetching them from the database.');
      return;
    }

    liked = (dat == 'yes');
    console.log("liked is ", liked, "\n\n");

    updateCurrentPostAndFetchNewPost(liked);

    // update current post and save to db
    // set currentPost to null
    // get a new current post
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
