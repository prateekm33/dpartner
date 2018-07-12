import React from "react";
import { View } from "react-native";
import { StackNavigator } from "react-navigation";

export const REWARD_FORM_MODAL_SCREEN_NAMES = {
  RewardFormPageOne: "RewardFormPageOne",
  RewardFormPageTwo: "RewardFormPageTwo"
};

export const INITIAL_ROUTE_NAME =
  REWARD_FORM_MODAL_SCREEN_NAMES.RewardFormPageOne;

const Screens = [
  [
    REWARD_FORM_MODAL_SCREEN_NAMES.RewardFormPageOne,
    require("./Screens/RewardFormPageOne")
  ],
  [
    REWARD_FORM_MODAL_SCREEN_NAMES.RewardFormPageTwo,
    require("./Screens/RewardFormPageTwo")
  ]
];

const SCREENS = Screens.reduce(
  (stack, screen) => ({
    [screen[0]]: {
      screen: props => {
        const Component = screen[1];
        Component.default.displayName = screen[0];

        return (
          <View style={{ flex: 1 }}>
            <Component.default {...props} />
          </View>
        );
      }
    },
    ...stack
  }),
  {}
);

const RewardFormModalNavigator = StackNavigator(SCREENS, {
  navigationOptions: {
    header: null
  },
  initialRouteName: INITIAL_ROUTE_NAME
});
export default RewardFormModalNavigator;
