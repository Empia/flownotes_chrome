import {Response} from 'express';
import {FlowNotePage, IFlowNotePage} from '../models/FlowNotePage';

class FlowNotePageService{
	constructor(){}
	
	getList(req, res:Response){
		return FlowNotePage.find((err, data) => res.send(data));
	}
	
	add(req, res:Response){
		let flowNotePage = new FlowNotePage(req.body);
		console.log('req.body', req.body);
		flowNotePage.save((err, data:IFlowNotePage) => 
				res.status(200).send(data._id));
	}
	
	update(req, res:Response){
		console.log('update', req.body.title);
		FlowNotePage.findOne({_id:req.body._id}, (err, doc) => {
			
			if (doc) {
				for(let key in req.body){
					console.log('key', key, req.body[key]);
					console.log('k', doc[key]);
					doc[key] = req.body[key];
				}
				doc.save();
				res.status(200).send({status: 'updated', pageId: req.body._id});
			}
			else {
				res.status(200).send({status: 'error', reason: 'not found', pageId: req.body._id});
			}
		});
	}
	
	remove(req, res:Response){
		FlowNotePage.findOne({ _id: req.params.id})
		.remove((err, doc) => {
				res.status(202).send(null);
			});
	}
	
}

let flowNotePageService = new FlowNotePageService();  

export {flowNotePageService, FlowNotePageService };