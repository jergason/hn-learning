(function () {
  /*
   * Wrapper around the naive bayes classifier.
   * Handles turning the data into a format that we
   * like, loading it, saving it, etc.
   */
  "use strict";
  var Credulous = require('credulous')
    , fs = require('fs')
    , url = require('url')
    , model
    , modelPath = __dirname + '/../model/model.json'
    , modelWrapper
    ;

  function getDomainName(urlString) {
    return url.parse(urlString).host;
  }

  modelWrapper = {
    modelPath: modelPath,

    loadModel: function() {
      modelJSON = fs.readFileSync(modelPath, 'utf8');
      // Just some dummy stuff so we can load the real thing.
      model = new Credulous({labels: ['1','2','3']});
      model.fromJSON(JSON.parse(modelJSON));
    },

    saveModel: function() {
      var modelJSON = model.toJSON();
      fs.writeFileSync(modelPath, JSON.stringify(modelJSON), 'utf8');
    },

    createModel: function() {
      model = new Credulous({labels: ['like', 'dislike'], dataLength: 3});
    },

    /*
     * Train the model based on three criteria:
     * 1. The contents of the title.
     * 2. The username of the submitter.
     * 3. The domain name of the submission.
     */
    trainModel: function(post, label) {
      var domainName = getDomainName(post.url)
        ;
      model.train(post.title, post.submittedBy, domainName, label);
    },

    classifyPost: function(post) {
      var domainName = getDomainName(post.url)
        ;

      return model.classify(post.title, post.submittedBy, domainName);
    }
  }

  module.exports = modelWrapper;
}());
