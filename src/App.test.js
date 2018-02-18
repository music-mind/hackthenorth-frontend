import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<div>
    <BrowserRouter>
    <MuiThemeProvider theme={theme}>
    <App />
    </MuiThemeProvider>
    </BrowserRouter>
   </div>, div);
  ReactDOM.unmountComponentAtNode(div);
});
