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
        authUser: null,
      };
    }
 
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        },
      );
    }
 
    componentWillUnmount() {
      this.listener();
    }
 
    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
 
  return withFirebase(WithAuthentication);
};
 
export default withAuthentication;