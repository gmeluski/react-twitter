var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');
var mongoose = require('mongoose');
var twitter = require('twitter');

var routes = require('./routes');
var config = require('./config');
var streamHandler = require('./utils/streamHandler');

var app = express();
var port = process.env.PORT || 8080;

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var twit, server, io;

app.disable('etag');
mongoose.connect('mongodb://localhost/react-tweets');

twit = new twitter(config.twitter);

app.get('/', routes.index);
app.get('/page/:page/:skip', routes.page);
app.use('/', express.static(__dirname + '/public'));

server = http.createServer(app).listen(port, function () {
  console.log('express listening on port ' + port);
});

io = require('socket.io').listen(server);

twit.stream('statuses/filter', {track: 'scotch_io, #scotchio'}, function (stream) {
  streamHandler(stream, io);
});
