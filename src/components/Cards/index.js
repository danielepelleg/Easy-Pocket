import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { CardList, AddCard } from './components';

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
      cidList: [],
      cards: [],
    };
  }
  
  UNSAFE_componentWillMount() {
    const currentComponent = this;
    let cardsIds = [];
    currentComponent.props.firebase.auth.onAuthStateChanged(function (user) {
      if (user) {
        const uid = currentComponent.props.firebase.auth.currentUser.uid;
        const refCardList = currentComponent.props.firebase.userCards(uid);

        // Set the State
        refCardList.once("value").then(function (snapshot) {
          cardsIds = snapshot.val();
          let cardsList = [];
          for (let element in cardsIds) {
            currentComponent.props.firebase
              .card(element)
              .once("value").then(function (snapshot1) {
                if(snapshot1.val() !== null){
                let newCard = {
                  cid: element,
                  name: snapshot1.val().name,
                  owner: snapshot1.val().owner,
                  money: snapshot1.val().money,
                  color: snapshot1.val().color,
                };
                cardsList.push(newCard);
                currentComponent.setState({ cards: cardsList });
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
   * Delete a card using its cid (card identification) from the /cards collection
   *  and the relative user's object list.
   * 
   * @param {the cid of the card to delete} key 
   */
  deleteCard = async key => {
    // Remove the card from the collection
    this.props.firebase
      .card(key)
      .remove()
      .then(function () {
        console.log("Card ID: " + key + " deleted from cards");
      })
      .catch(function (error) {
        console.error("Error removing element from cards: ", error);
      });

    // Remove the card from the user cards list
    this.props.firebase
      .userCard(key)
      .remove()
      .then(function () {
        console.log("Element deleted from user's cards");
      })
      .catch(function (error) {
        console.error("Error removing element from user's cards: ", error);
      });
    
    // Rewrite the new cards list without the one deleted
    const filteredCards = this.state.cards.filter(card => card.cid !== key);
    await this.setState({ cards: filteredCards });
    console.log(this.state.cards);
  }

  /**
   * Add a newCard to Firebase.
   * Save the new card in a collection /cards with its cid (card id),
   *  and save the foreign key to the user's object cards in the user's collection.
   *  
   * @param {the card to add} newCard 
   */
  addCard = async newCard => {
    console.log(newCard);
    const cardsRef = this.props.firebase.cards();
    const uid = this.props.firebase.auth.currentUser.uid;
    const userCardsListRef = this.props.firebase.userCards(uid);

    let newCardRef = cardsRef.push();

    // New Key ID for the Card
    const newCardId = newCardRef.key;
    // Add the Card to Firebase
    newCardRef
    .set(newCard)
    .then(function() {
      console.log("New Card added");
    })
    .catch(function(error) {
      console.error("error adding a new card", error);
    });

    // Rewrite the user's cards list adding the new one
    userCardsListRef.on("value", (snapshot) => {
      const cardsList = snapshot.val();
      if (cardsList) {
        cardsList[newCardId] = true;
        userCardsListRef.set(cardsList);
      }
    });

    // Details of the new Card
    const cardDetail = {
      cid: newCardId,
      name: newCard.name,
      owner: newCard.owner,
      money: newCard.money,
      color: newCard.color
    }

    await this.setState({ cards: [...this.state.cards, cardDetail] })
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
            <AddCard addCard = {this.addCard} />
          </Grid>

          <Grid
            item
            lg={9}
            md={6}
            xl={9}
            xs={12}
          >
            <CardList 
             cards = {this.state.cards}
             deleteCardFn = {this.deleteCard}
            />
          </Grid>
          
        </Grid>
      </div>
    );
  }
};

const ListBase = withFirebase(Card);

export default function UserCards() {
  const classes = useStyles();

  return (
    <ListBase classes={classes}/>
  );
}


