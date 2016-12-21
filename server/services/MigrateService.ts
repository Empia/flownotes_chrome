import {Response} from 'express';
import {FlowNotePage, IFlowNotePage} from '../models/FlowNotePage';

class MigrateService{
  constructor(){}
  apply(req, res:Response){
    return FlowNotePage.find((err, data) => res.send(data));
  }
}

let migrateService = new MigrateService();  

export {migrateService, MigrateService };
