import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: colors.orange[600],
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

const Budget = (props, className, ...rest) => {
  const classes = useStyles();
  const totalBudget = props.totalBudget;
  const totalOutgoings = props.totalOutgoings;

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              BUDGET
            </Typography>
            <Typography color="textPrimary" variant="h3">
              € {totalBudget}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AccountBalanceIcon />
            </Avatar>
          </Grid>
        </Grid>
          {totalBudget > totalOutgoings ? (
            <Box mt={2} display="flex" alignItems="center">
              <ArrowUpwardIcon className={classes.differenceIconP} />
              <Typography color="textSecondary" variant="caption" style={{padding: 5}}>
                POSITIVE BALANCE
              </Typography>
              </Box>
          ) : null}  
          {totalBudget < totalOutgoings ? (
            <Box mt={2} display="flex" alignItems="center">
              <ArrowDownwardIcon className={classes.differenceIconN} />
              <Typography color="textSecondary" variant="caption" style={{padding: 5}}>
                NEGATIVE BALANCE
              </Typography>
              </Box>
          ) : null}        
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string,
};

export default Budget;
