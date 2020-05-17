import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Logo from './resources/hand.svg'

import './App.css';

// Import Local Styles
import { useStyles } from "./styles.js";

// JSX
function Home() {
    const classes = useStyles();
    return (
        <Grid container className={classes.container}>
                <Grid container xs={6} justify="center" alignItems="center" >
                    <Grid container className={classes.textBox} >
                        <h1>Pocket Money</h1>
                        <div>
                        <h3>Il modo più semplice per gestire le tue spese. <br></br>
                        Registra le spese che fai, alla gestione ci pensa lui.</h3>
                        </div>
                        <Button variant="contained" className={classes.startButton} disableElevation>
                            Get Started
                        </Button>
                    </Grid>
                </Grid>
                <Grid container xs={6} justify="center" alignItems="center">
                    <Box component="span" className={classes.logoBox} >
                        <img src={Logo} className={classes.logo} alt="Logo" />
                    </Box>
                </Grid>
       </Grid>
    )
}

export default Home;