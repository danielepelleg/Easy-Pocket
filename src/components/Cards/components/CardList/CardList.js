import React, {Component} from "react";
import {withFirebase} from "components/Firebase";
import {withAuthentication} from "components/Session";
import {Grid} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CardItem from "../CardItem";
import { withAuthorization } from 'components/Session';
import {compose} from "recompose";

const testCards = [{}]

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: testCards,
    };
  }

  componentDidMount = () => {
    const currentComponent = this;
    const refCardList = this.props.firebase.userCards(this.props.authUser.uid);
    let cards = {};
    refCardList.on('value', snapshot =>{
      const cardsIds = snapshot.val()
      for( let value in cardsIds){
        currentComponent.props.firebase.card([value]).on('value', snapshot1 =>{
          return <CardItem card = {snapshot1.val()} />
        })
      }
    });
this.setState(cards);
}

render()
{
  const {cards} = this.state;
  return (
    <div>
      <Container>
        <Grid container spacing={4}>
          {
            cards.map(
              (value) => {
                return <CardItem card={value}> </CardItem>;
              })
          }
        </Grid>
      </Container>
    </div>
  );
}
}

const CardListBase = compose(
  withFirebase,
    withAuthorization
)(CardList)

export default withFirebase(CardListBase);
