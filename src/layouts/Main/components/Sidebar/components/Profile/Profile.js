import React, {useContext} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Avatar, Typography} from '@material-ui/core';
import { AuthUserContext } from 'components/Session';
import { FirebaseContext } from 'components/Firebase';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

class user {
  constructor() {
  }

}

const Profile = props => {
  const {className, ...rest} = props;

  const classes = useStyles();

  var name;
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  firebase.user(authUser.uid).once('value').then(function (snapshot) {
    name = (snapshot.val() && snapshot.val().name) || 'Anonymous';
    console.log(name);
    var surname = (snapshot.val() && snapshot.val().surname) || 'Anonyumus';
  });
  console.log(name);
  const avatar = '/images/avatars/avatar_11.png';
  /*const user = {
    name: 'Shen Zhi',
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Brain Director'
  };*/

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >

      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={avatar}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
