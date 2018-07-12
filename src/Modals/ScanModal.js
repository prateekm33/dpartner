import React from "react";
import { View } from "react-native";
import { StackNavigator } from "react-navigation";

export const SCAN_MODAL_SCREEN_NAMES = {
  ScanPage: "ScanPage",
  PostScanPage: "PostScanPage"
};

export const INITIAL_ROUTE_NAME = SCAN_MODAL_SCREEN_NAMES.ScanPage;

const Screens = [
  [SCAN_MODAL_SCREEN_NAMES.ScanPage, require("./Screens/ScanPage")],
  [SCAN_MODAL_SCREEN_NAMES.PostScanPage, require("./Screens/PostScanPage")]
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

const ScanModalNavigator = StackNavigator(SCREENS, {
  navigationOptions: {
    header: null
  },
  initialRouteName: INITIAL_ROUTE_NAME
});
export default ScanModalNavigator;
