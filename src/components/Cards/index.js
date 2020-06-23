import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { CardDetails, AddCard } from './components';

import { withFirebase } from 'components/Firebase'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

class Card extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
    };
  }
 
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <Grid
          container
          spacing={4}
          >
          <Grid
            item
            lg={4}
            md={6}
            xl={4}
            xs={12}
          >
            <AddCard />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xl={8}
            xs={12}
          >
            <CardDetails />
          </Grid>
        </Grid>
      </div>
    );
  }
};

const ListBase = withFirebase(Card);

export default function CardList(props) {
  const classes = useStyles();

  return (
    <ListBase {...props} classes={classes}/>
  );
}


