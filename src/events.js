import React, { Component } from 'react';
import Display from './display';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import ChevronRight from '../node_modules/material-ui-icons/ChevronRight';
import ChevronLeft from '../node_modules/material-ui-icons/ChevronLeft';
import Refresh from '../node_modules/material-ui-icons/Refresh';

import Title from '../node_modules/material-ui-icons/Title';
import Book from '../node_modules/material-ui-icons/Book';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      display: [],
      title: '',
      tag: '',
      offset: 0,
      list: [],
    };
  }

  handleLoad = () => {
    const offset = this.state.offset;
    if (offset > this.state.data.length - 10) return;
    let newDisplay = this.state.data.slice(offset + 10, offset + 20);
    this.setState({
      offset: this.state.offset + 10,
      display: newDisplay,
    })
  };

  handlePrevious = () => {
    const offset = this.state.offset;
    if (offset === 0) return;
    let newDisplay = this.state.data.slice(offset - 10, offset);
    this.setState({
      offset: this.state.offset - 10,
      display: newDisplay,
    })
  };

  handleRefresh = () => {
    const offset = 0;
    let newDisplay = this.state.data.slice(offset, offset + 10);
    this.setState({
      offset: offset,
      display: newDisplay,
    })
  };

  handleTitleChange = e => {
    let newDisplay = [];
    this.state.data.forEach((activity) => {
      if (activity.title === e.target.value) newDisplay.push(activity);
    });
    this.setState({
      title: e.target.value,
      display: newDisplay,
    });
  };

  handleTagChange = e => {
    let newDisplay = [];
    this.state.data.forEach((activity) => {
      if (activity.tags.find((tag) => {
        return tag === e.target.value;
      })) newDisplay.push(activity);
    });
    this.setState({
      tag: e.target.value,
      display: newDisplay,
    });
  };

  handleAdd = (id) => {
    console.log(id);
    let exists = this.state.list.some((activity) => activity.id === id);
    if (exists) return;
    let newList = this.state.list;
    this.state.data.forEach((activity) => {
      if (activity.id === id) {
        this.setState({
          list: newList.concat([activity]),
        });
      }
    });
    return;
  };

  handleRemove = (id) => {
    console.log(id);
    let newList = [];
    this.state.list.forEach((activity) => {
      if (activity.id != id) {
        newList.push(activity);
      }
    });
    this.setState({
      list: newList,
    })
  };

  componentDidMount() {
    fetch("https://hackthenorth.com/fe-schedule.json", {
        method: 'GET',
      })
        .then((response) => {
          return response.json();
        })
        .then((activities) => {
          activities.sort(function(a, b) {
            if (Date.parse(a.start_time) < Date.parse(b.start_time)) return -1;
            if (Date.parse(a.start_time) > Date.parse(b.start_time)) return 1;
            return 0;
          });
          const display = activities.slice(0, 10);
          this.setState({
            data: activities,
            display: display
          });
        })
        .catch((err) => {
          console.log('Could not load activities', err);
        });
  }


  render() {
    const { display, title, tag, data, list} = this.state;
    return (
      <div>
      <p>
      </p>
      <Typography variant="title">Hack The North Activities</Typography>
      <Title />
      <TextField label="Search By Title" value={title} onChange={this.handleTitleChange}/>
      <TextField label="Search By Tag" value={tag} onChange={this.handleTagChange}/>
      <Book />
      <p>
      </p>
      <Display data={display} all_data={data} handleAdd={this.handleAdd} 
      handleRemove={this.handleRemove}/>
      <p>
      </p>
      <Button variant="raised" size="medium" color="secondary" 
      onClick={this.handlePrevious}><ChevronLeft /> Load Previous </Button>
      <Button variant="raised" size="medium" color="primary" 
      onClick={this.handleLoad}> Load More  <ChevronRight /></Button>
      <Button variant="raised" size="medium" color="tertiary" 
      onClick={this.handleRefresh}> Refresh  <Refresh /></Button>
      <p>
      </p>
      <Typography variant="title">My List of Activities</Typography>
      <Display data={list} all_data={data} handleAdd={this.handleAdd} 
      handleRemove={this.handleRemove}/>
      </div>
    );
  }
}

export default Events;