import * as React from "react";
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

interface DragCardProps extends React.Props<any>{
   connectDragSource?: any;
    connectDropTarget?: any;
    index: number;
    isDragging?: boolean;
    id: any;
    text: any;
    children?:any;
    moveCard: any;
}

const cardTarget = {
  hover(props, monitor, component) {
    // index of item
    const dragIndex = monitor.getItem().index;
    //console.log('monitor', monitor.getItem());
    // index of item to drag
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      var direction = 'down';
      console.log('Dragging downwards dragIndex hoverIndex', dragIndex, hoverIndex, direction);
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      var direction = 'up';
      console.log('Dragging upwards dragIndex hoverIndex', dragIndex, hoverIndex, direction);
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex, monitor.getItem(), direction);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class DragCard extends React.Component<DragCardProps, any> {
 
  render() {
    const { text, children, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div style={{ ...style, opacity }}>
        {text}
        {children}
      </div>
    ));
  }
}
