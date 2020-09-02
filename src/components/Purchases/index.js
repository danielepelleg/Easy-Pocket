import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { AddPurchase, PurchaseList } from './components';

import { withFirebase } from 'components/Firebase'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

class Purchase extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      pidList: [],
      purchases: [],
    };
  }
  
  UNSAFE_componentWillMount() {
    
  };

  /**
   * Delete a payment using its pid (purchase identification) from the /purchases collection
   *  and the relative user's object list.
   * 
   * @param {the pid of the payment to delete} key 
   */
  deleteCard = async key => {
    
  }

  /**
   * Add a newPurchase to Firebase.
   * Save the new purchase in a collection /purchases with its pid (purchase id),
   *  and save the foreign key to the user's object purchases in the user's collection.
   *  
   * @param {the purchase to add} newCard 
   */
  addCard = async newCard => {
    
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
            lg={3}
            md={6}
            xl={3}
            xs={12}
          >
            <AddPurchase addCard = {this.addCard} />
          </Grid>

          <Grid
            item
            lg={9}
            md={6}
            xl={9}
            xs={12}
          >
            {/*
            <PurchaseList 
             cards = {this.state.cards}
             deleteCardFn = {this.deleteCard}
            />
            */}
          </Grid>
          
        </Grid>
      </div>
    );
  }
};

const ListBase = withFirebase(Purchase);

export default function UserPurchases() {
  const classes = useStyles();

  return (
    <ListBase classes={classes}/>
  );
}


