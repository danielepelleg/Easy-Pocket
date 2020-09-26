import React from "react";
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
  colors,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
}));

const LatestPurchases = (props, className, ...rest) => {
  const classes = useStyles();
  const theme = useTheme();
  const purchases = props.purchases;

  // Create an array which contains the Latest 7 Purchases Cost
  const purchasesCost = [];
  purchases.map(({ cost }) => {
    if (purchasesCost.length < 8) 
        purchasesCost.push(cost);
    return purchasesCost;
  });

  // Create an array which contains the Latest 7 Purchases Date
  const purchasesDate = [];
  purchases.map(({ date }) => {
    const purchaseDate = new Date(date);
    let month;
    switch (purchaseDate.getMonth()) {
      case 1:
        month = "Jan";
        break;
      case 2:
        month = "Feb";
        break;
      case 3:
        month = "Mar";
        break;
      case 4:
        month = "Apr";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "Jun";
        break;
      case 7:
        month = "Jul";
        break;
      case 8:
        month = "Aug";
        break;
      case 9:
        month = "Sep";
        break;
      case 10:
        month = "Oct";
        break;
      case 11:
        month = "Nov";
        break;
      case 12:
        month = "Dec";
        break;
      default:
        break;
    }
    const fullDate = purchaseDate.getDate() + " " + month;
    if (purchasesDate.length < 8) purchasesDate.push(fullDate);
    return purchaseDate;
  });

  const data = {
    datasets: [
      {
        backgroundColor: colors.orange[800],
        data: purchasesCost,
        label: "Cost",
        barThickness: 10,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
    labels: purchasesDate,
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
      <CardHeader title="Latest 7 Purchases" />
      <Divider />
      <CardContent>
        <Box height={430} position="relative">
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

LatestPurchases.propTypes = {
  className: PropTypes.string,
};

export default LatestPurchases;
