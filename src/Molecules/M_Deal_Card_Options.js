import React, { Component } from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";
import {
  A_Icon_Delete,
  A_Icon_Pause,
  A_Icon_View,
  A_Button_Opacity
} from "../Atoms";
import { SCREEN_NAMES } from "../AppNavigator";

class M_Deal_Card_Options_Pre extends Component {
  constructor(props) {
    super(props);
  }

  viewDeal = () => {
    this.props.navigation.navigate(SCREEN_NAMES.DealPage, {
      deal: this.props.deal
    });
  };

  deleteDeal = () => {
    console.warn("----TODO...delete deal...");
  };

  pauseDeal = () => console.warn("------TODO...pause deal...");

  render() {
    return (
      <View>
        <A_Icon_View onPress={this.viewDeal} />
        <A_Icon_Delete onPress={this.deleteDeal} />
        <A_Icon_Pause onPress={this.pauseDeal} />
      </View>
    );
  }
}
const M_Deal_Card_Options = withNavigation(M_Deal_Card_Options_Pre);

class M_LoyaltyReward_Card_Options_Pre extends Component {
  constructor(props) {
    super(props);
  }

  viewReward = () => {
    this.props.navigation.navigate(SCREEN_NAMES.LoyaltyRewardPage, {
      reward: this.props.reward
    });
  };

  deleteReward = () => {
    console.warn("----TODO...delete loyalty reward...");
  };

  pauseReward = () => console.warn("------TODO...pause loyalty reward...");

  render() {
    return (
      <View>
        <A_Icon_View onPress={this.viewReward} />
        <A_Icon_Delete onPress={this.deleteReward} />
        <A_Icon_Pause onPress={this.pauseReward} />
      </View>
    );
  }
}
const M_LoyaltyReward_Card_Options = withNavigation(
  M_LoyaltyReward_Card_Options_Pre
);

export { M_Deal_Card_Options, M_LoyaltyReward_Card_Options };
