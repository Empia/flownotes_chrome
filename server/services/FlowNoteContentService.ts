import {Response} from 'express';
import {FlowNoteContent, IFlowNoteContent} from '../models/FlowNoteContent';

class FlowNoteContentService{
  constructor(){}
  
  getList(req, res:Response){
    // pageId
    let pageId = req.params.pageId;
    return FlowNoteContent.find({ inPageId: pageId},(err, data) => res.send(data));
  }
  
  add(req, res:Response){
    // pageId
    let pageId = req.params.id;
    console.log('add page content', pageId);

    let flowNoteContent = new FlowNoteContent(req.body);
    console.log('req.body', req.body);
    flowNoteContent.save((err, data:IFlowNoteContent) => 
        res.status(200).send(data._id));
  }
  
  update(req, res:Response){
    FlowNoteContent.findOne({_id:req.body._id}, (err, doc) => {
      
      for(let key in req.body){
        doc[key] = req.body[key];
      }
      
      doc.save();
      
      res.status(200).send(null);
    });
  }
  
  remove(req, res:Response){
    FlowNoteContent.findOne({ _id: req.params.id})
    .remove((err, doc) => {
        res.status(202).send(null);
      });
  }
  
}

let flowNoteContentService = new FlowNoteContentService();  

export {flowNoteContentService, FlowNoteContentService };
