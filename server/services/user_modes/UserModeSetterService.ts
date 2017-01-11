import {Response} from 'express';
import {UserModeSets, IUserModeSets} from '../../models/UserModeSet';
import {UserModes, IUserModes} from '../../models/UserModes';

import q from 'q';

class UserModeSetterService {
    constructor(){}

    

  setMode(req, res:Response){
    console.log('update', req.body.title);
    // find user
    // find mode
    UserModes.findOne({ _id: req.params.id})
    // add mode & save
    
    res.status(202).send(null);
  }

}



let userModeSetterService = new UserModeSetterService();  

export {userModeSetterService, UserModeSetterService };