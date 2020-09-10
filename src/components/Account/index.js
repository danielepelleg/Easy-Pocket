import React, { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { withFirebase } from "components/Firebase";
import theme from "theme";
import { UpdateAccount, AccountInformation } from "./components";

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(4),
    paddingLeft: "15%",
  },
}));

class AccountDetails extends Component {
  /**
   * Class Constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      cards: "",
      nCard: "",
      purchases: "",
      nPurchases: "",
      user: "",
    };
  }

  componentDidMount = () => {
    const currentComponent = this;
    currentComponent.props.firebase.auth.onAuthStateChanged(function (user) {
      if (user) {
        const uid = currentComponent.props.firebase.auth.currentUser.uid;
        const refCardList = currentComponent.props.firebase.userCards(uid);
        const userPurchasesListRef = currentComponent.props.firebase.userPurchases(
          uid
        );
        const authUser = currentComponent.props.firebase.user(uid);

        // Set the current User into the State
        authUser.once("value", (snapshot) => {
          currentComponent.setState({ user: snapshot.val() });
        });

        // Set the User's Cards in to the State, their amount and the amount of valid Purchases Ref
        let cardsIds = [];
        refCardList.once("value").then(function (snapshot) {
          cardsIds = snapshot.val();
          currentComponent.setState({
            cards: cardsIds,
            nCard: Object.keys(cardsIds).length,
          });
          let purchasesList = [];
          for (let _card in cardsIds) {
            let purchasesIds = [];
            currentComponent.props.firebase
              .card(_card)
              .once("value")
              .then(function (cardSnapshot) {
                if (cardSnapshot.val() !== null) {
                  if (cardSnapshot.val().purchases) {
                    purchasesIds = cardSnapshot.val().purchases;
                    for (let _purchase in purchasesIds){
                      purchasesList[_purchase] = true;
                    }
                  }
                  currentComponent.setState({
                    nPurchases: Object.keys(purchasesList).length,
                  });
                }
              });
          }
        });

        // Set the User Purchases into the State
        userPurchasesListRef.once("value", (snapshot) => {
          const purchasesList = snapshot.val();
          if (purchasesList) {
            currentComponent.setState({ purchases: purchasesList });
          }
        });
      } else {
        console.error("No User signed in");
      }
    });
  };

  /**
   *      *** ON CHANGE METHOD ***
   * Change the State on form's update.
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /**
   * Update the User Informations in Firebase.
   * Save the new purchase in a collection /purchases with its pid (purchase id),
   *  and save the foreign key to the user's object purchases in the user's collection.
   *
   * @param {the purchase to add} newCard
   */
  updateUser = async (userData) => {
    const { user } = this.state;
    const uid = this.props.firebase.auth.currentUser.uid;

    userData.email = user.email;
    userData.purchases = user.purchases;
    userData.cards = user.cards;

    console.log(userData);

    this.props.firebase
      .user(uid)
      .set(userData)
      .then(function () {
        console.log("User data updated succesfully");
      })
      .catch((error) => {
        console.log("Error updating the user's data");
      });

    this.setState({ user: userData });
  };

  render() {
    const { nCard, nPurchases, user } = this.state;

    return (
      <div className={this.props.classes.root}>
        <Grid container spacing={2}>
          <Grid item lg={10} md={6} xl={3} xs={12}>
            <UpdateAccount 
            user={user} 
            updateUser={this.updateUser} />
          </Grid>
          <Grid item lg={10} md={6} xl={3} xs={12}>
            <AccountInformation
              cardsNumber={nCard}
              paymentsNumber={nPurchases}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const AccountBase = withFirebase(AccountDetails);

export default function Account(props) {
  const classes = useStyles();

  return <AccountBase {...props} classes={classes} />;
}
