import {Response} from 'express';
import {FlowNoteContent, IFlowNoteContent} from '../models/FlowNoteContent';
var MetaInspector = require('node-metainspector');

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
    // Init content
    var client = new MetaInspector(flowNoteContent.content_value, { timeout: 15000 });


    client.on("fetch", () => {
          flowNoteContent['title'] = client.title;
          flowNoteContent['states'] = [{
            name: 'initiated',
            ison: true,
            ison_rate: 100                
          }];
          flowNoteContent['order'] = 0;         
        flowNoteContent.save((err, data:IFlowNoteContent) => {
            //let initiated = this.initiateContent(data);
            res.status(200).send(data);
        })
    });
    client.on("error", (err) => console.log(err));
    client.fetch();
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
  
  updateOrder(req, res:Response){
    let order = req.body.order
    FlowNoteContent.findOne({_id:req.body._id}, (err, doc) => {
      doc['order'] = req.body['order'];
      // update order of others in this page
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


  /*  PRIVATE ***/
  initiateContent(d) {
    console.log('prepare to init ', d);
    let result = d;
    return result;
  } 
  
}

let flowNoteContentService = new FlowNoteContentService();  

export {flowNoteContentService, FlowNoteContentService };
