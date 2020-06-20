import React, {Component, useContext} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {Avatar, Typography} from '@material-ui/core';
import {withFirebase} from 'components/Firebase';
import {withAuthorization} from 'components/Session';
import {compose} from "recompose";

//const authUser = useContext(AuthUserContext);

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

class Profile extends Component {

  constructor(props) {
    super(props);
    const uid = this.props.authUser.uid;
    this.state = uid;
    this.state = {user: null};
  }

  componentDidMount() {
    this.props.firebase.user(this.state.uid).on('value', snapshot => {
      const userObject = snapshot.val();
      console.log(userObject);

      const user = Object.keys(userObject);

      console.log('first user :' + user);

      this.setState({user: user});

    });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.state.uid).off();
  }


  render() {
    console.log('test');
    const avatar = '/images/avatars/avatar_11.png';
    /*const user = {
      name: 'Shen Zhi',
      avatar: '/images/avatars/avatar_11.png',
      bio: 'Brain Director'
    };*/
    const {...rest} = this.props;
    const {user} = this.state;
    console.log('second user: ' + user);
    return (
      <div
        {...rest}
        className={clsx(this.props.classes.root, this.props.className)}
      >

        <Avatar
          alt="Person"
          className={this.props.classes.avatar}
          component={RouterLink}
          src={avatar}
          to="/settings"
        />
        <Typography
          className={this.props.classes.name}
          variant="h4"
        >
          {user.name}
        </Typography>
        {/*<Typography variant="body2">{user.bio}</Typography>*/}
      </div>
    );
  }
}

export default ProfilePage

function ProfilePage(props) {
  const classes = useStyles();
  return (
    <ProfileBase {...props} classes={classes}/>
    );
}

const ProfileBase = compose(
  withFirebase,
  withAuthorization,
)(Profile);

export { ProfileBase };
