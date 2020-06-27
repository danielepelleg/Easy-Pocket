import React, { Component } from "react";
import { withFirebase } from "components/Firebase";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CardItem from "../CardItem";

const testCards = [
  {
    ZeNAWTZVkwVyCGNTsGpp550vNt53: true,
    color: "#9addf4",
    money: "344",
    name: "fads",
    owner: "adsf",
  },
  {
    ZeNAWTZVkwVyCGNTsGpp550vNt53: true,
    color: "#FF0080",
    money: "324",
    name: "sadf",
    owner: "adsf",
  },
  {
    ZeNAWTZVkwVyCGNTsGpp550vNt53: true,
    color: "#d1dd4a",
    money: "3243",
    name: "sadfdasf",
    owner: "adsfafds",
  },
];

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: testCards,
      uid: "",
    };
  }

  componentWillMount = () => {
    console.log(this.state.cards);
    /*
    const uid = this.props.firebase.auth.currentUser.uid;
    const userCardsListRef = this.props.firebase.userCards(uid);

    userCardsListRef
    .on("value", (snapshot) => {
      this.setState({ cards: snapshot.val() });
      console.log(snapshot.val());
    });
    console.log(this.state.cards);
    */
  };

  render() {
    const { cards } = this.state;
    return (
      <div>
        <Container>
          <Grid container spacing={4}>
            {cards.map((_card) => {
              return <CardItem card={_card}></CardItem>;
            })}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withFirebase(CardList);
