import React, { Component } from "react";
import { withFirebase } from "components/Firebase";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CardItem from "../CardItem";
import { withAuthentication } from "components/Session";
import { compose } from "recompose";

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
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
          let cardsList = [];
          for (let element in cardsIds) {
            currentComponent.props.firebase
              .card(element)
              .once("value")
              .then(function (snapshot1) {
                if (snapshot1.val() !== null) {
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
  }

  render() {
    const { cards } = this.props;

    return (
      <div>
        <Container>
          <Grid container spacing={4}>
            {cards.map((_card) => {
              return (
                <CardItem 
                  card = {_card} 
                  key = {_card.cid}
                  deleteCardFn = {() => { 
                    this.deleteCardList(_card.cid); 
                  }}
                ></CardItem>
              );
            })}
          </Grid>
        </Container>
      </div>
    );
  }

  deleteCardList = key => {
    this.props.deleteCardFn(key);
  }
}

const CardListBase = compose(withFirebase, withAuthentication)(CardList);

export default function CardListPage(props) {
  return <CardListBase {...props} />;
}
