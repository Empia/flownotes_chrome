"use strict";
var request = require('supertest');
var app_1 = require('./../../app');
describe('Mocha: Example routes', function () {
    it('should get 200 response from healthCheck', function (done) {
        request(app_1.default)
            .get('/')
            .expect(200, done);
    });
    it('should get 404 from unknown route', function (done) {
        request(app_1.default)
            .get('/asodkoasd9923942ik3koadskoaksda9isd')
            .expect(404, done);
    });
});
