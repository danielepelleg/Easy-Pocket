import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const AccountInformation = ({
  cardsNumber,
  paymentsNumber,
  className,
  ...rest
}) => {
  const classes = useStyles();

  //const { cardsNumber, paymentsNumber } = this.props;
  return (
    <Card 
    style = {{ backgroundColor: "#FFFAFA"}}
    className={clsx(classes.root, className)} 
    {...rest}>
      <CardHeader title="User Data Informations" />
      <Divider />
      <CardContent>
        <Box display="flex" justifyContent="center" mt={2}>
          <Grid container spacing={4}>
            <Grid item lg={6} md={6} xl={3} xs={12}>
              <Box key={cardsNumber} p={1} textAlign="center">
                <CreditCardIcon color="action" />
                <Typography color="textPrimary" variant="body1">
                  Total Cards
                </Typography>
                <Typography
                  style={{
                    color: colors.red[600],
                    marginTop: "12px",
                  }}
                  variant="h2"
                >
                  {cardsNumber}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} xl={3} xs={12}>
              <Box key={paymentsNumber} p={1} textAlign="center">
                <ShoppingBasketIcon color="action" />
                <Typography color="textPrimary" variant="body1">
                  Total Payments
                </Typography>
                <Typography
                  style={{
                    color: colors.orange[600],
                    marginTop: "12px",
                  }}
                  variant="h2"
                >
                  {paymentsNumber}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

AccountInformation.propTypes = {
  className: PropTypes.string,
};

export default AccountInformation;
