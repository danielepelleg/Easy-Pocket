import React, { Component } from "react";
import { withFirebase } from "components/Firebase";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { withAuthentication } from "components/Session";
import { compose } from "recompose";

class PurchaseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pidList: [],
      products: [],
    };
  }

  componentWillMount = () => {
  }

  render() {
    const { purchases } = this.props;

    return (
      <div>
        <Container>
          <Grid container spacing={4}>
            {/*
            {cards.map((_card) => {
              return (
                <PurchaseItem 
                  card = {_card} 
                  key = {_card.cid}
                  deleteCardFn = {() => { 
                    this.deleteCardList(_card.cid); 
                  }}
                ></PurchaseItem>
              );
            })}
           */}
          </Grid>
        </Container>
      </div>
    );
  }

  deleteCardList = key => {
    this.props.deleteCardFn(key);
  }
}

const PurchaseListBase = compose(withFirebase, withAuthentication)(PurchaseList);

export default function PurchaseListPage(props) {
  return <PurchaseListBase {...props} />;
}
