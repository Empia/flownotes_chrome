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
//////////////////////////////////////////////////////////////////////////////////////////////////



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
  

  moveCard(dragOrder, hoverIndex) {
    const cards = this.props.pageContents.page_content;
    const dragCard = cards.find(c => c.order === dragOrder);
    const dragIndex = cards.indexOf(cards.find(c => c.order === dragOrder))
    console.log('moveCard dragCard dragIndex,  hoverIndex,cards',dragCard, dragIndex, hoverIndex,cards);
    let newOrder = update(cards,{ 
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]});
    let newOrder2 = cards.map(c => {
      if (c.order == dragIndex) {
        c.order = hoverIndex
      } 
      if (c.order == hoverIndex) {
        c.order = dragIndex;
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
        <Select
            name="form-field-name"
            value="two"
            options={this.options(this.props.pages.items)}
            onChange={this.logChange}
        />

        <button onClick={ e => this.props.toggleAddPageContent() }>Add content</button>
        <button onClick={ e => this.props.toggleAddPageContent() }>Add lots of content</button>

        <div className="pageContent__contentCreateToggle">
           { this.props.addingPageContent && <PageContentForm.default 
                                          pageId={this.props.params.pageId} 
                                          initialValues={initialValues} 
                                          form={'new_content_form'}
                                          onSubmit={this.createPageContent}/>}


     <div>
        <button onClick={this.openModal}>Open Modal</button>
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
        <div className="pageContent__contentList">
            {this.props.pageContents.page_content.sort((c,b) => c.order - b.order).map((p, idx) => 
        <DragCard key={idx}
                  index={p.order}
                  id={p.order}
                  text={p._id}
                  moveCard={this.moveCard}>
                    <GenericPageContent contentObject={p} key={idx} contentIdx={idx} />
                  </DragCard>)}
        </div>
      </div>);
  }  
}
 
export default connect(mapStateToProps, mapDispatchToProps)(FocusedPageContainer);
