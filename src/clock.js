import React, { Component } from 'react';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import './App.css';


class Clock extends React.Component {
  constructor(props) {
    super(props);
    const d = new Date(7200000);
    this.state = {date: d};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(this.state.date),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = (date) => {	
  	let curDate = Date.parse(date);
  	let newDate = new Date(curDate - 1000);
    this.setState({
      date: newDate
    });
  }

  render() {
  	const { date } = this.state;
    return (
      <div>
        <h1>Hack The North Countdown!</h1>
        <Card className="Clock">
	        <CardContent>
	          <Typography variant="title">{date.getUTCHours()}</Typography>
	          <Typography variant="body2">Hours</Typography>
	          <Typography variant="title">{date.getUTCMinutes()}</Typography>
	          <Typography variant="body2">Minutes</Typography>
	          <Typography variant="title">{date.getUTCSeconds()}</Typography>
	          <Typography variant="body2">Seconds</Typography>
	        </CardContent>
        </Card>
      </div>
    );
  }
}

export default Clock;