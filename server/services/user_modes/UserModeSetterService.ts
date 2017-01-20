import {Response} from 'express';
import {UserModeSets, IUserModeSets} from '../../models/UserModeSet';
import {UserModes, IUserModes} from '../../models/UserModes';

import q from 'q';

class UserModeSetterService {
    constructor(){}

  getAllSetsMode(req, res:Response){
    console.log('update', req.body.title);
    // find user
    // find mode
    UserModeSets.find({ userId: req.user[0]._id}).then(c =>
      // add mode & save    
        res.status(202).send(c);
    )
  }

  setMode(req, res:Response){
    console.log('update', req.body.title);
    // find user
    // find mode
    UserModeSets.findOne({ _id: req.params.id})
    // add mode & save
    let userModeSet = new UserModeSets(Object.assign(req.body, {userId: req.user[0]._id}));
    console.log('req.body', req.body);
    userModeSet.save((err, data:IUserModeSets) => 
        res.status(200).send(Object.assign(data, {userId: req.user[0]._id })  ));    
    //res.status(202).send({'status': 'good', userId: req.user[0]._id });
  }

  removeSetMode(req, res:Response){
     UserModeSets.findOne({ _id: req.params.modeId})
      .remove((err, doc) => {
          res.status(200).send({status: 'removed'});
      });    
  }
  
}



let userModeSetterService = new UserModeSetterService();  

export {userModeSetterService, UserModeSetterService };