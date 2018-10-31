import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    tertiary: {
      light: '#F8BBD0',
      main: '#F06292',
      dark: '#880E4F',
      contrastText: '#fff',
    },
  },
});

ReactDOM.render(
	<div>
    <BrowserRouter>
    <MuiThemeProvider theme={theme}>
    <App />
    </MuiThemeProvider>
    </BrowserRouter>
   </div>, 
	document.getElementById('root'));
registerServiceWorker();
