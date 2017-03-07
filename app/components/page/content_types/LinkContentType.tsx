import * as React from 'react';
const normalizeUrl = require('normalize-url');

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
        return <div className="LinkContentLinkContainer">
         <h3 className="LinkContentLinkTitle">{props.content_title}</h3>
          <a className="LinkContentLinkA" href={normalizeUrl(props.content_value)}>{normalizeUrl(props.content_value)}</a>
        </div>;
    }
}
export {LinkContentType};

// LinkContentType.ts