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

const TrafficByCategory = (props, className, ...rest) => {
  const classes = useStyles();
  const theme = useTheme();

  const purchases = props.purchases;
  const totalOutgoings = props.totalOutgoings;

  const totalExpenses = [0, 0, 0, 0];
  purchases.map(({ cost, category }) => {
    switch (category) {
      case "clothing":
        totalExpenses[0] = totalExpenses[0] + cost
        break;
      case "food":
        totalExpenses[1] = totalExpenses[1] + cost
        break;
      case "technology":
        totalExpenses[2] = totalExpenses[2] + cost
        break;
      case "culture":
        totalExpenses[3] = totalExpenses[3] + cost
        break;
      default:
        break;
    }
    return totalExpenses;
  });

  console.log(totalExpenses)
  const totalExpensesCategory = [0, 0, 0, 0]
  for (let i = 0; i < totalExpenses.length; i++) {
    totalExpensesCategory[i] = parseFloat((totalExpenses[i] * 100) / totalOutgoings).toFixed(2);
  }
  console.log(totalExpensesCategory)

  const categoriesColor = ["#8A7C5C", "#F09240", "#7EF2E7", "#20BD82"];

  const categoriesName = ["CLOTHING", "FOOD", "TECHNOLOGY", "CULTURE"];

  const categoriesPurchase = [
    {
      name: "CLOTHING",
      color: "#8A7C5C",
      cost: totalExpensesCategory[0]
    },
    {
      name: "FOOD",
      color: "#F09240",
      cost: totalExpensesCategory[1]
    },
    {
      name: "TECHNOLOGY",
      color: "#7EF2E7",
      cost: totalExpensesCategory[2]
    },
    {
      name: "CULTURE",
      color: "#20BD82",
      cost: totalExpensesCategory[3]
    },
  ]

  const data = {
    datasets: [
      {
        data: totalExpensesCategory,
        backgroundColor: categoriesColor,
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: categoriesName,
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
      <CardHeader title="TRAFFIC BY CATEGORY" />
      <Divider />
      <CardContent>
        <Box height={250} position="relative">
          <Doughnut data={data} options={options} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {categoriesPurchase.map(({ name, color, cost }) => (
            <Box key={name} p={1} textAlign="center">
              <CreditCardIcon color="action" />
              <Typography color="textPrimary" variant="body1">
                {name}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {cost} %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

TrafficByCategory.propTypes = {
  className: PropTypes.string,
};

export default TrafficByCategory;
