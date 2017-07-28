import * as React from 'react';
import { Form, Control } from 'react-redux-form';

export default class NewLoginForm extends React.Component<{}, {}>{
  handleChange(values) { console.log("values", values); }
  handleUpdate(form) { console.log("form", form); }
  handleSubmit(values) { console.log("values", values); }
  render() {
    return (
      <Form model="new_forms.user_login"
        onUpdate={(form) => this.handleUpdate(form)}
        onChange={(values) => this.handleChange(values)}
        onSubmit={(values) => this.handleSubmit(values)}
      >
        <Control.text model=".username" />
        <Control.text model=".password" />
      </Form>
    );
  }
}
