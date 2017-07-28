/// <reference types="node" />
/// <reference path="../typings/globals/express/index.d.ts" />
import {IRoute, Express, Router} from 'express';
import general_routes from './routes/general';
import {default as startup} from './appstart';
//var expressWs = require('express-ws')
var ws = require('ws');
var handleUpgrade = require('express-websocket');
var http = require('http');
require('./database');
//require('css-modules-require-hook/preset');
var wss = new ws.Server({ noServer: true });
let bodyParser = require('body-parser');
let express:any = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
import {authService} from './services/AuthService';
import {Accounts} from './models/Account';
import chatBot from './bot';
import {Mongoose, connect, connection} from "mongoose";



var pino = require('pino')()


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
pino.info('hello world')
pino.error('this is at error level')
pino.info('the answer is %d', 42)
pino.info({ obj: 42 }, 'hello world')
pino.info({ obj: 42, b: 2 }, 'hello world')
pino.info({ obj: { aa: 'bbb' } }, 'another')
setImmediate(function () {
  pino.info('after setImmediate')
})
pino.error(new Error('an error'))
var child = pino.child({ a: 'property' })
//child.info('hello child!')
var childsChild = child.child({ another: 'property' })
//childsChild.info('hello baby..')
*/


passport.use('jwt',new JwtStrategy(authService.confOpts, function(jwt_payload, done) {
  console.log('jwt_payload', jwt_payload);
    //var user = users[payload.id] || null;
        Accounts.find({_id: jwt_payload.id}, function(err, user) {
          console.log('user', err, user, done);
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }        
        });
}));

passport.use('local', new Strategy(
  function(username, password, cb) {
    authService.findByUsername(username, function(err, user) {
      console.log('local user', err, user);      
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
}));


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  authService.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


let app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
///////////////////////////////////////////
//app.use(require('cookie-parser')());
//app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
//pp.use(passport.session());


var router:Router = express.Router(); 

app.use('/api', router);



////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/websocket', function (req, res, next) {
  res.websocket(function (ws) {
    // Optional callback
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
      ws.send(message);
      ws.send('message');

    });
    ws.send('hello');
  });
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send(message);
    wss.clients.forEach(function each(client) {
      if (client !== ws) client.send(message);
    });
    
  });
  ws.send('something');
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};
/*
app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});
app.ws('/socket', function(ws, req) {
  ws.on('message', function(msg) {
    console.log('incoming request', msg);
  });
  console.log('socket', req.testing);
});
*/

/*
app.get('*', function(request, response){
  response.sendfile('./public/index.html');
});
*/

/* Static routes for JS */
app.get('/about', startup)
  .use((<any>express).static(__dirname + '/../.tmp'))
app.get('/modes', startup)
  .use((<any>express).static(__dirname + '/../.tmp'))
app.get('/tagger', startup)
  .use((<any>express).static(__dirname + '/../.tmp'))
app.get('/login', startup)
  .use((<any>express).static(__dirname + '/../.tmp'))
app.get('/signup', startup)
  .use((<any>express).static(__dirname + '/../.tmp'))


app.get('/page/:pageId', startup)
  .use((<any>express).static(__dirname + '/../.tmp'))
app.get('/', startup)
  .use((<any>express).static(__dirname + '/../.tmp'))




if (cluster.isMaster) {


  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    if (i === 0) { // run bot
      chatBot.initiate()
    }
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case its a HTTP server
  var server = http.createServer(app);
  server.on('upgrade', handleUpgrade(app, wss));
  server.listen(7777);
}

process.on('SIGINT', function() {  
  connection.close(function () { 
    console.log('Mongoose default connection disconnected through app      termination'); 
    process.exit(0); 
  }); 
}); 
	
general_routes(router);
