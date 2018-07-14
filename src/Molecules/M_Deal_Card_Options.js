import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "../redux";
import { A_Icon_Delete, A_Icon_View, A_View } from "chemics/Atoms";
import { SCREEN_NAMES } from "../AppNavigator";
import { getResponsiveCSSFrom8 } from "../utils";

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

  render() {
    return (
      <A_View
        style={[
          style.cardOptionsContainerStyle,
          this.props.cardOptionsContainerStyle
        ]}
      >
        <A_Icon_View
          onPress={this.viewDeal}
          style={style.cardOptionsIconStyle}
        />
        {this.props.employee.isAccountAdmin() && (
          <A_Icon_Delete
            onPress={this.deleteDeal}
            style={style.cardOptionsIconStyle}
          />
        )}
        {/* {this.props.employee.isAccountAdmin() && (
          <A_Icon_Pause
            onPress={this.pauseDeal}
            style={style.cardOptionsIconStyle}
          />
        )} */}
      </A_View>
    );
  }
}
const M_Deal_Card_Options = connect(state => ({ employee: state.employee }))(
  withNavigation(M_Deal_Card_Options_Pre)
);

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

  render() {
    return (
      <A_View
        style={[
          style.cardOptionsContainerStyle,
          this.props.cardOptionsContainerStyle
        ]}
      >
        <A_Icon_View
          onPress={this.viewReward}
          style={style.cardOptionsIconStyle}
        />
        {this.props.employee.isAccountAdmin() && (
          <A_Icon_Delete
            onPress={this.deleteReward}
            style={style.cardOptionsIconStyle}
          />
        )}
        {/* {this.props.employee.isAccountAdmin() && (
          <A_Icon_Pause
            onPress={this.pauseReward}
            style={style.cardOptionsIconStyle}
          />
        )} */}
      </A_View>
    );
  }
}
const M_LoyaltyReward_Card_Options = connect(state => ({
  employee: state.employee
}))(withNavigation(M_LoyaltyReward_Card_Options_Pre));

export { M_Deal_Card_Options, M_LoyaltyReward_Card_Options };

const style = StyleSheet.create({
  cardOptionsContainerStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    paddingHorizontal: getResponsiveCSSFrom8(10).width
  },
  cardOptionsIconStyle: {
    width: getResponsiveCSSFrom8(30).width,
    height: getResponsiveCSSFrom8(30).height,
    marginLeft: getResponsiveCSSFrom8(30).width
  }
});
