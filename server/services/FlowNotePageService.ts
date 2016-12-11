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
		FlowNotePage.findOne({_id:req.body._id}, (err, doc) => {
			
			for(let key in req.body){
				doc[key] = req.body[key];
			}
			
			doc.save();
			
			res.status(200).send(null);
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