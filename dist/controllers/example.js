"use strict";
/**
 * Example controller that provides a healthcheck endpoint
 */
var Example;
(function (Example) {
    'use strict';
    /*
     * Return an empty 200 response
     */
    function healthCheck(req, res) {
        console.log("s");
        res.end();
    }
    Example.healthCheck = healthCheck;
})(Example || (Example = {}));
module.exports = Example;
