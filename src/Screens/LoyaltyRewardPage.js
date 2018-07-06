import React, { Component } from "react";
import { connect } from "../redux";
import ScreenContainer from "../Templates/ScreenContainer";

class LoyaltyRewardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reward: props.navigation.state.params.reward
    };
  }

  render() {
    return (
      <ScreenContainer title={`Loyalty Reward #${this.state.reward.code}`} />
    );
  }
}

export default connect()(LoyaltyRewardPage);
