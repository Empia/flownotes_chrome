"use strict";
// Error handler service
var ErrorHandler;
(function (ErrorHandler) {
    'use strict';
    /**
     * Generates a 500 response
     */
    let handler = (err, req, res, next, includeStackTrace) => {
        res.status(res.statusCode || 500);
        res.render('error', {
            message: err.message,
            error: includeStackTrace ? err : {}
        });
    };
    /**
     * 500 error development response
     */
    function development(err, req, res, next) {
        return handler(err, req, res, next, true);
    }
    ErrorHandler.development = development;
    ;
    /**
     * 500 error production response
     */
    function production(err, req, res, next) {
        return handler(err, req, res, next, false);
    }
    ErrorHandler.production = production;
    ;
})(ErrorHandler || (ErrorHandler = {}));
module.exports = ErrorHandler;
