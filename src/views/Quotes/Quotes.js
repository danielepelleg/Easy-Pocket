import React, { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Card, CardHeader } from "@material-ui/core";

import { QuoteList } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  textBox: {
    flexDirection: "column",
    backgroundColor: "rgba(232, 49, 12, .75)",
    boxShadow: "0 2px 3px 0 rgba(255, 255, 255, .4)",
    borderRadius: 12,
    width: "70%",
    padding: "0 30px 30px",
    color: "white",
    justifyContent: "center",
  },
}));

class Quote extends Component {

  render() {

    const quotes = [
      {
        number: 1,
        phrase: "Never spend your money before you have earned it.",
        author: "Thomas Jefferson",
        color: "#FFD89C"
      },
      {
        number: 2,
        phrase: "It’s good to have money and the things that money can buy, but it’s good, too, to check up once in a while and make sure that you haven’t lost the things that money can’t buy.",
        author: "George Lorimer",
        color: "#FFF7EB"
      },
      {
        number: 3,
        phrase: "There is a gigantic difference between earning a great deal of money and being rich.",
        author: "Marlene Dietrich",
        color: "#ADE533"
      },
      {
        number: 4,
        phrase: "Money is usually attracted, not pursued.",
        author: "Jim Rohn",
        color: "#ECFFC3"
      },
      {
        number: 5,
        phrase: "If we command our wealth, we shall be rich and free. If our wealth commands us, we are poor indeed.",
        author: "Edmund Burke",
        color: "#A5FFBD"
      },
      {
        number: 6,
        phrase: "A simple fact that is hard to learn is that the time to save money is when you have some.",
        author: "Joe Moore",
        color: "#E1FFE9"
      },
      {
        number: 7,
        phrase: "Don’t tell me where your priorities are. Show me where you spend your money and I’ll tell you what they are.",
        author: "James W. Frick",
        color: "#FFA5F9"
      },
      {
        number: 8,
        phrase: "If you would be wealthy, think of saving as well as getting.",
        author: "Benjamin Franklin",
        color: "#FFE1FC"
      },
      {
        number: 9,
        phrase: "Many folks think they aren’t good at earning money, when what they don’t know is how to use it.",
        author: "Frank A. Clark",
        color: "#97ADFF"
      },
      {
        number: 10,
        phrase: "Many people take no care of their money till they come nearly to the end of it, and others do just the same with their time.",
        author: "Johann Wolfgang von Goethe",
        color: "#BECCFF"
      },
      {
        number: 11,
        phrase: "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
        author: "Ayn Rand",
        color: "#F9e98d"
      },
      {
        number: 12,
        phrase: "Money is a terrible master but an excellent servant.",
        author: "P.T Barnum",
        color: "#fbf1ba"
      },
      {
        number: 13,
        phrase: "You must gain control over your money or the lack of it will forever control you.",
        author: "Dave Ramsey",
        color: "#C1D9A5"
      },
      {
        number: 14,
        phrase: "A wise person should have money in their head, but not in their heart.",
        author: "Jonathan Swift",
        color: "#E7F7D4"
      },
      {
        number: 15,
        phrase: "Money are like time, if you suck at their management you are a goner for the rest of your life.",
        author: "Daniel Pilgrims",
        color: "#F1836D"
      },
      {
        number: 16,
        phrase: "The quickest way to double your money is to fold it in half and put it in your back pocket.",
        author: "Will Rogers",
        color: "#F8C1B6"
      },
    ];

    return (
      <div className={this.props.classes.root}>
        <Grid container spacing={4}>
        <Grid item lg={3} md={3} xl={3} xs={3}></Grid>
        <Grid item lg={6} md={6} xl={6} xs={6}>
        <Card style={{ backgroundColor: "#E8310C", opacity: 0.85}}>
          <CardHeader
            titleTypographyProps={{ component: "h1", variant: "h1" }}
            title= "TO BUY OR NOT TO BUY ?"
          />
          </Card>
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <QuoteList quotes={quotes} />
          </Grid>
        </Grid>
        <Grid item lg={3} md={3} xl={3} xs={3}></Grid>
      </div>
    );
  }
}

export default function QuotesPage() {
  const classes = useStyles();

  return <Quote classes={classes} />;
}
