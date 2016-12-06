'use strict';

// Test routes
import { Router } from 'express';
import { healthCheck } from '../controllers/example';
var path = require('path');
var mongoose = require('mongoose');
var express = require('express');


let router = Router();
//router.get('/', healthCheck);

router.use(express.static('client_dist'));

router.get('/', function(req, res, next) {
  // res.sendFile(path.join(__dirname, '../', 'client', 'index.html'));
  res.sendFile(path.join(__dirname, '../../', 'client_dist', 'index.html'));
});


var db = {
  url : 'mongodb://localhost/flownotes'
}
mongoose.connect(db.url);

var FlowNotesPage = mongoose.model('FNPage', {
    name : {type : String, default: ''}
});

router.get('/api/pages/', function(req, res) {
          // use mongoose to get all nerds in the database
          FlowNotesPage.find(function(err, pages) {
              console.log(pages);
              // if there is an error retrieving, send the error. 
                              // nothing after res.send(err) will execute
              if (err)
                  res.send(err);

              res.json(pages); // return all nerds in JSON format
          });
});

router.post('/api/pages', async (req, res) => {

  let data = req.body;
  const post = await FlowNotesPage.create(data);
  res.json(post)

});

router.put('/api/pages/:id', function(req, res) {
  let query = { _id: req.params.id }
  console.log(query);
  FlowNotesPage.find(query, function(err, r) {
    console.log(r);
  });

  FlowNotesPage.findOneAndUpdate(query, req.body, {upsert:false}, function(err, doc){
      if (err) return res.send(500, { error: err });
      return res.send("succesfully saved");
  });
});


router.delete('/api/pages/:id', function(req, res) {
  let query = { id: req.params.id }
  FlowNotesPage.remove({ _id: query.id }, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});



export = router;
