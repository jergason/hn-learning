(function () {
  "use strict";
  /**
   * Module dependencies.
   */

  var express = require('express')
    , app
    , crossDomain
    , fs = require('fs')
    ;

  app = module.exports = express.createServer();

  // Allow cross-domain requests
  crossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }

  // Configuration

  app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(crossDomain);
    app.use(express.static(__dirname + '/public'));
  });

  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

  function getModel(req, res, next) {
    var modelJSON = JSON.parse(fs.readFileSync('./model/model.json', 'utf8'))
      , model = require('./lib/model')
      ;

    res.header('Access-Control-Allow-Origin', '*');
    res.json(modelJSON);
  }

  // Routes
  app.get('/model', getModel);

  app.listen(3000, function(){
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  });
}());
