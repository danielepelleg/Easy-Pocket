import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";
import { withFirebase } from "components/Firebase";

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
      loading: false,
      name: "",
      surname: "",
    };
  }

  /**
   * Load User Data
   */
  componentDidMount() {
    let currentComponent = this;
    this.setState({ loading: true });

    this.props.firebase
      .authUser()
      .once("value")
      .then((snapshot) => {

        if (snapshot.val() !== null) {
          currentComponent.setState({
            name: snapshot.val().name,
            surname: snapshot.val().surname,
          });
        }
      })
      .catch(console.error);
  }

  componentWillUnmount() {
    this.props.firebase.authUser().off();
  }

  render() {
    const user = {
      name: "Shen Zhi",
      avatar: "/images/avatars/avatar_11.png",
      bio: "User",
    };

    return (
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
          {this.state.name}
        </Typography>
        <Typography variant="body2">{user.bio}</Typography>
      </div>
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

export default withFirebase(ProfilePage);
