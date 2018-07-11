import React from "react";
import { withNavigation } from "react-navigation";
import { A_Text, A_Button } from "../Atoms";
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
      onPress={() => props.navigation.navigate(SCREEN_NAMES.DealPage, { deal })}
      style={[
        {
          marginVertical: getResponsiveCSSFrom8(10).height,
          minHeight: getResponsiveCSSFrom8(150).height,
          justifyContent: "flex-end",
          shadowRadius: getResponsiveCSSFrom8(5).width,
          shadowColor: "lightgrey",
          shadowOpacity: 1,
          shadowOffset: {
            width: 0,
            height: 0
          }
        },
        props.containerStyle
      ]}
    >
      {deal.image && <A_Image source={deal.image} />}
      <A_Text
        strong
        style={[
          {
            fontSize: getResponsiveCSSFrom8(20).height
          },
          props.nameStyles
        ]}
      >
        {deal.name}
      </A_Text>
      <A_Text>{deal.short_desc}</A_Text>
      <M_Deal_Card_Options deal={deal} cardOptionsContainerStyle={{}} />
    </A_Button>
  );
});

const M_Card_LoyaltyReward_Mini = withNavigation(props => {
  const reward = props.reward;
  return (
    <A_Button
      onPress={() =>
        props.navigation.navigate(SCREEN_NAMES.LoyaltyRewardPage, { reward })
      }
    >
      {reward.image && <A_Image source={reward.image} />}
      <A_Text strong>{reward.name}</A_Text>
      <M_LoyaltyReward_Card_Options reward={reward} />
    </A_Button>
  );
});
export { M_Card_Deal_Mini, M_Card_LoyaltyReward_Mini };
