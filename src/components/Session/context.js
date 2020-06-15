import React from 'react';
 /**
  *     --- Basic Version of Session Handling ---
  * 
  * React Context API to pass down the authenticated user instance to any component before, otherwise
  * the authenticated user has to be passed through all components until it reaches all the leaf components.
  */
const AuthUserContext = React.createContext(null);
 
export default AuthUserContext;