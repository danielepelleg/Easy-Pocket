import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { withAuthorization } from '../../components/Session';


/* {
import {
    Budget,
    TotalUsers,
    TasksProgress,
    TotalProfit,
    UsersByDevice,
    LatestProducts,
    LatestOrders
} from './HomeComponents'; } */

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing
    }
}));

const Home = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={4}
            >
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    {/* <Budget /> */}
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    {/* <TotalUsers /> */}
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    {/* <TasksProgress /> */}
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    {/* <TotalProfit /> */}
                </Grid>
                <Grid
                    item
                    lg={4}
                    md={6}
                    xl={3}
                    xs={12}
                >
                    {/* <UsersByDevice /> */}
                </Grid>
                <Grid
                    item
                    lg={4}
                    md={6}
                    xl={3}
                    xs={12}
                >
                    {/* <LatestProducts /> */}
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={12}
                    xl={9}
                    xs={12}
                >
                   {/* <LatestOrders /> */}
                </Grid>
            </Grid>
        </div>
    );
};

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(Home);