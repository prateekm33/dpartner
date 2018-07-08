import React from "react";
import { View } from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";
import store from "./redux/store";
import navigation_types from "./redux/types/navigation.types";
import { withAppComponentInitiators } from "./HOCs/AppComponentInitiator";

export const SCREEN_NAMES = {
  SplashScreen: "SplashScreen",
  LoginPage: "LoginPage",
  Dashboard: "Dashboard",
  DealPage: "DealPage",
  Deals_RewardsPage: "Deals_RewardsPage",
  PostScanPage: "PostScanPage",
  ScanPage: "ScanPage",
  ProfilePage: "ProfilePage",
  LoyaltyRewardPage: "LoyaltyRewardPage",
  RewardFormPageOne: "RewardFormPageOne",
  RewardFormPageTwo: "RewardFormPageTwo",
  DealFormPageOne: "DealFormPageOne",
  DealFormPageTwo: "DealFormPageTwo",
  ManageEmployeesPage: "ManageEmployeesPage",
  NewEmployeeFormPage: "NewEmployeeFormPage"
};

export const INITIAL_ROUTE_NAME = SCREEN_NAMES.SplashScreen;
export const BACKLESS_ROUTES = {
  SplashScreen: true,
  LoginPage: true
};
export const BURGERLESS = {};
export const HEADERLESS_ROUTES = {
  SplashScreen: true,
  LoginPage: true
};
export const UNAUTH_ROUTES = {
  LoginPage: true,
  SplashScreen: true
};

const Screens = [
  [SCREEN_NAMES.SplashScreen, require("./Screens/SplashScreen")],
  [SCREEN_NAMES.LoginPage, require("./Screens/LoginPage")],
  [SCREEN_NAMES.Dashboard, require("./Screens/Dashboard")],
  [SCREEN_NAMES.DealPage, require("./Screens/DealPage")],
  [SCREEN_NAMES.Deals_RewardsPage, require("./Screens/Deals_RewardsPage")],
  [SCREEN_NAMES.PostScanPage, require("./Screens/PostScanPage")],
  [SCREEN_NAMES.ScanPage, require("./Screens/ScanPage")],
  [SCREEN_NAMES.ProfilePage, require("./Screens/ProfilePage")],
  [SCREEN_NAMES.LoyaltyRewardPage, require("./Screens/LoyaltyRewardPage")],
  [SCREEN_NAMES.RewardFormPageOne, require("./Screens/RewardFormPageOne")],
  [SCREEN_NAMES.RewardFormPageTwo, require("./Screens/RewardFormPageTwo")],
  [SCREEN_NAMES.DealFormPageOne, require("./Screens/DealFormPageOne")],
  [SCREEN_NAMES.DealFormPageTwo, require("./Screens/DealFormPageTwo")],
  [SCREEN_NAMES.ManageEmployeesPage, require("./Screens/ManageEmployeesPage")],
  [SCREEN_NAMES.NewEmployeeFormPage, require("./Screens/NewEmployeeFormPage")]
];

const SCREENS = Screens.reduce(
  (stack, screen) => ({
    [screen[0]]: {
      screen: props => {
        const Component = screen[1];
        Component.default.displayName = screen[0];
        const InitiatedComponent = withAppComponentInitiators(
          Component.default
        );
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
      navigationOptions: {
        // gesturesEnabled: false
      },
      mode: "modal"
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
  // transitionConfig: () => {
  //   return {
  //     transitionSpec: {
  //       duration: 750,
  //       // easing: Easing.out(Easing.poly(4)),
  //       // timing: Animated.timing,
  //       useNativeDriver: true
  //     },
  //     screenInterpolator: sceneProps => {
  //       const { layout, position, scene } = sceneProps;

  //       const thisSceneIndex = scene.index;
  //       console.warn("--scendeidx L ", scene.isActive, scene.route.routeName);
  //       const width = layout.initWidth;

  //       const translateX = position.interpolate({
  //         inputRange: [thisSceneIndex - 1, thisSceneIndex],
  //         outputRange: [width, 0]
  //       });

  //       return { transform: [{ translateX }] };
  //     }
  //   };
  // }
});

export default AppNavigator;
