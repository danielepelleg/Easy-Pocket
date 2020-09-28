import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@material-ui/core";

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

class QuoteBase extends Component {
  /**
   * Class Constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      phrase: "",
      author: "",
      color: "",
    };
  }

  render() {
    const { quote } = this.props;

    return (
      <Grid item lg={3} md={6} xl={3} xs={12}>
        <Card
          style={{ backgroundColor: quote.color }}
          {...this.props.rest}
          className={clsx(this.props.classes.root, this.props.className)}
        >

          <CardContent>
            <div className={this.props.classes.details}>
              <div>

                <Typography gutterBottom variant="h4">
                  {quote.phrase} 
                </Typography>

                <Divider />

                <Typography
                  className={this.props.classes.locationText}
                  color="textSecondary"
                  variant="body1"
                >
                  {quote.author}
                </Typography>

              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

QuoteBase.propTypes = {
  className: PropTypes.string,
};

export default function QuoteItem(props) {
  const classes = useStyles();

  return <QuoteBase {...props} classes={classes} />;
}
