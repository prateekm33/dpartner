import React from "react";
import { View } from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";
import store from "../redux/store";
import navigation_types from "../redux/types/navigation.types";
import { withAppComponentInitiators } from "../HOCs/AppComponentInitiator";

export const REWARD_FORM_SCREEN_NAMES = {
  RewardFormPageOne: "RewardFormPageOne",
  RewardFormPageTwo: "RewardFormPageTwo"
};

export const INITIAL_ROUTE_NAME = REWARD_FORM_SCREEN_NAMES.RewardFormPageOne;

const Screens = [
  [
    REWARD_FORM_SCREEN_NAMES.RewardFormPageOne,
    require("../Screens/RewardFormPageOne")
  ],
  [
    REWARD_FORM_SCREEN_NAMES.RewardFormPageTwo,
    require("../Screens/RewardFormPageTwo")
  ]
];

const SCREENS = Screens.reduce(
  (stack, screen) => ({
    [screen[0]]: props => {
      const Component = screen[1];
      Component.default.displayName = screen[0];
      const InitiatedComponent = withAppComponentInitiators(Component.default);
      store.dispatch({
        type: navigation_types.SET_CURRENT_NAVIGATION,
        navigation: props.navigation
      });

      props.navigation.resetTo = (routeName, params) => {
        const action = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName, params })]
        });
        props.navigation.dispatch(action);
      };

      return (
        <View style={{ flex: 1 }}>
          <InitiatedComponent {...props} />
        </View>
      );
    },
    ...stack
  }),
  {}
);

const RewardFormNavigator = StackNavigator(SCREENS, {
  navigationOptions: {
    header: null
  },
  initialRouteName: INITIAL_ROUTE_NAME,
  cardStyle: {
    shadowRadius: 0
  }
});
export default RewardFormNavigator;
