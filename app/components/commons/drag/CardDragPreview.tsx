import * as React from "react";
//import Card from './Cards/Card';
import GenericPageContent from '../../page/GenericPageContent';

const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)',
  width: '',
  height: ''
};

const propTypes = {
  title: React.PropTypes.string,
  idx: React.PropTypes.number
};

const CardDragPreview = (props) => {
 // ${props.card.clientWidth || 243}
  styles.width = `243px`;
  // ${props.card.clientHeight || 243}
  styles.height = `243px`;

  return (
    <div style={styles}>
      <GenericPageContent contentObject={props.p} key={props.idx} contentIdx={props.idx} />
    </div>
  );
};

//CardDragPreview.propTypes = propTypes;

export default CardDragPreview;
