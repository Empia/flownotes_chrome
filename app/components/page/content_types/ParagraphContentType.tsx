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
        return <div>
          <p>{this.props.content_desc}</p>
        </div>;
    }
}
export default ParagraphContentType;
