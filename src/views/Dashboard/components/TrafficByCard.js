import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const TrafficByCard = (props, className, ...rest) => {
  const classes = useStyles();
  const theme = useTheme();

  const cards = props.cards;
  const totalOutgoings = props.totalOutgoings;

  const totalExpenses = [];
  cards.map(({ expenses }) =>
    totalExpenses.push(parseFloat((expenses / totalOutgoings) * 100).toFixed(2))
  );

  const cardsColor = [];
  cards.map(({ color }) => cardsColor.push(color));

  const cardsName = [];
  cards.map(({ name }) => cardsName.push(name));

  const data = {
    datasets: [
      {
        data: totalExpenses,
        backgroundColor: cardsColor,
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: cardsName,
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="TRAFFIC BY CARD" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Doughnut data={data} options={options} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {cards.map(({ color, name, expenses }) => (
            <Box key={name} p={1} textAlign="center">
              <CreditCardIcon color="action" />
              <Typography color="textPrimary" variant="body1">
                {name}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {parseFloat((expenses / totalOutgoings) * 100).toFixed(2)}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

TrafficByCard.propTypes = {
  className: PropTypes.string,
};

export default TrafficByCard;
