import * as React from "react";
//import Card from './Cards/Card';
import GenericPageContent from '../../../page/GenericPageContent';
import Box from './Box';

const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  transition: 'all 2s',
  WebkitTransform: 'rotate(-7deg)',
  width: '100%',
  height: '100%',  
  animationName: 'appears-drag-preview',
  animationDuration:'3s',
};

const propTypes = {
  p: React.PropTypes.object,
  idx: React.PropTypes.number
};

const BoxDragPreview = (props) => {
 // ${props.card.clientWidth || 243}
  styles.width = `243px`;
  // ${props.card.clientHeight || 243}
  styles.height = `243px`;
  console.log('BoxDragPreview',props);

  return (
    <div style={styles}>
      <Box title={props.idx} />
    </div>
  );
};

//BoxDragPreview.propTypes = propTypes;

export default BoxDragPreview;