import React from 'react';
 
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

/**
 *  *** Higher Order Component ***
 * 
 * It uses the new React Context to provide the authenticated user. 
 * In this way, the App component (root) will not be in charge of it anymore.
 */
 
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
 
      this.state = {
        authUser: {},
      };
    }
 
    componentDidMount() {
      let currentComponent = this;
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (authUser) {
            currentComponent.setState({ authUser });
            this.props.firebase.db.ref('/users/' + authUser.uid).once('value').then(function(snapshot) {
              currentComponent.state.authUser["name"] = snapshot.val().name;
              currentComponent.state.authUser["surname"] = snapshot.val().surname;
            });
          }
          else this.setState({ authUser: null });
        },
      );
    }
 
    componentWillUnmount() {
      this.listener();
    }
 
    render() {
      const authUser = this.state.authUser
      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
 
  return withFirebase(WithAuthentication);
};
 
export default withAuthentication;
