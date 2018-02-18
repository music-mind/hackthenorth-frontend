import React, { Component } from 'react';
import Display from './display';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      display: [],
      title: '',
      tag: '',
      offset: 10,
      list: [],
    };
  }

  handleLoad = () => {
    const offset = this.state.offset;
    if (offset > this.state.data.length) return;
    let newDisplay = this.state.data.slice(offset, offset + 10);
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
    const offset = 10;
    let newDisplay = this.state.data.slice(0, offset);
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
      <TextField label="Search By Title" value={title} onChange={this.handleTitleChange}/>
      <TextField label="Search By Tag" value={tag} onChange={this.handleTagChange}/>
      <p>
      </p>
      <Display data={display} all_data={data} handleAdd={this.handleAdd}/>
      <p>
      </p>
      <Button variant="raised" size="medium" color="secondary" 
      onClick={this.handlePrevious}> Load Previous </Button>
      <Button variant="raised" size="medium" color="primary" 
      onClick={this.handleLoad}> Load More </Button>
      <Button variant="raised" size="medium" color="secondary" 
      onClick={this.handleRefresh}> Refresh </Button>
      <p>
      </p>
      <Divider />
      <Typography variant="title">My List of Activities</Typography>
      <Display data={list} all_data={data} handleAdd={this.handleAdd}/>
      </div>
    );
  }
}

export default Events;