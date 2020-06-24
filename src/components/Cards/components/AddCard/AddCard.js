import React, {Component} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
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

/// Firebase
import {withFirebase} from "components/Firebase";
import {withAuthentication} from 'components/Session'
import {compose} from "recompose";
import {card} from "../../../../constants/dbStructure";

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
  name: "",
  owner: "",
  money: "",
  color: "",
  error: null,
};

class AddCard extends Component {
  /**
   * Class Constructor
   */
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  /**
   *      *** CARD REGISTRATION ***
   *
   * Submit the forms. Register a new User's Card.
   */
  onSubmit = (event) => {
    const {name, owner, money, color} = this.state;

    const cardsRef = this.props.firebase.cards();
    const uid = this.props.firebase.auth.currentUser.uid;
    const userCardsListRef = this.props.firebase.userCards(uid);


    let newCardRef = cardsRef.push();
    //let newUserCardsListRef = userCardsListRef.push();
    const newCardId = newCardRef.key;
    newCardRef.set({
      name: name,
      owner: owner,
      money: money,
      color: color,
      [uid]: true,
    });
    const newCard = {newCardId: true};


    userCardsListRef.on("value", snapshot => {
      const cardsList = snapshot.val();
      if (cardsList) {
        cardsList[newCardId] = true;
        userCardsListRef.set(cardsList);
      } else
        userCardsListRef.set(newCard);
    })


    event.preventDefault();
  };

  /**
   *      *** ON CHANGE METHOD ***
   * Change the State on form's update.
   */
  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const {name, owner, money, color, error} = this.state;

    const isInvalid = name === "" || owner === "" || money === "";

    const colors = [
      {
        value: "#FF0500",
        label: "Red",
      },
      {
        value: "#FF5000",
        label: "Orange",
      },
      {
        value: "#F50069",
        label: "Pink",
      },
      {
        value: "#FFE781",
        label: "Yellow",
      },
    ];

    return (
      <Card
        {...this.props.rest}
        className={clsx(this.props.classes.root, this.props.className)}
      >
        <form autoComplete="off" noValidate onSubmit={this.onSubmit}>
          <CardHeader title="Add a New Card" subheader="Card Informations:"/>
          <Divider/>
          <CardContent>
            <Grid container spacing={3}>


              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Please specify the card name"
                  label="Card name"
                  margin="dense"
                  name="name"
                  onChange={this.onChange}
                  required
                  value={name}
                  placeholder="Card name"
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Owner"
                  margin="dense"
                  name="owner"
                  onChange={this.onChange}
                  required
                  value={owner}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Money"
                  margin="dense"
                  name="money"
                  onChange={this.onChange}
                  type="number"
                  value={money}
                  helperText="Please specify the money you can spend"
                  variant="outlined"
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Select Color"
                  margin="dense"
                  name="color"
                  onChange={this.onChange}
                  required
                  select
                  SelectProps={{native: true}}
                  value={color}
                  variant="outlined"
                >
                  {colors.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>

              </Grid>
            </Grid>
          </CardContent>
          <Divider/>
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
}

AddCard.propTypes = {
  className: PropTypes.string,
};

const AddCardBase = compose(withFirebase, withAuthentication)(AddCard);

export {AddCardBase};

/**
 *    *** ADD CARD FORM ***
 * Render the Add Card Form with custom styles.
 */
export default function AddCardForm() {
  const classes = useStyles();

  return <AddCardBase classes={classes}/>;
}
