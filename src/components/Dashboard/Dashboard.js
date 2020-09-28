import React, { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { Budget, CostByCategory, LatestPurchases, Outgoing, TaskProgress, TrafficByCard, TrafficByCategory } from './components';

import { withFirebase } from "components/Firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      purchases: [],
      cards: [],
    };
  }

  componentDidMount = () => {
    const currentComponent = this;
    let cardsIds = [];
    currentComponent.props.firebase.auth.onAuthStateChanged(function (user) {
      if (user) {
        const uid = currentComponent.props.firebase.auth.currentUser.uid;
        const refCardList = currentComponent.props.firebase.userCards(uid);

        refCardList.once("value").then(function (snapshot) {
          cardsIds = snapshot.val();
          let purchasesList = [];
          let cardsList = [];

          for (let _card in cardsIds) {
            let purchasesIds = [];
            currentComponent.props.firebase
              .card(_card)
              .once("value")
              .then(function (cardSnapshot) {
                if (cardSnapshot.val() !== null) {
                  if (cardSnapshot.val().purchases !== null) {
                    cardsList.push(cardSnapshot.val())
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
                              cards: cardsList
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

  render() {
    const { cards, purchases } = this.state;

    const totalMoney = parseInt(cards.reduce((moneyTotal, card) => moneyTotal + card.money, 0));
    const totalCost = parseInt(cards.reduce((costTotal, card) => costTotal + card.expenses, 0));
    const percentageSpent = parseFloat((totalCost/(totalMoney + totalCost))*100);

    // Purchases Ordered by Date (ASC)
    const sortedPurchases = purchases.slice().sort((a, b) => new Date(a.date) - new Date(b.date) )

    return (
      <div className={this.props.classes.root}>
      <Grid container spacing={2}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget
              totalBudget = {totalMoney}
              totalOutgoings = {totalCost}
            />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Outgoing
              totalOutgoings = {totalCost}
            />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TaskProgress
              percentageSpent = {percentageSpent}
            />
          </Grid>
          <Grid
            item
            lg={2}
            sm={6}
            xl={3}
            xs={12}
          >
            
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
           <LatestPurchases 
              purchases = {sortedPurchases}
           />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByCard  
              cards = {cards}
              totalOutgoings = {totalCost}
            />
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xl={4}
            xs={12}
          >
            <TrafficByCategory  
              purchases = {purchases}
              totalOutgoings = {totalCost}
            />
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            xl={8}
            xs={12}
          >
            <CostByCategory 
              purchases = {purchases}
           />
          </Grid>
        </Grid>
      </Grid>
      </div>
    );
  }
}

const DashboardBase = withFirebase(Dashboard);

export default function UserDashboard() {
  const classes = useStyles();

  return <DashboardBase classes={classes} />;
}
