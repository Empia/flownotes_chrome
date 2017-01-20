import {Response} from 'express';
import {UserModes, IUserModes} from '../../models/UserModes';
import q from 'q';

class UserModesService {
  constructor(){}

  getList(req, res:Response){
    return UserModes.find((err, data) => res.send(data));
  }
  add(req, res:Response){
    let userMode = new UserModes(req.body);
    console.log('req.body', req.body);
    userMode.save((err, data:IUserModes) => 
        res.status(200).send(data._id));
  }
  update(req, res:Response){
    console.log('update', req.body.title);
    UserModes.findOne({_id:req.body._id}, (err, doc) => {      
      if (doc) {
        for(let key in req.body){
          console.log('key', key, req.body[key]);
          console.log('k', doc[key]);
          doc[key] = req.body[key];
        }
        doc.save();
        res.status(200).send({status: 'updated', modeId: req.body._id});
      }
      else {
        res.status(200).send({status: 'error', reason: 'not found', modeId: req.body._id});
      }
    });
  }
  remove(req, res:Response){
    UserModes.findOne({ _id: req.params.modeId})
    .remove((err, doc) => {
        res.status(202).send(null);
      });
  }
  
}


let userModesService = new UserModesService();  

export {userModesService, UserModesService };