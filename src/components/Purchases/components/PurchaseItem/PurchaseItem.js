import React, { Component } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { withFirebase } from "components/Firebase";
import { withAuthentication } from "components/Session";
import { compose } from "recompose";

import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: "flex",
  },
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
}));

class PurchaseBase extends Component {
  /**
   * Class Constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      pid: "",
      product: "",
      date: "",
      cost: "",
      cid: "",
      category: "",
    };
  }

  render() {
    const { purchase } = this.props;

    return (
      <div>
          <TableCell component="th" scope="row">
            {purchase.product}
          </TableCell>
          <TableCell align="right">{purchase.date}</TableCell>
          <TableCell align="right">{purchase.cost}</TableCell>
          <TableCell align="right">{purchase.card}</TableCell>
          <TableCell align="right">{purchase.category}</TableCell>
      </div>
    );
  }

  /**
   * Delete a Card from Firebase
   */
  deletePurchaseItem = (key) => {
    this.props.deletePurchaseFn(key);
  };
}

PurchaseBase.propTypes = {
  className: PropTypes.string,
};

const PurchaseItemBase = compose(
  withFirebase,
  withAuthentication
)(PurchaseBase);

export default function PurchaseItem(props) {
  const classes = useStyles();

  return <PurchaseItemBase {...props} classes={classes} />;
}
