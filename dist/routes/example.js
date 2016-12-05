'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
// Test routes
const express_1 = require('express');
const example_1 = require('../controllers/example');
var mongoose = require('mongoose');
let router = express_1.Router();
router.get('/', example_1.healthCheck);
var db = {
    url: 'mongodb://localhost/flownotes'
};
mongoose.connect(db.url);
var FlowNotesPage = mongoose.model('FNPage', {
    name: { type: String, default: '' }
});
router.get('/api/pages/', function (req, res) {
    // use mongoose to get all nerds in the database
    FlowNotesPage.find(function (err, pages) {
        console.log(pages);
        // if there is an error retrieving, send the error. 
        // nothing after res.send(err) will execute
        if (err)
            res.send(err);
        res.json(pages); // return all nerds in JSON format
    });
});
router.post('/api/pages', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let data = req.body;
    const post = yield FlowNotesPage.create(data);
    res.json(post);
}));
router.put('/api/pages/:id', function (req, res) {
    let query = { _id: req.params.id };
    console.log(query);
    FlowNotesPage.find(query, function (err, r) {
        console.log(r);
    });
    FlowNotesPage.findOneAndUpdate(query, req.body, { upsert: false }, function (err, doc) {
        if (err)
            return res.send(500, { error: err });
        return res.send("succesfully saved");
    });
});
router.delete('/api/pages/:id', function (req, res) {
    let query = { id: req.params.id };
    FlowNotesPage.remove({ _id: query.id }, function (err, result) {
        if (err) {
            res.send(err);
        }
        res.send(result);
    });
});
module.exports = router;
