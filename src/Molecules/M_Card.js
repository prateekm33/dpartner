import React from "react";
import { StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import { A_Text, A_Button, A_View, A_Image } from "../Atoms";
import {
  M_Deal_Card_Options,
  M_LoyaltyReward_Card_Options
} from "./M_Deal_Card_Options";
import { SCREEN_NAMES } from "../AppNavigator";
import { getResponsiveCSSFrom8 } from "../utils";

const M_Card_Deal_Mini = withNavigation(props => {
  const deal = props.deal;
  return (
    <A_Button
      onPress={props.onPress}
      style={[style.cardContainerStyle, props.containerStyle]}
    >
      <A_View style={style.detailsContainerStyle}>
        <A_View style={style.imageContainerStyles}>
          <A_Image source={deal.image} />
        </A_View>
        <A_Text strong style={[style.nameStyles, props.nameStyles]}>
          {deal.name}
        </A_Text>
        <A_Text>{deal.short_desc}</A_Text>
      </A_View>
      <M_Deal_Card_Options deal={deal} cardOptionsContainerStyle={{}} />
    </A_Button>
  );
});

const M_Card_LoyaltyReward_Mini = withNavigation(props => {
  const reward = props.reward;
  return (
    <A_Button
      onPress={props.onPress}
      style={[style.cardContainerStyle, props.containerStyle]}
    >
      <A_View style={style.detailsContainerStyle}>
        <A_View style={style.imageContainerStyles}>
          <A_Image source={reward.image} style={style.imageContainerStyles} />
        </A_View>
        <A_Text strong style={[style.nameStyles, props.nameStyles]}>
          {reward.name}
        </A_Text>
        <A_Text>{reward.short_desc}</A_Text>
      </A_View>
      <M_LoyaltyReward_Card_Options reward={reward} />
    </A_Button>
  );
});
export { M_Card_Deal_Mini, M_Card_LoyaltyReward_Mini };

const style = StyleSheet.create({
  cardContainerStyle: {
    marginVertical: getResponsiveCSSFrom8(10).height,
    minHeight: getResponsiveCSSFrom8(300).height,
    justifyContent: "flex-end",
    shadowRadius: getResponsiveCSSFrom8(5).width,
    shadowColor: "lightgrey",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0
    },
    paddingTop: getResponsiveCSSFrom8(10).height
  },
  nameStyles: {
    fontSize: getResponsiveCSSFrom8(20).height
  },
  detailsContainerStyle: {
    paddingHorizontal: getResponsiveCSSFrom8(10).width
  },
  imageContainerStyles: {
    height: getResponsiveCSSFrom8(150).height
  }
});
