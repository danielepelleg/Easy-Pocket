import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

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
    this.db = app.database();
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
  doSignOut = () => this.auth.signOut();

  /**
   * *** RESET PASSWORD ***
   */
  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  /**
   * *** UPDATE PASSWORD ***
   */
  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  /**
   * *** CREATE A CARD ***
   * 
   * @param {*} name the name of the card in order to recognize it
   * @param {*} owner the owner of the card 
   * @param {*} money the money u can spend on it     
   * @param {*} color the color u choose to save it
   */
  doCreateCard = (name, owner, money, color) => {
    // A card entry.
    if (color === "")
      color = "#FF0500";

    var cardData = {
      uid: this.auth.currentUser.uid,
      name: name,
      owner: owner,
      money: money,
      color: color
    };

    // Get a key for a new Card.
    var newCardKey = this.db.ref().child('cards').push().key;

    var keyData = {
      cid: newCardKey
    };

    // Write the new card's data simultaneously in the cards list and the user's cards list.
    //  In the second one will be written just the card identification number (Cid)
    var userCard = {};
    userCard['/cards/' + newCardKey] = cardData;
    var newCard = {};
    newCard['/users/' + this.auth.currentUser.uid + '/cards/'] = keyData;

    this.db.ref().update(userCard);
    this.db.ref().update(newCard);
  };

  //  *** User API ***

  /**
   * Get a reference to a user by identifier
   * @param {the identifier} uid
   */
  user = (uid) => this.db.ref(`users/${uid}`);

  userCards = (uid) => this.db.ref(`users/${uid}/cards`);

  userCard = (uid, cid) => this.db.ref(`users/${uid}/cards/${cid}`);

  card = (cid) => this.db.ref(`cards/${cid}`);

  userPurchases = (uid) => this.db.ref(`users/${uid}/purchases`);

  authUserCards = () => this.db.ref("users/" + this.auth.currentUser.uid + '/cards');

  authUser = () => this.db.ref("/users/" + this.auth.currentUser.uid);

  users = () => this.db.ref("users");

  //  ***Cards API ***

  /**
   * Get a reference to a card by identifier
   * @param {the identifier} uid
   */
  card = (cid) => this.db.ref(`cards/${cid}`);

  purchase = (pid) => this.db.ref(`purchases/${pid}`);

  cards = () => this.db.ref("cards");

  purchases = () => this.db.ref("purchases");
}

export default Firebase;
