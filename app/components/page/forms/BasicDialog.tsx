import reduxDialog from 'redux-dialog';
import * as React from "react";
import { connect } from 'react-redux';

function BasicDialog(props) {
  return  <div>
    My awesome modalbox!
  </div>
}
export default reduxDialog({
  name: 'signupDialog' // unique name - you can't have two dialogs with the same name
})(BasicDialog);
