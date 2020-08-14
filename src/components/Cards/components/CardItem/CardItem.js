import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import { withFirebase } from "components/Firebase";
import { withAuthentication } from "components/Session";
import { compose } from "recompose";

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

class CardBase extends Component {
  /**
   * Class Constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      cid: "",
      name: "",
      owner: "",
      money: "",
      color: "",
    };
  }

  /**
   * Set the State with 
   *  Card's Informations
   */
  componentDidMount = () => {
  };

  render() {
    const { card } = this.props;

    return (
      <Grid item lg={3} md={6} xl={3} xs={12}>
        <Card
          style={{ backgroundColor: card.color }}
          {...this.props.rest}
          className={clsx(this.props.classes.root, this.props.className)}
        >
          <CardHeader
            titleTypographyProps={{ variant: "h2" }}
            title={card.name}
          />
          <Divider />
          <CardContent>
            <div className={this.props.classes.details}>
              <div>
                <Typography gutterBottom variant="h4">
                  {card.money} €
                </Typography>
                <Typography
                  className={this.props.classes.locationText}
                  color="textSecondary"
                  variant="body1"
                >
                  {card.owner}
                </Typography>
              </div>
            </div>
          </CardContent>

          <Divider />

          <CardActions>
            <Button className={this.props.classes.uploadButton} variant="text">
              EDIT
            </Button>

            <Button 
            variant="text" 
            onClick={() => {
              this.deleteCardItem(card.cid);
            }}>
              DELETE
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }

  /**
   *      *** DELETE CARD METHOD ***
   * Delete a Card Item.
   */
  deleteCardItem = key => {
    this.props.deleteCardFn(key);
  }
}

CardBase.propTypes = {
  className: PropTypes.string,
};

const CardItemBase = compose(withFirebase, withAuthentication)(CardBase);

export default function CardItem(props) {
  const classes = useStyles();

  return <CardItemBase {...props} classes={classes} />;
}
