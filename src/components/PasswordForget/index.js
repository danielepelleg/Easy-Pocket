import React, { Component } from "react";

/// Components
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

/// Styles
import { makeStyles } from "@material-ui/core/styles";

/// React Router
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

/// Firebase
import { withFirebase } from "../Firebase";

/**
 *    *** FORM STYLES ***
 */
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, .75)",
    borderRadius: "12px",
    paddingTop: "15px",
    paddingBottom: "15px",
    color: "black",
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

/**
 *  *** INITIAL STATE ***
 * Used to reset the Login state once the User signs-in.
 */
const INITIAL_STATE = {
  email: "",
  error: null,
};

class PasswordForget extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  /**
   *      *** ON CHANGE METHOD ***
   * Change the State on form's update.
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h5" variant="h5">
            Password Forget
          </Typography>
          <form className={this.props.classes.form} onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Email Address"
              autoComplete="email"
              autoFocus
            />
            <Button
              disabled={isInvalid}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
            >
              Reset my Password
            </Button>
            {error && <p>{error.message}</p>}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" onClick={this.props.handleFlip}>
                  Already have an account? Sign In
                </Link>
              </Grid>
              <Grid item>
                <Link to={ROUTES.SIGN_UP}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    );
  }
}

/**
 *    *** PASSWORD FORGET PAGE ***
 * Render the Password Forget Class with custom styles.
 */
export default function PasswordForgetPage(props) {
  const classes = useStyles();

  return <PasswordForgetBase {...props} classes={classes} />;
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

const PasswordForgetBase = withFirebase(PasswordForget);

export { PasswordForgetLink };