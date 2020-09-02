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
  date: "",
  cost: "",
  category: "",
  error: null,
};

class AddPurchase extends Component {
  /**
   * Class Constructor
   */
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE, todayDate: "" };
  }

  UNSAFE_componentWillMount() {
    const now = new Date();
    let month = (now.getMonth() + 1);               
    let day = now.getDate();

    if (month < 10) 
        month = "0" + month;
    if (day < 10) 
        day = "0" + day;
    var today = now.getFullYear() + "-" + month + "-" + day;
    this.setState({ todayDate: today });
  }

  /**
   *      *** ON CHANGE METHOD ***
   * Change the State on form's update.
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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
    const { product, date, cost, category, todayDate, error } = this.state;

    // Define the Purchase's Categories
    const categories = [
      {
        value: 'clothing',
        label: 'Clothing'
      },
      {
        value: 'food',
        label: 'Food'
      },
      {
        value: 'technology',
        label: 'Technology'
      },
      {
        value: 'culture',
        label: 'Culture'
      }
    ];

    const isInvalid = product === "" || date === "" || cost === "" || cost < 0 || category === "";

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
                  fullWidth
                  label="Product name"
                  margin="dense"
                  name="name"
                  onChange={this.onChange}
                  required
                  value={product}
                  placeholder="Product name"
                  variant="outlined"
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
                  id="date"
                  label="Purchase Date"
                  type="date"
                  value={date}
                  defaultValue={todayDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item md={12} xs={12}>
                <TextField
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
                fullWidth
                label="Select Category"
                margin="dense"
                name="category"
                onChange={this.onChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={category}
                variant="outlined"
              >
                {categories.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
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
   *      *** CARD REGISTRATION ***
   *
   * Submit the forms. Register a new User's Card.
   */
  onSubmit = (event) => {};
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
