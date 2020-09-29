import React from "react";

/// Components
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Logo from "../../resources/hand.svg";

/// React Router
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";

/// Styles
import "App.css";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../Firebase";
import MediaQuery from "react-responsive";

/**
 *    *** FORM STYLES ***
 */
const useStyles = makeStyles((theme) => ({
  textBox: {
    flexDirection: "column",
    backgroundColor: "rgba(232, 49, 12, .75)",
    boxShadow: "0 2px 3px 0 rgba(255, 255, 255, .4)",
    borderRadius: 12,
    width: "80%",
    padding: "0 20px 20px",
    color: "white",
    justifyContent: "center",
  },

  logoBox: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "90vh",
  },

  logo: {
    height: "70%",
    width: "70%",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  startButton: {
    border: 0,
    borderRadius: 12,
    boxShadow: "0 1px 1px 1px rgba(255, 255, 255, .4)",
    color: "white",
    height: "50px",
    width: "32%",
    padding: "0 30px",
    background: "linear-gradient(45deg, #ff8e53 30%, #ffb00d 90%)",
    marginTop: theme.spacing(5),
  },
}));

/**
 *    *** SIGN IN PAGE ***
 * Render the Main Page with custom styles.
 */
const Main = () => {
  let redirect = null;
  if (!!firebase.authUser) redirect = ROUTES.SIGN_IN;
  else redirect = ROUTES.DASHBOARD;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MediaQuery query="(min-device-width: 960px)">
      <Grid container>
        <Grid item lg={6} xl={6} md={6} xs={12} className={classes.container}>
          <Grid container className={classes.logoBox}>
            <img src={Logo} className={classes.logo} alt="Logo" />
          </Grid>
        </Grid>
        <Grid item lg={6} xl={6} md={6} xs={12} className={classes.container}>
          <Grid container className={classes.textBox}>
            <h1>Pocket Money</h1>
            <div>
              <h3>
                The easiest way to manage your outgoings. <br></br>
                Save your purchases, we take care of their management.
              </h3>
            </div>
            <Grid item xs={12}>
              <Link to={redirect}>
                <Button variant="contained" className={classes.startButton}>
                  Get Started
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </MediaQuery>
      <MediaQuery query="(max-device-width: 959px)">
      <Grid container>
        <Grid item lg={6} xl={6} md={6} xs={12} className={classes.container}>
            <img src={Logo} className={classes.logo} alt="Logo" />
        </Grid>
        <Grid item lg={6} xl={6} md={6} xs={12} className={classes.container}>
          <Grid container className={classes.textBox}>
            <h1>Pocket Money</h1>
            <div>
              <h3>
                The easiest way to manage your outgoings. <br></br>
                Save your purchases, we take care of their management.
              </h3>
            </div>
            <Grid item xs={12}>
              <Link to={redirect}>
                <Button variant="contained" className={classes.startButton}>
                  Get Started
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </MediaQuery>
    </div>
  );
};

export default Main;
