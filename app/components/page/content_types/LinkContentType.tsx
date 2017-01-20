import * as React from 'react';

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
        return <div>
         <h3><span>{props.content_order+" "}</span>{props.content_title}</h3>
          <a href={props.content_value}>{props.content_value}</a>
        </div>;
    }
}
export {LinkContentType};

// LinkContentType.ts