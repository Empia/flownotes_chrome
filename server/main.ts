/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
import {IRoute, Express, Router} from 'express';
import items from './routes/items';
import {default as startup} from './appstart';

require('./database');
//require('css-modules-require-hook/preset');

let bodyParser = require('body-parser');
let express:any = require('express');	
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var router:Router = express.Router(); 

app.use('/api', router);

/*
app.get('*', function(request, response){
  response.sendfile('./public/index.html');
});
*/

app.get('/page/:pageId', startup)
  .use((<any>express).static(__dirname + '/../.tmp'))

app.get('/', startup)
  .use((<any>express).static(__dirname + '/../.tmp'))


app.listen(7777);
	
items(router);