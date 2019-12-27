import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Rename this to App.test.js when we want to test app.js with jest
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
