import * as React from "react";
var update = require('react/lib/update');
//import * as Addons from 'react-addons-update';
import DragCard2 from './drag/DragCard2';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from './drag/ItemTypes';
import Dustbin from './drag/Dustbin';

const style = {
  width: 400
};

export default class DragContainer2 extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
   this.state = {
      cards: [{
        id: 1,
        text: 'Write a cool JS library'
      }, {
        id: 2,
        text: 'Make it generic enough'
      }, {
        id: 3,
        text: 'Write README'
      }, {
        id: 4,
        text: 'Create some examples'
      }, {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)'
      }, {
        id: 6,
        text: '???'
      }, {
        id: 7,
        text: 'PROFIT'
      }],
       dustbins: [
              { accepts: [ItemTypes.TAB], lastDroppedItem: null },
              { accepts: [ItemTypes.TAB], lastDroppedItem: null },
              { accepts: [ItemTypes.TAB, ItemTypes.GLASS], lastDroppedItem: null },
              { accepts: [ItemTypes.TAB], lastDroppedItem: null },
      ],
     droppedBoxNames: [],      
    };
  }

  isDropped(boxName) {
    return this.state.droppedBoxNames.indexOf(boxName) > -1;
  }
 handleDrop(index, item) {
    const { name } = item;

    this.setState(update(this.state, {
      dustbins: {
        [index]: {
          lastDroppedItem: {
            $set: item,
          },
        },
      },
      droppedBoxNames: name ? {
        $push: [name],
      } : {},
    }));
}

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }));
  }

  render() {
    const { cards,dustbins } = this.state;

    return (
      <div style={style}>
        <p>test</p>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
                  {dustbins.map(({ accepts, lastDroppedItem }, index) =>
                    <Dustbin
                      accepts={accepts}
                      lastDroppedItem={lastDroppedItem}
                      onDrop={item => this.handleDrop(index, item)}
                      key={index}
                    />,
                  )}
        </div>        
        {cards.map((card, i) => {
          return (
            <DragCard2 key={card.id}
                  index={i}
                  id={card.id}
                  text={card.text}
                  moveCard={this.moveCard} />
          );
        })}
      </div>
    );
  }
}
