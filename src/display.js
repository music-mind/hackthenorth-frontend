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
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '../node_modules/material-ui-icons/Close';

import Delete from '../node_modules/material-ui-icons/Delete';
import AddIcon from '../node_modules/material-ui-icons/Add';


class Display extends React.Component {
  state = {
    add: false,
    remove: false,
  };

  handleAdd = id => e => {
    this.handleClick('add');
    return this.props.handleAdd(id);
  }

  handleRemove = id => e => {
    this.handleClick('remove');
    return this.props.handleRemove(id);
  }

  handleClick = (field) => {
    this.setState({ [field]: true });
  };

  handleClose = field => (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ [field]: false });
  };
  
  render() {

    const { data, all_data } = this.props;
    const { add, remove } = this.state;

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
          <Button size="small" onClick={this.handleRemove(activity.id)}><Delete />  Remove from List</Button>
          <Button size="small" color="primary" onClick={this.handleAdd(activity.id)}>
            <AddIcon />  Add To My List 
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    });

    return (
      <div>
        {activities}
        <Snackbar
          open={add}
          autoHideDuration={2000}
          onClose={this.handleClose("add")}
          message={<span>Added to Your List!</span>}
          action={[,
            <IconButton
              color="inherit"
              onClick={this.handleClose("add")}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        <Snackbar
          open={remove}
          autoHideDuration={2000}
          onClose={this.handleClose("remove")}
          message={<span>Removed from Your List!</span>}
          action={[,
            <IconButton
              color="inherit"
              onClick={this.handleClose("remove")}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default Display;