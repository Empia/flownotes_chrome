import {IRoute, Express, Application, Router} from 'express';
import {flowNotePageService} from '../services/FlowNotePageService';
import {flowNoteContentService} from '../services/FlowNoteContentService';
import {migrateService} from '../services/MigrateService';
export default function (router:Router){
	router
		.get('/pages', flowNotePageService.getList)
		.post('/pages', flowNotePageService.add)
		.delete('/pages/:id', flowNotePageService.remove)
	  .patch('/pages/:id', flowNotePageService.update)
    .get('/content/page/:pageId', flowNoteContentService.getList)
    .post('/content/page/:pageId', flowNoteContentService.add)
    .delete('/content/:id', flowNoteContentService.remove)
    .patch('/content/:id', flowNoteContentService.update)
    .get('/migrate', migrateService.apply)

}

