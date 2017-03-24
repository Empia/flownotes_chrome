import * as React from "react";
import { connect } from 'react-redux';
import * as Modal from 'react-modal';
import {DropdownButton, MenuItem, Button} from 'react-bootstrap';


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


function NewPageModal(props) {
  var state = props.state
  var openModal = props.openModal
  var afterModalOpen = props.afterOpenModal
  var closeModal = props.closeModal
  console.log('afterModalOpen ', afterModalOpen);
  return (<div className="pageContentModal">
              <Modal
                isOpen={state.modalIsOpen}
                onAfterOpen={afterModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                      <button onClick={closeModal}>close</button>
                  <span>c</span>
              </Modal>
            </div>);
}

export default NewPageModal;