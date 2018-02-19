import React, { Component } from 'react';
import './App.css';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';

import Clock from './clock';
import Events from './events';

import Happy from '../node_modules/material-ui-icons/SentimentSatisfied';

class App extends Component {
  state = {
    area: 1,
  };

  handleArea = (e) => {
    this.setState({
      area: e.target.value
    })
  };

  render() {

    const { area } = this.state;

    return (
      <div className="App">
        <Toolbar>
          <Typography variant="title" align="center" color="inherit">
            Hack The North
          </Typography>
        </Toolbar>
        <Select
            value={area}
            onChange={this.handleArea}
          >
            <MenuItem value={1}  component={({...props}) => <Link to='/' {...props} />} >Home</MenuItem>
            <MenuItem value={2} component={({...props}) => <Link to='/events' {...props} />}>Events</MenuItem>
        </Select>
        <Route exact path="/" component={Clock} />
        <Route exact path="/events" component={Events} />
        <p>
        
        </p>
        <Paper elevation={4}>
        <Typography component="h3">
          Thanks for Checking out Hack The North!
        </Typography>
        <Happy />
        </Paper>
      </div>
    );
  }
}

export default App;
