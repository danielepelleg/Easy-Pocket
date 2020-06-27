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

/**
 *    *** FORM STYLES ***
 */
const useStyles = makeStyles((theme) => ({
  textBox: {
    flexDirection: "column",
    backgroundColor: "rgba(232, 49, 12, .75)",
    boxShadow: "0 2px 3px 0 rgba(255, 255, 255, .4)",
    borderRadius: 12,
    width: "70%",
    padding: "0 30px 30px",
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
    height: 400,
    width: 400,
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
    height: "40px",
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
  else redirect = ROUTES.HOME;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6} className={classes.container}>
          <Grid container className={classes.textBox}>
            <h1>Pocket Money</h1>
            <div>
              <h3>
                Il modo più semplice per gestire le tue spese. <br></br>
                Registra le spese che fai, alla gestione ci pensa lui.
              </h3>
            </div>
            <Link to={redirect}>
              <Button variant="contained" className={classes.startButton}>
                Get Started
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={6} className={classes.container}>
          <Grid container className={classes.logoBox}>
            <img src={Logo} className={classes.logo} alt="Logo" />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
