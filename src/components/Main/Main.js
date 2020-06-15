import React from "react";

/// Components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Logo from "../../resources/hand.svg";

/// React Router
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";

/// Styles
import "App.css";
import { makeStyles } from "@material-ui/core/styles";

/**
 *    *** FORM STYLES ***
 */
const useStyles = makeStyles((theme) => ({
  textBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    //background: "linear-gradient(45deg, #ff5900 20%, #FF8E53 90%)",
    backgroundColor: "rgba(232, 49, 12, .75)",
    boxShadow: "0 2px 3px 0 rgba(255, 255, 255, .4)",
    borderRadius: 12,
    width: "70%",
    height: "50%",
    padding: "0 30px 30px",
    textAlign: "center",
    color: "white",
  },

  logoBox: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "90vh",
  },

  logo: {
    height: 400,
    width: 400,
  },

  container: {},

  startButton: {
    border: 0,
    borderRadius: 12,
    boxShadow: "0 1px 1px 1px rgba(255, 255, 255, .4)",
    color: "white",
    height: 40,
    width: 170,
    padding: "0 30px",
    alignSelf: "center",
    background: "linear-gradient(45deg, #ff8e53 30%, #ffb00d 90%)",
    backgroundColor: "#FFB00D",
    marginTop: 30,
  },
}));

/**
 *    *** SIGN IN PAGE ***
 * Render the Main Page with custom styles.
 */
const Main = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.container}>
        <Grid container xs={6} justify="center" alignItems="center">
          <Box container className={classes.textBox}>
            <h1>Pocket Money</h1>
            <div>
              <h3>
                Il modo più semplice per gestire le tue spese. <br></br>
                Registra le spese che fai, alla gestione ci pensa lui.
              </h3>
            </div>
            <Link to={ROUTES.SIGN_IN}>
              <Button variant="contained" className={classes.startButton}>
                Get Started
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid container xs={6} justify="center" alignItems="center">
          <Box component="span" className={classes.logoBox}>
            <img src={Logo} className={classes.logo} alt="Logo" />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
