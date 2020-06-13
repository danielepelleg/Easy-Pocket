/**
 * REACT CONTEXT API
 * 
 * Provide a Firebase instance to the entire application in src/index.js file
 * Just create the Firebase instance with the Firebase class and pass it as 
 * value prop to the React's Context
 * 
 */

import React from 'react';
 
/**
 * This function creates two components:
 *  - FirebaseContext.Provider component is used to provide a Firebase instance 
 *      once at the top-level of your React component tree, which we will do in this section
 *  - FirebaseContext.Consumer component is used to retrieve the Firebase instance if it 
 *      is needed in the React component. 
 */
const FirebaseContext = React.createContext(null);

/**
 * Rather than using a render prop component, which is automatically given with 
 * React's Context Consumer component, it may be simpler to use a HIGHER-ORDER COMPONENT 
 */
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);
 
export default FirebaseContext;