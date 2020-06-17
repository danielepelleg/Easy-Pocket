import React, {Component} from "react";

/// Components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withAuthorization } from '../../components/Session';

/// Styles
import { makeStyles } from '@material-ui/core/styles';

/// React Router
import {Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

/// Firebase
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

/**
 *    *** FORM STYLES ***
 */
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    width: '90%', // Fix IE 11 issue.
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
  email: '',
  password: '',
  error: null,
};


/**
 * SIGN IN CLASS
 */
class SignIn extends Component {

  /**
   * Class Constructor
   */
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  /**
   *      *** USER AUTHENTICATION ***
   * 
   * Submit the forms. Sign the user in, clear the state 
   * and redirect him to his Home Page.
   */
  onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { 
      email, 
      password, 
      error } = this.state;
 
    const isInvalid = 
      password === '' || 
      email === '';

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
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
              value={email}
              onChange={this.onChange}
              placeholder="Email Address"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={this.onChange}
              placeholder="Password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              disabled={isInvalid}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
            >
              Sign In
            </Button>
            {error && <p>{error.message}</p>}
            <Grid container>
              <Grid item xs>
                <Link 
                  href="#"
                  variant="body2"
                  onClick={this.props.handleFlip}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to = {ROUTES.SIGN_UP} >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    );
  }
}


/**
 *    *** SIGN IN PAGE ***
 * Render the Sign In Class with custom styles.
 */

const condition = authUser => !(!!authUser);

 function SignInPage(props) {
  const classes = useStyles();

  return (
    <SignInBase {...props} classes={classes}/>
  );
}
export default withAuthorization(condition)(SignInPage);

/**
 * Since the higher-order components don't depend on each other, the order doesn't matter. 
 * The compose function applies the higher-order components from right to left.
 */
const SignInBase = compose(
  withRouter,
  withFirebase,
)(SignIn);
 
export { SignInBase };
