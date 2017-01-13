import {IRoute, Express, Application, Router} from 'express';
import {flowNotePageService} from '../services/FlowNotePageService';
import {flowNoteContentService} from '../services/FlowNoteContentService';
import {userModesService} from '../services/user_modes/UserModesService';
import {userModeSetterService} from '../services/user_modes/UserModeSetterService';

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
    

    .get('/user_modes', userModesService.getList)
    .post('/user_modes', userModesService.add)
    .delete('/user_modes/:modeId', userModesService.remove)
    .patch('/user_modes/:modeId', userModesService.update)

    .post('/set_mode/:modeId', userModeSetterService.setMode)


    .get('/migrate', migrateService.apply)

    .get('/profile', passport.authenticate("jwt", {session: false}),
        function(req, res){
          res.send({ user: req.user });
  })    
    .post('/login', authService.login)
    .post('/signUp', authService.signUp)
    .post('/token', authService.generateToken) 
    .get('/logout', authService.logout)


}

