import React from "react";
import { View } from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";
import store from "./redux/store";
import navigation_types from "./redux/types/navigation_types";

export const SCREEN_NAMES = {
  SplashScreen: "SplashScreen",
  Login: "Login",
  Dashboard: "Dashboard",
  DealPage: "DealPage",
  ManageDeals_RewardsPage: "ManageDeals_RewardsPage",
  PostScanPage: "PostScanPage",
  ScanPage: "ScanPage",
  ProfilePage: "ProfilePage",
  LoyaltyRewardPage: "LoyaltyRewardPage"
};

export const INITIAL_ROUTE_NAME = SCREEN_NAMES.ScanPage;
export const BACKLESS_ROUTES = {
  SplashScreen: true,
  Login: true
};
export const BURGERLESS = {};
export const HEADERLESS_ROUTES = {
  SplashScreen: true,
  Login: true
};
export const UNAUTH_ROUTES = {
  Login: true,
  SplashScreen: true
};

const Screens = [
  [SCREEN_NAMES.SplashScreen, require("./Screens/SplashScreen")],
  [SCREEN_NAMES.Login, require("./Screens/Login")],
  [SCREEN_NAMES.Dashboard, require("./Screens/Dashboard")],
  [SCREEN_NAMES.DealPage, require("./Screens/DealPage")],
  [
    SCREEN_NAMES.ManageDeals_RewardsPage,
    require("./Screens/ManageDeals_RewardsPage")
  ],
  [SCREEN_NAMES.PostScanPage, require("./Screens/PostScanPage")],
  [SCREEN_NAMES.ScanPage, require("./Screens/ScanPage")],
  [SCREEN_NAMES.ProfilePage, require("./Screens/ProfilePage")],
  [SCREEN_NAMES.LoyaltyRewardPage, require("./Screens/LoyaltyRewardPage")]
];

const SCREENS = Screens.reduce(
  (stack, screen) => ({
    [screen[0]]: props => {
      const Component = screen[1];
      Component.default.displayName = screen[0];
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
        <View>
          <Component.default {...props} />
        </View>
      );
    },
    ...stack
  }),
  {}
);

const AppNavigator = StackNavigator(SCREENS, {
  navigationOptions: {
    header: null
  },
  initialRouteName: INITIAL_ROUTE_NAME
});
export default AppNavigator;
