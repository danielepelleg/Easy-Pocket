import React, { Component } from "react";
import { withFirebase } from "components/Firebase";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { withAuthentication } from "components/Session";
import { compose } from "recompose";

import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

class PurchaseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pidList: [],
      purchases: [],
    };
  }

  render() {
    const { purchases } = this.props;

    return (
      <TableContainer component={Paper}>
        <Table className={this.props.classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>PRODUCT</TableCell>
              <TableCell align="right">DATE</TableCell>
              <TableCell align="right">COST&nbsp;</TableCell>
              <TableCell align="right">CARD&nbsp;</TableCell>
              <TableCell align="right">CATEGORY&nbsp;</TableCell>
              <TableCell align="center">Actions&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.pid}>
                <TableCell component="th" scope="row">
                  {purchase.product}
                </TableCell>
                <TableCell align="right">{purchase.date}</TableCell>
                <TableCell align="right">{purchase.cost} €</TableCell>
                <TableCell align="right">{purchase.card}</TableCell>
                <TableCell align="right">{purchase.category}</TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    onClick={this.deletePurchaseFn(purchase.cid)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  deletePurchaseFn = (key) => {
    this.props.deletePurchaseFn(key);
  };
}

const PurchaseListBase = compose(
  withFirebase,
  withAuthentication
)(PurchaseList);

export default function PurchaseListPage(props) {
  const classes = useStyles();

  return <PurchaseListBase {...props} classes={classes} />;
}
