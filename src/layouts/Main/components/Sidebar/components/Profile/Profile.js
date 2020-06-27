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

  render() {
    const user = {
      avatar: "/images/avatars/avatar_11.png",
      bio: "User",
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
              to="/settings"
            />
            <Typography className={this.props.classes.name} variant="h4">
              {authUser.name}
            </Typography>
            <Typography variant="body2">{user.bio}</Typography>
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
