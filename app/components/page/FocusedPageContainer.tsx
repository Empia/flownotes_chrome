import * as React from "react";
import { connect } from 'react-redux';
let PageContentForm = require('./forms/PageContentForm.jsx');
import * as actions from '../../stores/page/PageActions';
import {store} from '../../main';
import { Router, Route, Link, browserHistory, withRouter } from "react-router";
var Select = require('react-select');
import 'react-select/dist/react-select.css';
import * as Modal from 'react-modal';
import GenericPageContent from './GenericPageContent';
import BasicDialog from './forms/BasicDialog';
import EditContentModal from './forms/EditContentModal';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var update = require('react/lib/update');
//import * as Addons from 'react-addons-update';
import DragCard from '../commons/drag/DragCard';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as MouseBackEnd from 'react-dnd-mouse-backend';
import {DropdownButton, MenuItem, Button} from 'react-bootstrap';

import {CustomDragLayer} from './../commons/drag/CustomDragLayer' 
//////////////////////////////////////////////////////////////////////////////////////////////////

import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';


const mapStateToProps = ({addingPageContent, pageContents, pages, selectedPage}) => ({
  addingPageContent,
  pageContents,
  pages,
  selectedPage
});

const mapDispatchToProps = dispatch => ({
    toggleAddPageContent: () => dispatch(actions.toggleAddPageContent()),
    selectPage: (pageId) => dispatch(actions.selectPage(pageId)),
    removePageContent: (pageId, pageContentId) => dispatch(actions.removePageContent(pageId, pageContentId)),
    updatePageContent: (pageId, pageContentId, content) => dispatch(actions.updatePageContent(pageId, pageContentId, content)),
    updateContentOrder: (pageId, pageContentId, content) => dispatch(actions.moveOrderPageContent(pageId, pageContentId, content)),
    addPageContent: (pageId,content) => dispatch(actions.addPageContent(pageId, content)),
    recievePageOrdering: (updateOrdering) => dispatch(actions.recievePageOrdering(updateOrdering)),
    contentSortBy: (param) => dispatch(actions.sortBy(param)),
});

interface FocusedPageContainerProps extends React.Props<any>{
  pageId:string;
  currentPage?:any;
  params: any;
  addingPageContent: any;
  pageContents: any;
  selectedPage: any;
  pages: any;
  moveCard?:any;

  // actions
  removePageContent: (pageId: void, pageContentId: void) => void;
  selectPage: (pageId: string) => void;
  toggleAddPageContent: () => void;
  addPageContent: (pageId:string, content:any) => void;
  updatePageContent: (pageId:string, pageContentId:string, content:any) => void;
  updateContentOrder:any;
  recievePageOrdering: any;
  contentSortBy: any;
}

interface GeneralState {
  pages: any;
  cards?:any;
}

interface FocusedPageContainerState{ 
  modalIsOpen: boolean;
  cards?:any;
}

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};
  

const style = {
  width: 400
};

@DragDropContext(HTML5Backend)  
class FocusedPageContainer extends React.Component<FocusedPageContainerProps, FocusedPageContainerState>{
  constructor(props){
    super(props);
    this.moveCard = this.moveCard.bind(this);
    //this.page = this.props.pages;
    //this.pageId = this.props.params.pageId
    console.log('BasicDialog', BasicDialog);
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
      modalIsOpen: false
    };
  }  
  

  moveCard(dragOrder, hoverIndex, item) {
    const cards = this.props.pageContents.page_content;
    const dragCard = cards.find(c => c.order === dragOrder);
    const dragIndex = cards.indexOf(cards.find(c => c.order === dragOrder))
   var direction = null
    if (dragOrder < hoverIndex) {
      direction = 'down';
    } else {
      direction = 'up';
    };

    console.log('dragOrder, hoverIndex', dragOrder, hoverIndex, direction);
/*
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

    let newOrder = update(cards,{ 
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]});
    */
    // [1,2,3,4]
    // 2 -> 1 == 2=1
    // 1 -> 3 == 1=3
 
    let newOrder2 = cards.map(c => {
      if (c._id == item.id) {
        c.order = hoverIndex
      } else {
        if (c.order >= hoverIndex && direction === 'up') {
          //c.order = c.order+1;
        }
        if (c.order <= hoverIndex && direction === 'down') {
          //c.order = c.order-1;
        }        
      }
      return c; 
    });

    console.log('newOrder', newOrder2);
    this.props.recievePageOrdering(
       newOrder2
    )
  }

  componentWillMount() {
    store.dispatch(actions.fetchPageContent(this.props.params.pageId)).then(() =>
      console.log(store.getState())
    )    
    store.subscribe( () => {
      let state = store.getState() as GeneralState
      let pages_state = state.pages
      if (pages_state.selectedPage == undefined && pages_state.isFetched) {
        store.dispatch(actions.selectPage(this.props.params.pageId))
        console.log('getState ',store.getState() )
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.pageId !== this.props.params.pageId) {
      console.log('PageContentForm pages', this.props.pages);
      store.dispatch(actions.fetchPageContent(nextProps.params.pageId)).then(() =>
        console.log(store.getState())
      )    
      store.dispatch(actions.selectPage(nextProps.params.pageId))
    }
  }
  componentDidUpdate() {
/*
    console.log('componentDidUpdate', this);
    var el =ReactDOM.findDOMNode(this.refs.add) as HTMLElement
    if (el) el.focus();
*/
  }




  createPageContent = (values) => {
    console.log('values',values);
    /*
    if (evt.which !== 13) return;
    console.log('ref', this.refs);
    var title = (ReactDOM.findDOMNode(this.refs.add) as HTMLInputElement).value;
    this.props.addPage({title});
    this.props.toggleAddPage();
    */
    this.props.addPageContent(this.props.params.pageId,values);
    this.props.toggleAddPageContent();
  }

  updatePageContent = (values) => {
    console.log('values',values);
    /*
    if (evt.which !== 13) return;
    console.log('ref', this.refs);
    var title = (ReactDOM.findDOMNode(this.refs.add) as HTMLInputElement).value;
    this.props.addPage({title});
    this.props.toggleAddPage();
    */
    this.props.addPageContent(this.props.params.pageId,values);
    this.props.toggleAddPageContent();
  }

  updatePage = (evt) => {
    return (id) => { 
      console.log('ref', this.refs, evt.currentTarget);
    //  this.props.addPage(title );
    //  this.props.toggleAddPage();
      return false;
    }
  }

  options = (pages) => {
    if (pages !== undefined && pages.length > 0) {
      return pages.map((page) => {
        return {value: page._id, label: page.title}
      });
    } else {
      return [];
    }
   }

  logChange(val) {
      console.log("Selected: ", val);
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    let el = this.refs as any
    el.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }


  sortingBy = (sortParam) => {
    return this.props.pageContents.sortBy.split('_')[0] === sortParam.split('_')[0]
  }
  sortingPosBy = (sortParam) => {
    return this.props.pageContents.sortBy.split('_')[1] === sortParam.split('_')[1]    
  }


  toggleSortInfo = (name, param = "object") => {
    if (param !== "pos") {
     return this.props.contentSortBy(param);
    } else {
     return this.props.contentSortBy(this.props.pageContents.sortBy.split('_')[0]+"_"+name);    
    }
  }
  sortFunction = (page_content) => {
    if (this.props.pageContents.sortBy === 'order_asc') {
      return page_content.sort((c,b) => c.order - b.order)
    } 
    if (this.props.pageContents.sortBy === 'order_desc') {
      return page_content.sort((c,b) => b.order - c.order)
    } 
    if (this.props.pageContents.sortBy === 'date_asc') {
      return page_content.sort((c,b) => (+ new Date(c.createdAt)) - (+ new Date(b.createdAt)))
    } 
    if (this.props.pageContents.sortBy === 'date_desc') {
      return page_content.sort((c,b) => (+ new Date(b.createdAt)) - (+ new Date(c.createdAt)))
    }     
    
  }
  disableDragging = () => {
    return !(this.props.pageContents.sortBy === 'order_asc' || this.props.pageContents.sortBy === 'order_desc')
  }

  render(){
    let initialValues = {
        content_type: 'Link',
        inPageId: this.props.params.pageId
    };
    return  (
      <div className="pageContent">
        <h3 className="pageContent__pageHeader">
          Page {this.props.pages.selectedPage ? this.props.pages.selectedPage.title : '' } 
        </h3>
        {/*this.state.cards.map((card, i) => {
                  return (
                    <DragCard key={card.id}
                          index={i}
                          id={card.id}
                          text={card.text}
                          moveCard={this.moveCard} />
                  );
        })*/}        
        <BasicDialog />
        <EditContentModal />
        {/*
        <Select
            name="form-field-name"
            value="two"
            options={this.options(this.props.pages.items)}
            onChange={this.logChange}
        />
        <Button onClick={ e => this.props.toggleAddPageContent() }>Add lots of content</Button>
        */}

        <div className="pageContent__mainControlGroup">
          <div className="pageContent__contentCreateButton">
            <Button onClick={ e => this.props.toggleAddPageContent() }>Add content</Button>
          </div>
          <div className="pageContent__contentCreateToggle">
             { this.props.addingPageContent && <PageContentForm.default 
                                            pageId={this.props.params.pageId} 
                                            initialValues={initialValues} 
                                            form={'new_content_form'}
                                            onSubmit={this.createPageContent}/>}
             <div className="pageContentModal">
              <Button onClick={this.openModal}>Open Modal</Button>
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                  <PageContentForm.default 
                    pageId={this.props.params.pageId} 
                    initialValues={initialValues} 
                    form={'new_content_form'}
                    onSubmit={this.createPageContent}/>
              </Modal>
            </div>
          </div> 
          <div className="pageContent__sortableDropdown">
            <DropdownButton bsStyle="default" title={'Sort'} key={'dropdown-'} id={`dropdown-basic-`}>
              <MenuItem eventKey="1" onClick={ e => this.toggleSortInfo('order_asc') } active={this.sortingBy('order_asc') }>By Order</MenuItem>
              <MenuItem eventKey="2" onClick={ e => this.toggleSortInfo('date_asc') } active={this.sortingBy('date_asc') }>By Date</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="3" active={this.sortingPosBy('order_asc') } onClick={ e => this.toggleSortInfo('asc', 'pos') }>ASC</MenuItem>
              <MenuItem eventKey="4" active={this.sortingPosBy('order_desc') } onClick={ e => this.toggleSortInfo('desc', 'pos') }>DESC</MenuItem>
            </DropdownButton>          
          </div>
        </div>

        <SortableList2 disabled={this.disableDragging()} 
                       pressDelay={10}
                       items={this.sortFunction(this.props.pageContents.page_content)} 
                       onSortEnd={this.onSortEnd} />

        {/*<div className="pageContent__contentList">
            {this.sortFunction(this.props.pageContents.page_content).map((p, idx) => 
          <div>
          <GenericPageContent contentObject={p} key={idx} contentIdx={idx} />
          <DragCard key={idx}
                    index={p.order}
                    id={p._id}
                    text={p._id}
                    moveCard={this.moveCard}>
                  <GenericPageContent contentObject={p} key={idx} contentIdx={idx} />
          </DragCard>
          <CustomDragLayer p={p}></CustomDragLayer></div>)}
        </div>
        */}

      </div>);
  }    
  onSortEnd = ({oldIndex, newIndex}) => {
    console.log('onSortEnd', oldIndex, newIndex);
        //this.setState({
            //items: arrayMove(this.state.items, oldIndex, newIndex)
        //});
  };  
}
//const SortableItem = SortableElement(({value:FocusedPageContainerProps}) => <GenericPageContent {...value} />);
const SortableItem = SortableElement(GenericPageContent);

const SortableList2 = SortableContainer((props: SortableListProps): JSX.Element => {
    const items: Array<JSX.Element> = props.items.map((value: any, index: number): JSX.Element => {
        return <div className="pageContent__contentList">      
                <SortableItem disabled={props.disabled} 
                              key={`item-${index}`} 
                              index={index} contentIdx={value._id} contentObject={value} />
               </div>;
    });
    return <ul className="pageContent__contentList">{items}</ul>;
});

interface SortableItemProps {
    value: string;
}

interface SortableListProps {
    items: Array<string>;
    disabled?: boolean;
}
 
export default connect(mapStateToProps, mapDispatchToProps)(FocusedPageContainer);
