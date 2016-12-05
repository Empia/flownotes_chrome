'use strict';
// Load environment variables from file if present
const dotenv = require('dotenv');
//import methodOverride = require('method-override');
dotenv.config({
    silent: true,
    path: 'src/.env'
});
const app_1 = require('./app');
const port = process.env.PORT || 3000;
app_1.default.set('port', port);
app_1.default.listen(app_1.default.get('port'), () => {
    console.log('Express server listening on port ' + port);
}).on('error', err => {
    console.log('Cannot start server, port most likely in use');
    console.log(err);
});
