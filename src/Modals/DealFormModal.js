import React from "react";
import { View } from "react-native";
import { StackNavigator } from "react-navigation";

export const DEAL_FORM_MODAL_SCREEN_NAMES = {
  DealFormPageOne: "DealFormPageOne",
  DealFormPageTwo: "DealFormPageTwo"
};

export const INITIAL_ROUTE_NAME = DEAL_FORM_MODAL_SCREEN_NAMES.DealFormPageOne;

const Screens = [
  [
    DEAL_FORM_MODAL_SCREEN_NAMES.DealFormPageOne,
    require("./Screens/DealFormPageOne")
  ],
  [
    DEAL_FORM_MODAL_SCREEN_NAMES.DealFormPageTwo,
    require("./Screens/DealFormPageTwo")
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

const DealFormModalNavigator = StackNavigator(SCREENS, {
  navigationOptions: {
    header: null
  },
  initialRouteName: INITIAL_ROUTE_NAME
});
export default DealFormModalNavigator;
