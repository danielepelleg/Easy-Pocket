import React, {Component} from "react";

/// Components
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

/// Styles
import { makeStyles } from "@material-ui/core/styles";

/// React Router
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from '../constants/routes';

/// Firebase
import { withFirebase } from './Firebase';
import { compose } from 'recompose';

/**
 *    *** FORM STYLES ***
 */
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
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
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};


/**
 * SIGN UP CLASS
 */
class SignUp extends Component {

  /**
   * Class Constructor
   */
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  /**
   *      *** USER REGISTRATION ***
   * 
   * Submit the forms. Sign the user up, clear the state 
   * and redirect him to his Home Page.
   */
  onSubmit = (event) => {
    const {email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.MAIN);
      })
      .catch(error => {
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
    const {
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={this.props.classes.form} onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  placeholder="Email Address"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  placeholder="Password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  placeholder="Confirm Password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              disabled={isInvalid}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
            >
              Sign Up
            </Button>
            {error && <p>{error.message}</p>}
            <Grid container justify="flex-end">
              <Grid item>
                <Link to = {ROUTES.SIGN_IN} >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}></Box>
      </Container>
    );
  }
}


/**
 *    *** SIGN UP PAGE ***
 * Render the Sign Up Class with custom styles.
 */
export default function SignUpPage() {
  const classes = useStyles();

  return (
    <SignUpBase classes={classes}/>
  );
}

/**
 * Since the higher-order components don't depend on each other, the order doesn't matter. 
 * The compose function applies the higher-order components from right to left.
 */
const SignUpBase = compose(
  withRouter,
  withFirebase,
)(SignUp);

export {SignUp};
