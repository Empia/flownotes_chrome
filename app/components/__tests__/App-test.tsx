import * as React from 'react';
import * as ReactDOM from 'react-dom';

it('renders without crashing', () => {
  var div = document.createElement('div');
  ReactDOM.render(<p>test</p>, div);
});
