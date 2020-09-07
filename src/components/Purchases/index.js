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
      purchases: [],
    };
  }

  UNSAFE_componentWillMount = () => {
    const currentComponent = this;
    let cardsIds = [];
    currentComponent.props.firebase.auth.onAuthStateChanged(function (user) {
      if (user) {
        const uid = currentComponent.props.firebase.auth.currentUser.uid;
        const refCardList = currentComponent.props.firebase.userCards(uid);

        refCardList.once("value").then(function (snapshot) {
          cardsIds = snapshot.val();
          let purchasesList = [];
          
          for (let _card in cardsIds) {
            let purchasesIds = [];
            currentComponent.props.firebase
              .card(_card)
              .once("value")
              .then(function (cardSnapshot) {
                if (cardSnapshot.val() !== null) {
                  if (cardSnapshot.val().purchases !== null ) {
                  purchasesIds = cardSnapshot.val().purchases;
                  for (let _purchase in purchasesIds) {
                    currentComponent.props.firebase
                    .purchase(_purchase)
                    .once("value")
                    .then(function (purchaseSnapshot) {
                      if (purchaseSnapshot.val() !== null) {
                        let newPurchase = {
                          pid: _purchase,
                          product: purchaseSnapshot.val().product,
                          date: purchaseSnapshot.val().date,
                          cost: purchaseSnapshot.val().cost,
                          cid: _card,
                          card: cardSnapshot.val().name,
                          category: purchaseSnapshot.val().category,
                        };
                        purchasesList.push(newPurchase);
                        currentComponent.setState({ purchases: purchasesList });
                      }
                    });
                  }
                }
                }
              });
          };
        });
      } else {
        // No user is signed in.
      }
    });   
  }

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
  addPurchase = async (newPurchase, userCard) => {
    const purchasesRef = this.props.firebase.purchases();
    const uid = this.props.firebase.auth.currentUser.uid;
    const cid = userCard.cid;
    const userPurchasesListRef = this.props.firebase.userPurchases(uid);
    const cardPurchasesListRef = this.props.firebase.cardPurchases(cid);
    const userCardRef = this.props.firebase.card(cid);

    let newPurchaseRef = purchasesRef.push();

    // Update the actual current money on the card
    const updatedCard = {
      [uid]: true,
      name: userCard.name,
      owner: userCard.owner,
      money: userCard.money - newPurchase.cost,
      color: userCard.color,
    }

    console.log(updatedCard);
    userCardRef
    .set(updatedCard)
    .then(function() {
      console.log("Card updated");
    })
    .catch(function(error) {
      console.error("error updating the card", error);
    });

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

    // Rewrite the user's purchase list adding the new one
    userPurchasesListRef.on("value", (snapshot) => {
      const purchasesList = snapshot.val();
      if (purchasesList) {
        purchasesList[newPurchaseId] = true;
        userPurchasesListRef.set(purchasesList);
      }
      else 
        userPurchasesListRef.set({ [newPurchaseId]: true })
    });

    // Rewrite the card's purchase list adding the new one
    cardPurchasesListRef.on("value", (snapshot) => {
      const purchasesList = snapshot.val();
      if (purchasesList) {
        purchasesList[newPurchaseId] = true;
        cardPurchasesListRef.set(purchasesList);
      }
      else 
        cardPurchasesListRef.set({ [newPurchaseId]: true })
    });

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
            <PurchaseList 
              purchases = {this.state.purchases}
              deletePurchaseFn = {this.deletePurchase}
            />
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


