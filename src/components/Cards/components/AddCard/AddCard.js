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
import { TwitterPicker } from "react-color";
import ColorLensIcon from "@material-ui/icons/ColorLens";

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
  name: "",
  owner: "",
  money: "",
  color: "#fff",
  error: null,
  displayColorPicker: false,
};

class AddCard extends Component {
  /**
   * Class Constructor
   */
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  /**
   *      *** CARD REGISTRATION ***
   *
   * Submit the forms. Register a new User's Card.
   */
  onSubmit = (event) => {
    const { name, owner, money, color } = this.state;

    const cardsRef = this.props.firebase.cards();
    const uid = this.props.firebase.auth.currentUser.uid;
    const userCardsListRef = this.props.firebase.userCards(uid);

    let newCardRef = cardsRef.push();

    // New Key ID for the Card
    const newCardId = newCardRef.key;
    newCardRef.set({
      name: name,
      owner: owner,
      money: money,
      color: color,
      [uid]: true,
    });
    const newCard = { newCardId: true };

    // Rewrite the cards list and add the new one
    userCardsListRef.on("value", (snapshot) => {
      const cardsList = snapshot.val();
      if (cardsList) {
        cardsList[newCardId] = true;
        userCardsListRef.set(cardsList);
      } else userCardsListRef.set(newCard);
    });

    this.setState({ ...INITIAL_STATE });
    event.preventDefault();
  };

  /**
   *      *** ON CHANGE METHOD ***
   * Change the State on form's update.
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /**
   * Display the ColorPicker on Click
   */
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  /**
   * Close the ColorPicker
   */
  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  /**
   * Set the Color in the state once it has been chosen
   * @param {color} color
   */
  handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
  };

  render() {
    const { name, owner, money, error } = this.state;

    const isInvalid = name === "" || owner === "" || money === "" || money < 0;

    const popover = {
      position: "absolute",
      zIndex: "2",
    };

    const cover = {
      position: "fixed",
      top: "10px",
      right: "10px",
      bottom: "10px",
      left: "10px",
    };

    return (
      <Card
        style={{ backgroundColor: this.state.color }}
        {...this.props.rest}
        className={clsx(this.props.classes.root, this.props.className)}
      >
        <form autoComplete="off" noValidate onSubmit={this.onSubmit}>
          <CardHeader title="Add a New Card" />

          <Divider />
          <ColorLensIcon
            className="palette-icon"
            color="#eeeeee"
            onClick={this.handleClick}
          />
          {this.state.displayColorPicker ? (
            <div style={popover}>
              <div style={cover} onClick={this.handleClose} />
              <TwitterPicker
                color={this.state.color}
                onChangeComplete={this.handleChangeComplete}
                triangle="hide"
              />
            </div>
          ) : null}

          <CardContent>
            <Grid container spacing={1}>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Card name"
                  margin="dense"
                  name="name"
                  onChange={this.onChange}
                  required
                  value={this.state.name}
                  placeholder="Card name"
                  variant="outlined"
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Owner"
                  margin="dense"
                  name="owner"
                  onChange={this.onChange}
                  required
                  value={this.state.owner}
                  variant="outlined"
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Money"
                  margin="dense"
                  name="money"
                  onChange={this.onChange}
                  type="number"
                  value={this.state.money}
                  variant="outlined"
                />
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
}

AddCard.propTypes = {
  className: PropTypes.string,
};

const AddCardBase = compose(withFirebase, withAuthentication)(AddCard);

export { AddCardBase };

/**
 *    *** ADD CARD FORM ***
 * Render the Add Card Form with custom styles.
 */
export default function AddCardForm() {
  const classes = useStyles();

  return <AddCardBase classes={classes} />;
}
