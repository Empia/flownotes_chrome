### Flownotes
![Status](https://travis-ci.org/Empia/flownotes_chrome.svg?branch=master)

##Usage Instructions

###To run the app,

 - Install global dependencies with `npm install -g gulp bower react-tools browserify typescript`
 - Install dependencies with `npm install`; `bower install`
 - Install MongoDB and start the server using the command `mongod` or by `service mongodb start`
 - Define mongodb credentials `nano server/database.ts`
 - Make mongodb migration `mongorestore --db flownotes collections/flownotes/*`
 - Install typings with `typings install` (If this does not work use typings reinstall)
 - Run app with `gulp serve`

