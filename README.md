<!-- PROJECT LOGO -->
  <br />
    <p align="center">
  <a href="https://github.com/danielepelleg/Easy-Pocket">
    <img src="/images/logos/logo36.png" alt="Logo" width="130" height="130">
  </a>
  <h1 align="center">Easy Pocket </h1>
  <p align="center">
    A simple Web Application to manage outgoings, written in React native and powered by Firebase.
  </p>
  <p align="center">
    <a href="https://easypocket.netlify.app/main" target="_blank" align="center">Live Demo</a>
  </p>

  <!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
- [Database](#database)
  - [Firebase Realtime Database](#firebase-realtime-database)
    - [Authentication](#authentication)
- [Available Scripts](#available-scripts)
  - [`npm start`](#npm-start)
  - [`npm test`](#npm-test)
  - [`npm run build`](#npm-run-build)
- [Features](#features)
  - [Add Card](#add-card)
  - [Add Purchase](#add-purchase)
  - [Dashboard](#dashboard)
  - [Account](#account)
  - [Quotes](#quotes)
- [License](#license)
- [Deploy ![Netlify Status](https://app.netlify.com/sites/easypocket/deploys)](#deploy-img-srchttpsapinetlifycomapiv1badges92d547f0-c894-4a9d-be1b-a019885101e4deploy-status-altnetlify-status)
- [CONTRIBUTORS](#contributors)
<!-- ABOUT THE PROJECT -->

## About The Project

**Easy Pocket** is a web application written in React native, an open-source, front end, JavaScript library for building user interfaces or UI components.

The application allows to store user's datas such as credit cards and payments without take the more private data or the sensitive ones. Through these the user can easily manage his outgoings and sees the related analysis about in his personal Dashboard.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Database

To store user's datas the system use **Firebase**, a platform developed by Google.

### Firebase Realtime Database

**Firebase Realtime Database** is a cloud-hosted database. Data is stored as JSON and synced across all clients in realtime, remaining available when the app goes offline. With this NoSQL cloud database all the clients share one Realtime Database instance and automatically receive updates with the newest data.

Firebase Realtime Database uses data synchronization: every time data changes, any connected device receives that update within milliseconds.

#### Authentication

**Firebase Authentication** provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app. It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.

The **Firebase Authentication SDK** provides methods to create and manage users that use their email addresses and passwords to sign in. Firebase Authentication also handles sending password reset emails.

The authentication system in the application is an email and password based authentication.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Features

For the User Interface design the application uses the [**Material UI**](https://material-ui.com/), a React UI framework that includes components for faster and easier web development. The User Interface is composed of a sidebar menu through which, once signed in, the user can navigate between his private sections. Here are listed the main components created for the "views" of the user:

### Add Card

This component belongs to the Cards view. In this view are listed the User's cards: all of them are editable for what concern the money they have and with this component the user can add a new card item at any moment. Every change is immediately shown to the user in realtime, as the card is stored in the database. A generic JSON card structure is the following:

    —— CID CardID
        |—— UID: reference to the UserID, true if the user exists
        |—— color: the color of the card
        |—— expenses: the money spent using this card
        |—— money: the money on the card
        |—— name: the name of the card
        |—— owner: owner of the card
        |__ purchases 
                |—— PID1:
                |—— .
                |—— . → (list of the reference to every purchase, true if it exists)
                |—— .
                |__ PIDn:

### Add Purchase

This component belongs to the Purchases view. In this view are listed the User's purchases in a table: every row can be deleted and with this component the user can add a new purchase item at any moment. Every change is immediately shown to the user in realtime, as the purchase is stored in the database. A generic JSON purchase structure is the following:

    —— PID PurchaseID
        |—— CID: reference to the CardID, true if the card exists
        |—— UID: reference to the UserID, true if the user exists
        |—— category: the category to which the purchase belongs to
        |—— cost: the cost of the purchase
        |—— date: the date of the purchase
        |__ product: the name of the product bought

### Dashboard

The Dashboard view is the main page to which the user is redirected once he signs in. This view is composed by different components that display the user's informations about his purchases and cards. Here is the list of the components:

- **Budget** display the sum of the money on all the user's cards. It show then a warning to the user if his balance is a positive or negative one. The balance is positive if the user has a budget greater then the sum of his outgoings, negative otherwise.
- **Outgoings** display the sum of the cost on all the user's purchases.
- **TaskProgress** display the percentage of the money spent by the user. → Outgoings / (Budget + Outgoings) .
- **UserData** display name and surname of the authenticated user.
- **LatestPurchase** display the latest 7 purchases performed by the user ordered by chronological date in a histogram.
- **TrafficByCard** display the percentage of the expenses of a card on the total outgoings. → Card Expenses / Outgoings
- **TrafficByCategory** display the percentage of the expenses of a category on the total outgoings. → Category Expenses / Outgoings
- **CostByCategory** display the total outgoings for every category in a histogram.

### Account

The Account view stores the user's informations. The view is composed by a form through which the user can edit his informations stored in the database, while another component shows the number of the total cards and purchase the authenticated user add using the application. A JSON tree user's data is so structured:

    —— UID UserID
        |—— name: user's name
        |—— surname: user's surname
        |—— email: user's email
        |—— gender: user's gender
        |—— birth: user's date of birth
        |—— phone: user's phone number
        |—— country: user's country
        |__ cards 
                |—— CID1:
                |—— .
                |—— . → (list of the reference to every card, true if it exists)
                |—— .
                |__ CIDn:
        |__ purchases 
                |—— PID1:
                |—— .
                |—— . → (list of the reference to every purchase, true if it exists)
                |—— .
                |__ PIDn:

### Quotes

This view is simply composed by a list of quotes. The quotes regards money management. This section has been thought as the "user's brainstoming chamber". Once a user is not sure if to buy or not to buy something, here he goes.

## License

Distributed under the GPL License.

<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>

<div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></div>

## Deploy [![Netlify Status](https://api.netlify.com/api/v1/badges/92d547f0-c894-4a9d-be1b-a019885101e4/deploy-status)](https://app.netlify.com/sites/easypocket/deploys)

<!-- CONTRIBUTORS -->

## CONTRIBUTORS

[Daniele Pellegrini](https://github.com/danielepelleg) - 285240

[Guido Soncini](https://github.com/gweedo) - 285140
