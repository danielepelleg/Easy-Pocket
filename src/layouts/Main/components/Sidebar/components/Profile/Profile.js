import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";
import { AuthUserContext, withAuthorization } from "components/Session";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const currentComponent = this;
    this.props.firebase.auth.onAuthStateChanged(function (user) {
      if (user) {
        const uid = currentComponent.props.firebase.auth.currentUser.uid;
        const refUser = currentComponent.props.firebase.user(uid);

        refUser.once("value").then(function (snapshot) {
          currentComponent.setState({ user: snapshot.val() });
        });
      }
    });
  }

  render() {
    const user = {
      avatar: "https://www.flaticon.com/svg/static/icons/svg/848/848006.svg",
      name: this.state.user.name,
    };

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div
            {...this.props.rest}
            className={clsx(this.props.classes.root, this.props.className)}
          >
            <Avatar
              alt="Person"
              className={this.props.classes.avatar}
              component={RouterLink}
              src={user.avatar}
              to="/account"
            />
            <Typography className={this.props.classes.name} variant="h3">
              {authUser.name ? authUser.name : user.name}
            </Typography>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

Profile.propTypes = {
  className: PropTypes.string,
};

/**
 *    *** PROFILE UP PAGE ***
 * Render the Profile Class with custom styles.
 */
export function ProfilePage(props) {
  const classes = useStyles();

  return <Profile {...props} classes={classes} />;
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(ProfilePage);
