import * as app from 'components/Firebase/app';
import 'components/Firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
 
class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  /**
   * *** Authentication API for Firebase Class ***
   * 
   *    Autentication functions as class methods
   */
  
  
  /** 
   * *** SIGN UP ***
   */
  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  /** 
   * *** SIGN IN ***
   * 
   * It is not possible to sign in a user who is not signed up yet 
   *  since the Firebase API would return an error
   */
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  
  

  /**
   * *** SIGN OUT ***
   * 
   * Don't need to pass any argument to it, because Firebase knows 
   * about the currently authenticated user. If no user is authenticated, 
   * nothing will happen when this function is called.
   */
  doSignOut = () => this.auth.doSignOut();

  /** 
   * *** RESET PASSWORD ***
   */
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  /** 
   * *** UPDATE PASSWORD ***
   */
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}
 
export default Firebase;
