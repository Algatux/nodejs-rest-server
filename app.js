
var express = require('express');
var http = require('http');
var path = require('path');
var sqlite3 = require('sqlite3');

db = null;
app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
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

db = new sqlite3.Database("./storage/database.db");
console.log('# Database Opened');

// MODULES
require('./routes/index')(app,db);
require('./routes/clients')(app,db);

http.createServer(app).listen(app.get('port'), function(){
  console.log('# ipRestSrv listening on port ' + app.get('port'));
});

function closeDatabase(){
    if(db!==null){
        db.close();
        console.log('# Database connection closed');
    }
}

process.on('SIGINT',function(){
    console.log('# Received SIGINT Signal, terminating process ...');
    closeDatabase();
    process.exit(0);
});

process.on('SIGTERM',function(){
    console.log('# Received SIGTERM Signal, process ending ...');
    closeDatabase();
    process.exit(0);
});
