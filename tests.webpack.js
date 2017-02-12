var context = require.context('./app', true, /-test\.jsx$/);
context.keys().forEach(context);
/*
var context2 = require.context('./app', true, /-test\.tsx$/);
context2.keys().forEach(context2);
*/