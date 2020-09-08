import React, { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

import { AddPurchase, PurchaseList } from "./components";

import { withFirebase } from "components/Firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

class Purchase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      purchases: [],
      cards: []
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
                  if (cardSnapshot.val().purchases !== null) {
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
                            currentComponent.setState({
                              purchases: purchasesList,
                            });
                          }
                        });
                    }
                  }
                }
              });
          }
        });
      } else {
        // No user is signed in.
      }
    });
  };

  /**
   * Delete a payment using its pid (purchase identification) from the /purchases collection
   *  and the relative user's object list.
   *
   * @param {the pid of the payment to delete} key
   */
  deletePurchase = async (key) => {};

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
    const cardMoneyRef = this.props.firebase.cardMoney(cid);
    console.log(newPurchase);
    console.log(userCard);

    let newPurchaseRef = purchasesRef.push();
    // New Key ID for the Purchase
    const newPurchaseId = newPurchaseRef.key;

    // Update the actual current money and purchases on the card
    let updatedMoney;
    cardMoneyRef.once("value", (snapshot) => {
      updatedMoney = snapshot.val() - newPurchase.cost;
      cardMoneyRef.set(updatedMoney)
      .then(function () {
        console.log("Money on the card updated");
      })
      .catch(function (error) {
        console.error("error updating the money on the card", error);
      });
    });

    // Add the Purchase to Firebase
    newPurchaseRef
      .set(newPurchase)
      .then(function () {
        console.log("New Purchase added");
      })
      .catch(function (error) {
        console.error("error adding a new purchase", error);
      });

    // Rewrite the user's purchase list adding the new one
    userPurchasesListRef.once("value", (snapshot) => {
      const purchasesList = snapshot.val();
      if (purchasesList) {
        purchasesList[newPurchaseId] = true;
        userPurchasesListRef.set(purchasesList)
        .then(function () {
          console.log("New Purchase added to the user's purchases list");
        })
        .catch(function (error) {
          console.error("error adding a new purchase to the user's purchases list", error);
        });
      } else { userPurchasesListRef.set({ [newPurchaseId]: true })
      .then(function () {
        console.log("New Purchase added to the user");
      })
      .catch(function (error) {
        console.error("error adding the first new purchase to user", error);
      });
    }
    });

    // Save the current card's purchases in a variable
    cardPurchasesListRef.once("value", (snapshot) => {
      const purchasesList = snapshot.val();
      if (purchasesList) {
        purchasesList[newPurchaseId] = true;
        cardPurchasesListRef.set(purchasesList)
        .then(function () {
          console.log("New Purchase added to the card list");
        })
        .catch(function (error) {
          console.error("error adding a new purchase to the card list", error);
        });
      } else { cardPurchasesListRef.set({ [newPurchaseId]: true })
      .then(function () {
        console.log("New Purchase added to the card");
      }
      )
      .catch(function (error) {
        console.error("error adding a new purchase to the card", error);
      });
    }
    });

    // Details of the new Purchase
    const purchaseDetail = {
      pid: newPurchaseId,
      product: newPurchase.product,
      date: newPurchase.date,
      cost: newPurchase.cost,
      cid: cid,
      card: userCard.name,
      category: newPurchase.category,
    };

    await this.setState({
      purchases: [...this.state.purchases, purchaseDetail],
    });
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={3} md={6} xl={3} xs={12}>
            <AddPurchase 
              addPurchase = {this.addPurchase} 
              cards = {this.state.cards}
              />
          </Grid>

          <Grid item lg={9} md={6} xl={9} xs={12}>
            <PurchaseList
              purchases={this.state.purchases}
              deletePurchaseFn={this.deletePurchase}
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
}

const ListBase = withFirebase(Purchase);

export default function UserPurchases() {
  const classes = useStyles();

  return <ListBase classes={classes} />;
}
