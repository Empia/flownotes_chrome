import * as React from 'react';

interface ParagraphContentTypeProps extends React.Props<any>{
  content_value:string;
  content_title:string;
  content_desc:string;
}

interface ParagraphContentTypeState{ 
}

class ParagraphContentType extends React.Component<ParagraphContentTypeProps, ParagraphContentTypeState>{
    render () {
      let props = this.props
        return <div>
          <p>{props.content_title}{props.content_desc}</p>
        </div>;
    }
}
export {ParagraphContentType};
