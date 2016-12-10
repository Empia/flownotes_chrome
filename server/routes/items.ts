import {IRoute, Express, Application, Router} from 'express';
import {itemService} from '../services/GroceryItem';

export default function (router:Router){
	router
		.get('/pages', itemService.getList)
		.post('/pages', itemService.add)
		.delete('/pages/:id', itemService.remove)
	    .patch('/pages/:id', itemService.update);
}

