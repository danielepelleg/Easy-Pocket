import React from 'react';
 
/// Firebase
import { withFirebase } from '../Firebase';


/**
 *    *** SIGN OUT BUTTON ***
 * Sign Out Button to sign the user out.
 */
const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);
 
export default withFirebase(SignOutButton);
