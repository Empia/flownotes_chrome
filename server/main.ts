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
let app = express();
var server = http.createServer(app);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
app.get('/login', startup)
  .use((<any>express).static(__dirname + '/../.tmp'))

app.get('/page/:pageId', startup)
  .use((<any>express).static(__dirname + '/../.tmp'))
app.get('/', startup)
  .use((<any>express).static(__dirname + '/../.tmp'))


server.on('upgrade', handleUpgrade(app, wss));

server.listen(7777);
	
general_routes(router);
