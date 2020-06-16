import React from "react";

import ReactCardFlip from "react-card-flip";
import { SignIn, PasswordForget } from "../../components";

export default class LoginCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isFlipped: false
    };
    this.flipCard = this.flipCard.bind(this);
  }

  flipCard(event) {
    event.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        <SignIn {...this.props} handleFlip={this.flipCard}></SignIn>
        
        <PasswordForget
          {...this.props}
          handleFlip={this.flipCard}
        ></PasswordForget>
      </ReactCardFlip>
    );
  }
}
