### Mongo, Express, React, Node, Typescript

##Usage Instructions

###To run the app,

 - Install global dependencies with `npm install -g gulp bower react-tools browserify typescript`
 - Install dependencies with `npm install`; `bower install`
 - Install MongoDB and start the server using the command `mongod` or by `service mongodb start`
 - Define mongodb credentials `nano server/database.ts`
 - Make mongodb migration `mongorestore --db flownotes collections/flownotes/*`
 - Install typings with `tsd install` (If this does not work use tsd reinstall)
 - Run app with `gulp serve`

