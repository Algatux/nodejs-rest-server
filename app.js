var express = require('express');
var http = require('http');
var path = require('path');

app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('sqlite_db_name',"./storage/database.db");
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// MODULES
require('./routes/index')(app);
require('./routes/clients')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('# ipRestSrv listening on port ' + app.get('port'));
});

process.on('SIGINT',function(){
    console.log('# Received SIGINT Signal, terminating process ...');
    process.exit(0);
});

process.on('SIGTERM',function(){
    console.log('# Received SIGTERM Signal, process ending ...');
    process.exit(0);
});
