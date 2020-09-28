import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import QuoteItem from "../QuoteItem";

class QuoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  render() {
    const { quotes } = this.props;

    return (
      <div>
        <Container>
          <Grid container spacing={4}>
            {quotes.map((_quote) => {
              return (
                <QuoteItem 
                  quote = {_quote} 
                  key = {_quote.number}
                ></QuoteItem>
              );
            })}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default function QuoteListPage(props) {
  return <QuoteList {...props} />;
}
