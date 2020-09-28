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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.yellow[700],
    height: 56,
    width: 56,
  },
  differenceIconN: {
    color: colors.red[900],
  },
  differenceIconP: {
    color: colors.green[600],
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1),
  },
}));

const Outgoings = (props, className, ...rest) => {
  const classes = useStyles();
  const totalOutgoings = props.totalOutgoings;

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL OUTGOINGS
            </Typography>
            <Typography color="textPrimary" variant="h3">
              € {totalOutgoings}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <ShoppingCartIcon />
            </Avatar>
          </Grid>
        </Grid>     
      </CardContent>
    </Card>
  );
};

Outgoings.propTypes = {
  className: PropTypes.string,
};

export default Outgoings;
