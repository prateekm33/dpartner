import React from "react";
import { View } from "react-native";
import { StackNavigator } from "react-navigation";
import { withAppComponentInitiators } from "./HOCs/AppComponentInitiator";
import { O_MenuBar_Main } from "./Organisms";

export const MAIN_SCREEN_NAMES = {
  AppNavigator: "AppNavigator",
  ModalNavigator: "ModalNavigator"
};

export const INITIAL_ROUTE_NAME = MAIN_SCREEN_NAMES.AppNavigator;

const Screens = [
  [MAIN_SCREEN_NAMES.AppNavigator, require("./AppNavigator")],
  [MAIN_SCREEN_NAMES.ModalNavigator, require("./ModalNavigator")]
];

const SCREENS = Screens.reduce(
  (stack, screen) => ({
    [screen[0]]: {
      screen: props => {
        const Component = screen[1];
        const state = props.navigation.state;
        let modalInitialRouteName;
        if (state.routeName === MAIN_SCREEN_NAMES.ModalNavigator) {
          const params = state.params || {};
          modalInitialRouteName = params.routeName;
        }
        return (
          <View style={{ flex: 1 }}>
            <Component.default
              screenProps={{
                mainNavigation: props.navigation,
                modalInitialRouteName,
                params: (state.params || {}).params || {}
              }}
            />
            {screen[0] === MAIN_SCREEN_NAMES.AppNavigator && (
              <O_MenuBar_Main mainNavigation={props.navigation} />
            )}
          </View>
        );
      }
    },
    ...stack
  }),
  {}
);

const MainNavigator = StackNavigator(SCREENS, {
  navigationOptions: {
    header: null
  },
  initialRouteName: INITIAL_ROUTE_NAME,
  mode: "modal"
});

export default MainNavigator;
