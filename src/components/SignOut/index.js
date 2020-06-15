import React from "react";
import InputIcon from "@material-ui/icons/Input";
import {IconButton} from '@material-ui/core';

/// Firebase
import { withFirebase } from '../Firebase';

/**
 *    *** SIGN OUT BUTTON ***
 * Sign Out Button to sign the user out.
 */
const SignOutButton = ({ firebase}) => (
  <IconButton
    color="inherit"
    onClick={firebase.doSignOut} >
    <InputIcon />
  </IconButton>
);

export default withFirebase(SignOutButton);
