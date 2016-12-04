'use strict';
// Load environment variables from file if present
var dotenv = require('dotenv');
dotenv.config({
    silent: true,
    path: 'src/.env'
});
// Boot server
var debug = require('debug');
var app_1 = require('./app');
var port = process.env.PORT || 3000;
app_1.default.set('port', port);
app_1.default.listen(app_1.default.get('port'), function () {
    debug('Express server listening on port ' + port);
}).on('error', function (err) {
    console.log('Cannot start server, port most likely in use');
    console.log(err);
});
