import * as React from 'react';

interface HeadingContentTypeProps extends React.Props<any>{
  content_value:string;
  content_title:string;
}

interface HeadingContentTypeState{ 
}

class HeadingContentType extends React.Component<HeadingContentTypeProps, HeadingContentTypeState>{
    renderH1(title) {
      return <h1>{title}</h1>
    }
    renderH2(title) {
      return <h2>{title}</h2>
    }
    renderH3(title) {
      return <h3>{title}</h3>
    }
    renderH4(title) {
      return <h4>{title}</h4>
    }
    renderH5(title) {
      return <h5>{title}</h5>
    }    
    renderH6(title) {
      return <h6>{title}</h6>
    }    
    render () {
        return <div className="heading-fow-content">
          {this.renderH1(this.props.content_title)}
        </div>;
    }
}
export {HeadingContentType};
