// Using Jasmine together w/ supertest
// https://github.com/jasmine/jasmine-npm/issues/31
"use strict";
var request = require('supertest');
var app_1 = require('./../../app');
describe('Jasmine: Example routes', function () {
    it('should get 200 response from healthCheck', function (done) {
        request(app_1.default)
            .get('/')
            .expect(200)
            .end(function (err, res) {
            if (err) {
                done.fail(err);
            }
            else {
                done();
            }
        });
    });
    it('should get 404 from unknown route', function (done) {
        request(app_1.default)
            .get('/asodkoasd9923942ik3koadskoaksda9isd')
            .expect(404)
            .end(function (err, res) {
            if (err) {
                done.fail(err);
            }
            else {
                done();
            }
        });
    });
});
