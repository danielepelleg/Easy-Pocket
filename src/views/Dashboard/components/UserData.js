import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.blue[700],
    height: 56,
    width: 56,
  },
}));

const UserData = (props, className, ...rest) => {
  const classes = useStyles();
  const user = props.user;

  return (
    <Card className={clsx(classes.root, className)} {...rest} style={{backgroundColor: "#E2F9F9"}}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textPrimary" variant="h3">
              {user.name}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {user.surname}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AccountCircleIcon />
            </Avatar>
          </Grid>
        </Grid>     
      </CardContent>
    </Card>
  );
};

UserData.propTypes = {
  className: PropTypes.string,
};

export default UserData;
