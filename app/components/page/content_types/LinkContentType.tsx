import * as React from 'react';

interface LinkContentTypeProps extends React.Props<any>{
  content_value:string;
  content_title:string;
  content_desc?:string;
}

interface LinkContentTypeState{ 
}

class LinkContentType extends React.Component<LinkContentTypeProps, LinkContentTypeState>{
    render () {
        return <div>
          <ul></ul>
        </div>;
    }
}
export default LinkContentType;

// LinkContentType.ts