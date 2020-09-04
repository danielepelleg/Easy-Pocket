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
    console.log(this.state.purchases);
  };

  /**
   * Delete a payment using its pid (purchase identification) from the /purchases collection
   *  and the relative user's object list.
   * 
   * @param {the pid of the payment to delete} key 
   */
  deletePurchase = async key => {
    
  }

  /**
   * Add a newPurchase to Firebase.
   * Save the new purchase in a collection /purchases with its pid (purchase id),
   *  and save the foreign key to the user's object purchases in the user's collection.
   *  
   * @param {the purchase to add} newCard 
   */
  addPurchase = async newPurchase => {
    const purchasesRef = this.props.firebase.purchases();
    const uid = this.props.firebase.auth.currentUser.uid;
    const userPurchasesListRef = this.props.firebase.userPurchases(uid);

    let newPurchaseRef = purchasesRef.push();

    // New Key ID for the Purchase
    const newPurchaseId = newPurchaseRef.key;
    // Add the Purchase to Firebase
    newPurchaseRef
    .set(newPurchase)
    .then(function() {
      console.log("New Purchase added");
    })
    .catch(function(error) {
      console.error("error adding a new purchase", error);
    });

    // Rewrite the user's cards list adding the new one
    userPurchasesListRef.on("value", (snapshot) => {
      const purchasesList = snapshot.val();
      if (purchasesList) {
        purchasesList[newPurchaseId] = true;
        userPurchasesListRef.set(purchasesList);
      }
      else 
        userPurchasesListRef.set({ [newPurchaseId]: true })
    });

    const cid = newPurchase.cid;

    // Details of the new Purchase
    const purchaseDetail = {
      pid: newPurchaseId,
      product: newPurchase.product,
      date: newPurchase.date,
      cost: newPurchase.cost,
      [cid]: true,
      category: newPurchase.category
    }

    await this.setState({ purchases: [...this.state.purchases, purchaseDetail] })
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
            <AddPurchase addPurchase = {this.addPurchase} />
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


