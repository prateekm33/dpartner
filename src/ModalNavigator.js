import React from "react";
import { View, StatusBar } from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";

export const MODAL_SCREEN_NAMES = {
  ScanModal: "ScanModal",
  RewardFormModal: "RewardFormModal",
  DealFormModal: "DealFormModal",
  NewEmployeeFormModal: "NewEmployeeFormModal"
};

export const INITIAL_ROUTE_NAME = null;

const Screens = [
  [MODAL_SCREEN_NAMES.ScanModal, require("./Modals/ScanModal")],
  [MODAL_SCREEN_NAMES.RewardFormModal, require("./Modals/RewardFormModal")],
  [MODAL_SCREEN_NAMES.DealFormModal, require("./Modals/DealFormModal")],
  [
    MODAL_SCREEN_NAMES.NewEmployeeFormModal,
    require("./Modals/NewEmployeeFormModal")
  ]
];

const SCREENS = Screens.reduce(
  (stack, screen) => ({
    [screen[0]]: {
      screen: props => {
        const { modalInitialRouteName } = props.screenProps || {};
        const Component = screen[1];

        if (props.navigation.state.routeName !== modalInitialRouteName) {
          const action = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: modalInitialRouteName })
            ]
          });
          props.navigation.dispatch(action);
        }
        return (
          <View style={{ flex: 1 }}>
            <StatusBar hidden={true} />
            <Component.default
              screenProps={{
                mainNavigation: (props.screenProps || {}).mainNavigation,
                params: props.screenProps.params
              }}
            />
          </View>
        );
      }
    },
    ...stack
  }),
  {}
);

const ModalNavigator = StackNavigator(SCREENS, {
  navigationOptions: {
    header: null
  },
  initialRouteName: INITIAL_ROUTE_NAME,
  mode: "modal"
});
export default ModalNavigator;
