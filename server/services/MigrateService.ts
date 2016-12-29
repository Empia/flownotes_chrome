import {Response} from 'express';
import {FlowNotePage, IFlowNotePage} from '../models/FlowNotePage';
import {FlowNoteContent, IFlowNoteContent} from '../models/FlowNoteContent';
var colors = require('colors/safe');
var MetaInspector = require('node-metainspector');

class MigrateService{
  constructor(){}
  apply(req, res:Response){

//var scrape = require('html-metadata');

var url = "https://minorityapp.com";

//scrape(url, function(error, metadata){
//    console.log(colors.white(metadata) );
//});
/////////////////////

/*
client.url                  # URL of the page
client.scheme               # Scheme of the page (http, https)
client.host                 # Hostname of the page (like, markupvalidator.com, without the scheme)
client.rootUrl              # Root url (scheme + host, i.e http://simple.com/)
client.title                # title of the page, as string
client.links                # array of strings, with every link found on the page as an absolute URL
client.author               # page author, as string
client.keywords             # keywords from meta tag, as array
client.charset              # page charset from meta tag, as string
client.description          # returns the meta description, or the first long paragraph if no meta description is found
client.image                # Most relevant image, if defined with og:image
client.images               # array of strings, with every img found on the page as an absolute URL
client.feeds                # Get rss or atom links in meta data fields as array
client.ogTitle              # opengraph title
client.ogDescription        # opengraph description
client.ogType               # Open Graph Object Type
client.ogUpdatedTime        # Open Graph Updated Time
client.ogLocale             # Open Graph Locale - for languages
*/

    FlowNoteContent.find((err,data) => {

      data.forEach((d) => {
      if (d.content_type === "Link") {
        updateTitle(d);
      }
      });

    });    

    let updateTitle = ((d) => {
      FlowNoteContent.findOne({_id: d._id}, (err, doc) => {
        var client = new MetaInspector(d.content_value, { timeout: 15000 });
        client.on("fetch", () => {
            console.log(colors.white("Title: " + client.title) );
            //console.log(colors.white("Description: " + client.description) );
            //console.log(colors.white("Links: " + client.links )); //.join(",")) );
            //for(let key in req.body){
              doc['title'] = client.title;
              doc['states'] = [{
                name: 'initiated',
                ison: true,
                ison_rate: 100                
              }];
              doc['order'] = 0;
            //}            
            doc.save();        
        });
        client.on("error", (err) => console.log(colors.white(err) ));
        client.fetch();
      });
    });


    FlowNotePage.find((err, data) => data.forEach((d) => {
      FlowNotePage.findOne({_id: d._id}, (err, doc) => {
        doc['order'] = 0;
        doc.save();
      });
    }));

    console.log('do some migration work');
    return FlowNotePage.find((err, data) => res.send(data));
  }
}

let migrateService = new MigrateService();  

export {migrateService, MigrateService };
