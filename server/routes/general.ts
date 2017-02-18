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
    let auth = passport.authenticate("jwt", {session: false})

	router
	.get('/pages', auth, flowNotePageService.getList)
	.post('/pages', auth, flowNotePageService.add)
	.delete('/pages/:id', auth, flowNotePageService.remove)
    .patch('/pages/:id', auth, flowNotePageService.update)
    .get('/content/page/:pageId', auth, flowNoteContentService.getList)
    .post('/content/page/:pageId', auth, flowNoteContentService.add)
    .post('/content/bulk/page/:pageId', auth, flowNoteContentService.addBulk)

    .delete('/content/:id', auth, flowNoteContentService.remove)
    .patch('/content/:id', auth, flowNoteContentService.update)
    .patch('/content/order/:id', auth, flowNoteContentService.updateOrder)
    

    .get('/user_modes', auth, userModesService.getList)
    .post('/user_modes', auth, userModesService.add)
    .delete('/user_modes/:modeId', auth, userModesService.remove)
    .patch('/user_modes/:modeId', auth, userModesService.update)

    .get('/set_modes/', auth, userModeSetterService.getAllSetsMode)
    .post('/set_mode', auth, userModeSetterService.setMode)
    .delete('/set_mode/:modeId', auth, userModeSetterService.removeSetMode)


    .get('/migrate', migrateService.apply)

    .get('/profile', passport.authenticate("jwt", {session: false}),
        function(req, res){
          let req2:any = req;
          res.send({ user: req2.user });
     })    
    .post('/login', authService.login)
    .post('/signUp', authService.signUp)
    .post('/token', authService.generateToken) 
    .get('/logout', authService.logout)


}

