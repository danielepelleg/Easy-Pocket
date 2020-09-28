import React, { Component } from "react";
import PropTypes from "prop-types";
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
import InputAdornment from '@material-ui/core/InputAdornment';
import PublicIcon from '@material-ui/icons/Public';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';

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
  surname: "",
  date: "",
  sex: "",
  phone: "",
  country: "",
};

class UpdateAccount extends Component {
  /**
   * Class Constructor
   */
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE };
  }

  /**
   *      *** ON CHANGE METHOD ***
   * Change the State on form's update.
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /**
   *      *** USER UPDATE ***
   *
   * Submit the forms. Register a new User's Informations.
   */
  onSubmit = (event) => {
    const { name, surname, date, sex, phone, country } = this.state;

    const userData = {
      name: name,
      surname: surname,
      birth: date,
      gender: sex,
      phone: phone,
      country: country,
    };

    // Reset the forms
    this.setState({ ...INITIAL_STATE });
    event.preventDefault();

    // Add the Card to Firebase
    this.props.updateUser(userData);
  };

  render() {
    const { user } = this.props;
    const { name, surname, date, sex, phone, country, error } = this.state;

    const isInvalid =
      name === "" ||
      surname === "" ||
      date === "" ||
      sex === "" ||
      phone === "" ||
      country === "" ||
      phone < 0;

    // Define the User's Gender
    const gender = [
      {
        value: "M",
        label: "MALE",
      },
      {
        value: "F",
        label: "FEMALE",
      },
    ];

    return (
    <Card style={{ backgroundColor: "#FEE7EA" }}>
      <form autoComplete="on" noValidate onSubmit={this.onSubmit}>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                // *** NAME ***
                fullWidth
                label="First Name"
                placeholder={user.name}
                margin="dense"
                name="name"
                onChange={this.onChange}
                value={name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                // *** LAST NAME ***
                fullWidth
                label="Last Name"
                placeholder={user.surname}
                margin="dense"
                name="surname"
                onChange={this.onChange}
                value={surname}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                // *** DATE OF BIRTH ***
                fullWidth
                id="date"
                name="date"
                label="Date of Birth"
                type="date"
                defaultValue={date}
                helperText={user.birth}
                onChange={this.onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                // *** GENDER ***
                fullWidth
                label="Select Gender"
                placeholder={user.gender}
                margin="dense"
                name="sex"
                onChange={this.onChange}
                select
                value={sex}
                variant="outlined"
              >
                {gender.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                // *** PHONE NUMBER ***
                fullWidth
                label="Phone Number"
                placeholder={user.phone}
                margin="dense"
                name="phone"
                onChange={this.onChange}
                type="number"
                value={phone}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIphoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                // *** COUNTRY ***
                fullWidth
                label="Country"
                placeholder={user.country}
                margin="dense"
                name="country"
                onChange={this.onChange}
                value={country}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PublicIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button 
            disabled={isInvalid}
            type="submit"
            color="primary" 
            variant="contained">
            Save details
          </Button>
          {error && <p>{error.message}</p>}
        </CardActions>
      </form>
    </Card>
    );
  }
}

UpdateAccount.propTypes = {
  className: PropTypes.string,
};

const UpdateAccountBase = compose(withFirebase, withAuthentication)(UpdateAccount);

export { UpdateAccountBase };

/**
 *    *** ADD CARD FORM ***
 * Render the Add Card Form with custom styles.
 */
export default function UpdateAccountForm(props) {
  const classes = useStyles();

  return <UpdateAccountBase {...props} classes={classes} />;
}
