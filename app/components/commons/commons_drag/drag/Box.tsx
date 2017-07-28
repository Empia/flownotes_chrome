import * as React from "react";
//import shouldPureComponentUpdate from './shouldPureComponentUpdate';

const styles = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move',
};

export default class Box extends React.Component<any, any> {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    yellow: React.PropTypes.bool,
  };

  //shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const { title, yellow } = this.props;
    const backgroundColor = yellow ? 'yellow' : 'white';

    return (
      <div style={{ ...styles, backgroundColor }}>
        {title}
      </div>
    );
  }
}
