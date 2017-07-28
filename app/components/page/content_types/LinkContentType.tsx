import * as React from 'react';
const normalizeUrl = require('normalize-url');
var URL = require('url-parse');

interface LinkContentTypeProps extends React.Props<any>{
  content_value:string;
  content_title:string;
  content_desc?:string;
  content_order?:string;
}

interface LinkContentTypeState{ 
}


class LinkContentType extends React.Component<LinkContentTypeProps, LinkContentTypeState>{
    render () {
        let props = this.props
        let url = URL(normalizeUrl(props.content_value))
        let icon_protocol = url.protocol;
        let icon_hostname = url.host;

        return <div className="LinkContentLinkContainer">
        <div className="LinkContentLinkFavicon">
          <div className="LinkContentLinkFaviconTest">
            <img src={'//'+icon_hostname+'/favicon.ico'}/>
          </div>
        </div>
        <div className="LinkContentLinkPrimary">
         <h3 className="LinkContentLinkTitle">{props.content_title}</h3>
          <a className="LinkContentLinkA" href={normalizeUrl(props.content_value)}>{normalizeUrl(props.content_value)}</a>
        </div>
        </div>;
    }
}
export {LinkContentType};

// LinkContentType.ts