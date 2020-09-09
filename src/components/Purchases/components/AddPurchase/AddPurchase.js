import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Button,
  CardHeader,
  Grid,
  TextField,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

/// Firebase
import { withFirebase } from "components/Firebase";
import { withAuthentication } from "components/Session";
import { compose } from "recompose";

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: "flex",
  },
  avatar: {
    marginLeft: "auto",
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
}));

/**
 *  *** INITIAL STATE ***
 * Used to reset the Card state once the User register a new card.
 */
const INITIAL_STATE = {
  product: "",
  cost: "",
  card: "",
  category: "",
  error: null,
};

class AddPurchase extends Component {
  /**
   * Class Constructor
   */
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE, date: "", cards: [] };
  }

  UNSAFE_componentWillMount() {
    // Set the today date to state
    const now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = now.getFullYear() + "-" + month + "-" + day;
    this.setState({ date: today });

    // Set the card list to state
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
                    money: parseInt(snapshot1.val().money),
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

  /**
   *      *** ON CHANGE METHOD ***
   * Change the State on form's update.
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { product, date, cost, card, category, cards, error } = this.state;

    // Define the Purchase's Categories
    const categories = [
      {
        value: "clothing",
        label: "Clothing",
      },
      {
        value: "food",
        label: "Food",
      },
      {
        value: "technology",
        label: "Technology",
      },
      {
        value: "culture",
        label: "Culture",
      },
    ];

    const isInvalid =
      product === "" ||
      date === "" ||
      cost === "" ||
      cost < 0 ||
      category === "" ||
      card === "" ||
      cost > card.money;

    return (
      <Card
        style={{ backgroundColor: "#FFE8AB" }}
        {...this.props.rest}
        className={clsx(this.props.classes.root, this.props.className)}
      >
        <form autoComplete="off" noValidate onSubmit={this.onSubmit}>
          <CardHeader title="Save a New Purchase" />

          <Divider />

          <CardContent>
            <Grid container spacing={1}>
              <Grid item md={12} xs={12}>
                <TextField
                  // *** PRODUCT NAME ***
                  fullWidth
                  label="Product Name"
                  margin="dense"
                  name="product"
                  onChange={this.onChange}
                  required
                  value={product}
                  placeholder="Product name"
                  variant="outlined"
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  // *** DATE OF PURCHASE ***
                  id="date"
                  label="Purchase Date"
                  type="date"
                  defaultValue={date}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  // *** COST OF THE PRODUCT ***
                  fullWidth
                  label="Cost"
                  margin="dense"
                  name="cost"
                  onChange={this.onChange}
                  type="number"
                  value={cost}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  // CARD OF PURCHASE
                  fullWidth
                  name="card"
                  id="card"
                  select
                  label="Select"
                  value={card}
                  onChange={this.onChange}
                  helperText="Please select one of your card"
                  variant="outlined"
                >
                  {cards.map((option) => (
                    <MenuItem key={option.cid} value={option}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  // *** CATEGORY ***
                  fullWidth
                  label="Select Category"
                  margin="dense"
                  name="category"
                  onChange={this.onChange}
                  select
                  value={category}
                  helperText="Choose a category"
                  variant="outlined"
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>

          <Divider />

          <CardActions>
            <Button
              disabled={isInvalid}
              type="submit"
              className={this.props.classes.uploadButton}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
            {error && <p>{error.message}</p>}
          </CardActions>
        </form>
      </Card>
    );
  }

  /**
   *      *** PURCHASE REGISTRATION ***
   *
   * Submit the forms. Register a new User's Purchase.
   */
  onSubmit = (event) => {
    const { product, date, cost, card, category, cards } = this.state;

    const uid = this.props.firebase.auth.currentUser.uid;
    const cid = card.cid;

    const newPurchase = {
      product: product,
      date: date,
      cost: cost,
      [cid]: true,
      category: category,
      [uid]: true,
    };

    // Update Card state updating money on the card
    for (var i = 0; i < cards.length; i++){
      if (cards[i].cid === cid) {
        cards[i].money = card.money - cost;
      } else cards[i].money = card.money;
    }

    // Reset the forms
    this.setState({ ...INITIAL_STATE });
    event.preventDefault();

    // Add the Card to Firebase
    this.props.addPurchase(newPurchase, card);
  };
}

AddPurchase.propTypes = {
  className: PropTypes.string,
};

const AddPurchaseBase = compose(withFirebase, withAuthentication)(AddPurchase);

export { AddPurchaseBase };

/**
 *    *** ADD CARD FORM ***
 * Render the Add Card Form with custom styles.
 */
export default function AddPurchaseForm(props) {
  const classes = useStyles();

  return <AddPurchaseBase {...props} classes={classes} />;
}
