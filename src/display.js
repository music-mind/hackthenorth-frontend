import React, { Component } from 'react';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import ExpandMoreIcon from '../node_modules/material-ui-icons/ExpandMore';

class Display extends React.Component {

  handleAdd = id => e => {
    return this.props.handleAdd(id);
  }

  handleRemove = id => e => {
    return this.props.handleRemove(id);
  }
  
  render() {

    const { data, all_data } = this.props;

    const activities = data.map((activity) => {
      const tags = activity.tags.map((tag) => {
        return <Chip label={tag} />;
      })
      const start = new Date(Date.parse(activity.start_time)).toLocaleString();
      const end = new Date(Date.parse(activity.end_time)).toLocaleString();

      return <ExpansionPanel key={activity.id}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subheading">{activity.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography variant="body2" align="left">Description: {activity.description} 
          <br />Start Time: {start} 
          <br />End Time: {end} 
          <br />Location: {activity.location} 
          <br />{tags}
          </Typography><div />
        </ExpansionPanelDetails>
         <Divider />
        <ExpansionPanelActions>
          <Button size="small" onClick={this.handleRemove(activity.id)}>Remove from List</Button>
          <Button size="small" color="primary" onClick={this.handleAdd(activity.id)}>
            Add To My List
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    });

    return (
      <div>
        {activities}
      </div>
    );
  }
}

export default Display;