import reduxDialog from 'redux-dialog';
import * as React from "react";
import { connect } from 'react-redux';

function EditContentModal(props) {
  return  <div>
    My awesome modalbox!
  </div>
}
export default reduxDialog({
  name: 'editContentModal' // unique name - you can't have two dialogs with the same name
})(EditContentModal);
