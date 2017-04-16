import {Response} from 'express';
import {FlowNoteContent, IFlowNoteContent} from '../models/FlowNoteContent';
var MetaInspector = require('node-metainspector');
import q from 'q';
import OrderingService from './OrderingService';
const normalizeUrl = require('normalize-url');
var fetchFavicon = require('@meltwater/fetch-favicon');
 
class FlowNoteContentService{
  constructor(){}
  
  /**
   * Get all list based for specific pageId
   * @method myFunction
   * @param {String} myParam
   */  
  getList(req, res:Response){
    // pageId
    let pageId = req.params.pageId;
    return FlowNoteContent.find({ inPageId: pageId},(err, data) => res.send(data));
  }
   
  addOrderToContent = (flowNoteContent, pageId, flowNoteContentSaveFn, req) => {
    FlowNoteContent.find({ userId: req.user[0]._id, inPageId: pageId},(err, data) => {
        let filteredData = data.filter((c) => c.inPageId === pageId)
        console.log('filteredData', filteredData.length);
        let orderingService = new OrderingService(filteredData);
        let lastOrder:number = orderingService.getLastOrder();
        console.log('last order', lastOrder);
        flowNoteContent['order'] = lastOrder+1;    
        flowNoteContent['userId'] = req.user[0]._id     
        return flowNoteContentSaveFn(flowNoteContent);
    });
  }
  /**
   * Function for adding content
   * @method myFunction
   * @param {String} myParam
   */    
  addContentFn = (pageId, flowNoteContent, res, req) => {
    console.log('main pageId', pageId);
    const saveContentFn = (flowNoteContent) => {
          flowNoteContent.save((err, data:IFlowNoteContent) => {
              //let initiated = this.initiateContent(data);
              console.log('trying to save', data);
              if (res !== undefined && data !== undefined) {
                return res.status(200).send(data);
              } else {
                console.log('err', err);
                return flowNoteContent;
              }
          })      
    };
   // Init content
    if (flowNoteContent.content_type == "Link") {
      var client = new MetaInspector(normalizeUrl(flowNoteContent.content_value), { timeout: 15000 });
      client.on("fetch", () => {
            flowNoteContent['title'] = client.title;
            flowNoteContent['states'] = [{
              name: 'initiated',
              ison: true,
              ison_rate: 100                
            }];       
        console.log('fetch', flowNoteContent.title);
        return this.addOrderToContent(flowNoteContent, pageId, (flowNoteContent) => saveContentFn(flowNoteContent), req);
      });
      client.on("error", (err) => console.log('err',err));
      return client.fetch(); 
    } else {
            flowNoteContent['states'] = [{
              name: 'initiated',
              ison: true,
              ison_rate: 100                
            }];           
      return this.addOrderToContent(flowNoteContent, pageId, (flowNoteContent) => saveContentFn(flowNoteContent), req);
    }    
  };

  /**
   * Add multiple content for pageId
   * @method myFunction
   * @param {String} myParam
   */  
  addBulk(req, res:Response){
   let pageId = req.params.pageId;
   let contents = req.body
    q.all(contents.map((content) => {
        let flowNoteContent = new FlowNoteContent(req.body);
         this.addContentFn(pageId, flowNoteContent, undefined, req);
       })).then(function(data) {
        res.status(200).send(data);
    });
  }
  
  /**
   * Add content
   * @method myFunction
   * @param {String} myParam
   */  
  add = (req, res:Response) => {
    // pageId
    let pageId = req.params.pageId;
    console.log('add page content', pageId);
    let flowNoteContent = new FlowNoteContent(req.body);
    console.log('req.body', req.body);
    this.addContentFn(pageId, flowNoteContent, res, req);
  }


  preview = (req, res:Response) => {
    // pageId
    let flowNoteContent = new FlowNoteContent(req.body);
    this.previewContentFn(flowNoteContent, res, req);
  }
  previewContentFn = (flowNoteContent, res, req) => {
   // Init content
    if (flowNoteContent.content_type == "Link") {
      var client = new MetaInspector(normalizeUrl(flowNoteContent.content_value), { timeout: 15000 });
      client.on("fetch", () => {
            flowNoteContent['title'] = client.title;
            flowNoteContent['states'] = [{
              name: 'initiated',
              ison: true,
              ison_rate: 100                
            }];       
        console.log('fetch', flowNoteContent.title);
        var fetchFavicons = require('@meltwater/fetch-favicon').fetchFavicons
        var favicon = fetchFavicons('flowNoteContent.content_value')
        favicon.then(function(f) {
          console.log(f);
          flowNoteContent.meta = [{key: "favicon", value: f[0]}]
          return res.status(200).send(flowNoteContent);
        });
      });
      client.on("error", (err) => console.log('err',err));
      return client.fetch(); 
    } else {
            flowNoteContent['states'] = [{
              name: 'initiated',
              ison: true,
              ison_rate: 100                
            }];           
      return res.status(200).send(flowNoteContent);
    }    
  };


  
  /**
   * Update content
   * @method myFunction
   * @param {String} myParam
   */  
  update(req, res:Response){
    console.log('update', req.body);
    let contentId = req.params.id;
    FlowNoteContent.findOne({_id: contentId, userId: req.user[0]._id}, (err, doc) => {
      console.log('update doc', doc);
      if (doc.content_type === 'Link' && req.body.content_value !== doc.content_value) {
        var client = new MetaInspector(normalizeUrl(req.body.content_value), { timeout: 15000 });
        client.on("fetch", () => {
              doc['title'] = client.title;
              doc['content_value'] = req.body.content_value;
              doc['states'] = [{
                name: 'initiated',
                ison: true,
                ison_rate: 100                
              }];       
              doc.save();
              res.status(200).send({op: 'updating', status: 'good', fields: ['title', 'content_value']});         
        });
        client.on("error", (err) => console.log('err',err));
        return client.fetch(); 
      } else {
        for(let key in req.body){
          doc[key] = req.body[key];
        }
        doc.save();
        return res.status(200).send({op: 'updating', status: 'good', fields: ['title']});
      }
    });
  }

  /**
   * Update order of content
   * @method myFunction
   * @param {String} myParam
   */    
  updateOrder(req, res:Response){
    let order = req.body.order
    let contentId = req.params.id;
    FlowNoteContent.findOne({_id: contentId, userId: req.user[0]._id}, (err, doc) => {
      doc['order'] = req.body['order'];
      // update order of others in this page
      doc.save();
      res.status(200).send(null);
    });
  }

////////////////////////////////////////////////////////////////
  /**
   * Remove content
   * @method myFunction
   * @param {String} myParam
   */  
  remove(req, res:Response){
    FlowNoteContent.findOne({ _id: req.params.id, userId: req.user[0]._id})
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
