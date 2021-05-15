var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

const AWSLexServiceClientV3 = require('./lex-client-v3');
const AWSLexServiceClientV2 = require('./lex-client-v2');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// V2 Client calling router
app.post('/v2/send', async (req, res, next) => {
  try {
    const { text } = req.body;

    const awsLexServiceClient = new AWSLexServiceClientV2();
    const response = await awsLexServiceClient.postMessage(text);
    
    console.log(response);
    res.send({ messages: response.messages });
  } catch (ex) {
    res.status(500).send({'Error': ex.message || 'This is definetly session timeout'});
  }
});


// V3 Client calling router
app.post('/v3/send', async (req, res, next) => {
  try {
    const { text } = req.body;

    const awsLexServiceClient = new AWSLexServiceClientV3();
    const response = await awsLexServiceClient.postMessage(text);
    
    console.log(response);
    res.send({ messages: response.messages });
  } catch (ex) {
    res.status(500).send({'Error': ex.message || 'This is definetly session timeout'});
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({error: err.message});
});

module.exports = app;
