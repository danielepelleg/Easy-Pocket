import React from 'react';
import clsx from "clsx";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
}));

const CostByCategory = (props, className, ...rest) => {
  const classes = useStyles();
  const theme = useTheme();
  const purchases = props.purchases;

  // Create an array which contains the amount of money spent on every category
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

  const categoriesColor = ["#8A7C5C", "#F09240", "#7EF2E7", "#20BD82"];

  // Create an array which contains the Name of the categories
  const categoriesName = ["CLOTHING", "FOOD", "TECHNOLOGY", "CULTURE"];

  const data = {
    datasets: [
      {
        backgroundColor: categoriesColor,
        data: totalExpenses,
        label: "Cost",
        barThickness: 10,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
    labels: categoriesName,
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider,
          },
        },
      ],
    },
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
      <CardHeader title="Cost by Category" />
      <Divider />
      <CardContent>
        <Box height={400} position="relative">
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

CostByCategory.propTypes = {
  className: PropTypes.string,
};

export default CostByCategory;
