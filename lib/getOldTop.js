(function () {
  "use strict";
  var moment = require('moment')
    , request = require('request')
    , jsdom = require('jsdom')
    , async = require('async')
    ;

  function getOldTop(cb) {
    var today = moment()
      , currentDate = moment('2010-07-11') // First day of hn archives
      , dates = [moment(currentDate)]
      , allPosts = []
      ;

    while (currentDate.format('YYYY-MM') < today.format('YYYY-MM')) {
      currentDate = currentDate.add('months', '1');
      dates.push(moment(currentDate));
    }
    dates.pop();

    // UGGGH SO UGLY
    async.forEach(dates, function (date, done) {
        getPostsForMonth(date, function (err, posts) {
          if (err) {
            throw err;
          }

          allPosts = allPosts.concat(posts);
          done();
        });
      },
      function (err) {
        if (err) {
          throw err;
        }

        cb(null, allPosts);
    });
  }

  function getPostsForMonth(momentDate, cb) {
    var hnArchivesUrl = 'http://www.daemonology.net/hn-daily/' + momentDate.format('YYYY-MM') + '.html'
      ;
    jsdom.env({
        html: hnArchivesUrl
      , scripts: ['http://code.jquery.com/jquery-1.7.min.js']
      , done: function(errors, window) {
        var $ = window.$
          , stories
          , parsedStories = []
          ;

        if (window.document.title == '404 Not Found') {
          return cb(new Error('error getting top HN page. url is ' + hnArchivesUrl + '. Are you sure it is valid?'));
        }

        if (errors) {
          return cb(errors);
        }

        stories = $('div.content li');
        stories.each(function (storyIndex, story) {
          var parsedStory = {}
            , $story = $(story)
            ;
          parsedStory.title = $story.find('.storylink').text();
          parsedStory.url = $story.find('.storylink a').attr('href');
          parsedStory.submittedBy = 'unknown';
          parsedStory.hnLink = $story.find('.commentlink a').attr('href');
          parsedStory.hnId = parsedStory.hnLink.split('=')[1];
          parsedStories.push(parsedStory);
        });
        return cb(null, parsedStories);
      }
    });
  }

  module.exports = getOldTop;
}());
