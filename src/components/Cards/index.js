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
  
  componentWillMount() {
    const currentComponent = this;
    let cardsIds = [];
    currentComponent.props.firebase.auth.onAuthStateChanged(function (user) {
      if (user) {
        const uid = currentComponent.props.firebase.auth.currentUser.uid;
        const refCardList = currentComponent.props.firebase.userCards(uid);

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

  deleteCard = async key => {
    this.props.firebase
      .card(key)
      .remove()
      .then(function () {
        console.log("Card ID: " + key + " deleted from cards");
      })
      .catch(function (error) {
        console.error("Error removing element from cards: ", error);
      });

    this.props.firebase
      .userCard(key)
      .remove()
      .then(function () {
        console.log("Element deleted from user's cards");
      })
      .catch(function (error) {
        console.error("Error removing element from user's cards: ", error);
      });
    
    const filteredCards = this.state.cards.filter(card => card.cid !== key);
    await this.setState({ cards: filteredCards });
    console.log(this.state.cards);
  }

  addCard = async newCard => {
    console.log(newCard);
    const cardsRef = this.props.firebase.cards();
    const uid = this.props.firebase.auth.currentUser.uid;
    const userCardsListRef = this.props.firebase.userCards(uid);

    let newCardRef = cardsRef.push();

    // New Key ID for the Card
    const newCardId = newCardRef.key;
    newCardRef
    .set(newCard)
    .then(function() {
      console.log("New Card added");
    })
    .catch(function(error) {
      console.error("error adding card", error);
    });

    // Rewrite the cards list and add the new one
    userCardsListRef.on("value", (snapshot) => {
      const cardsList = snapshot.val();
      if (cardsList) {
        cardsList[newCardId] = true;
        userCardsListRef.set(cardsList);
      }
    });

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


