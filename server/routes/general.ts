import {IRoute, Express, Application, Router} from 'express';
import {flowNotePageService} from '../services/FlowNotePageService';
import {flowNoteContentService} from '../services/FlowNoteContentService';
import {migrateService} from '../services/MigrateService';
import * as passport from 'passport';
import {authService} from '../services/AuthService';
var jwt = require("jwt-simple");

export default function (router:Router){
	router
		.get('/pages', flowNotePageService.getList)
		.post('/pages', flowNotePageService.add)
		.delete('/pages/:id', flowNotePageService.remove)
	  .patch('/pages/:id', flowNotePageService.update)
    .get('/content/page/:pageId', flowNoteContentService.getList)
    .post('/content/page/:pageId', flowNoteContentService.add)
    .post('/content/bulk/page/:pageId', flowNoteContentService.addBulk)

    .delete('/content/:id', flowNoteContentService.remove)
    .patch('/content/:id', flowNoteContentService.update)
    .patch('/content/order/:id', flowNoteContentService.updateOrder)
    
    .get('/migrate', migrateService.apply)

    .get('/profile', passport.authenticate("jwt", {session: false}),
      function(req, res){
        res.send({ user: req.user });
    })    
    .post('/login', passport.authenticate('local', { session: false}), function(req, res) {res.redirect('/api/profile')})
    .post("/token", function(req, res) {  
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;


    authService.findByUsername(email, function(err, user) {
      if (err) { return res.sendStatus(401); }
      if (!user) { return res.sendStatus(401) }
      if (user.password != password) { return res.sendStatus(401) }
        var payload = {
            id: user.id,
            aud: 'localhost'
        };
        var token = jwt.encode(payload, authService.confOpts.secretOrKey);
        console.log('encode', payload, authService.confOpts.secretOrKey);
        return res.json({
            token: 'JWT '+ token
        });      
    });
    } else { return res.sendStatus(401) }
}) 
    .get('/logout', function(req, res){
                                          req.logout();
                                          res.redirect('/');
                                        })


}

