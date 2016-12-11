import * as React from "react";
import * as ReactDOM from "react-dom/server"
import {FlowNotePage, IFlowNotePage} from './models/FlowNotePage';
import {FlowNoteContent, IFlowNoteContent} from './models/FlowNoteContent';

import {GroceryItemList} from './services/GroceryItemList';

export default function (req, res) {
		let application = React.createFactory(GroceryItemList);
		
		FlowNotePage.find((error, items) => {
			let reactOutput = ReactDOM.renderToString(application({ }));
			res.render('./../app/index.ejs', {reactOutput});
		});
}