// Using Jasmine together w/ supertest
// https://github.com/jasmine/jasmine-npm/issues/31
"use strict";
const request = require('supertest');
const app_1 = require('./../../app');
describe('Jasmine: Example routes', () => {
    it('should get 200 response from healthCheck', done => {
        request(app_1.default)
            .get('/')
            .expect(200)
            .end((err, res) => {
            if (err) {
                done.fail(err);
            }
            else {
                done();
            }
        });
    });
    it('should get 404 from unknown route', done => {
        request(app_1.default)
            .get('/asodkoasd9923942ik3koadskoaksda9isd')
            .expect(404)
            .end((err, res) => {
            if (err) {
                done.fail(err);
            }
            else {
                done();
            }
        });
    });
});
