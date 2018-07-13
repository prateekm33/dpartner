import React, { Component } from "react";
import { connect } from "./redux";
import { View } from "react-native";
import { StackNavigator } from "react-navigation";
import { O_MenuBar_Main } from "chemics/Organisms";
import {
  A_Icon_Dashboard,
  A_Icon_Scan,
  A_Icon_Manage,
  A_Icon_Employees,
  A_Icon_Profile
} from "chemics/Atoms";
import { SCREEN_NAMES } from "./AppNavigator";
import { MODAL_SCREEN_NAMES } from "./ModalNavigator";

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
              <MenuBarMain mainNavigation={props.navigation} />
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

class MenuBarMain_Pre extends Component {
  constructor(props) {
    super(props);
  }
  shouldGetFreshState = nextProps => {
    if (nextProps.employee.uuid !== this.props.employee.uuid) return true;
    return false;
  };

  navigateTo = idx => {
    if (idx === 0) return this.navigateToDashboard();
    if (idx === 1) return this.navigateToManagePage();
    if (idx === 2) return this.navigateToScanPage();
    if (idx === 3) return this.navigateToManageEmployeesPage();
    if (idx === 4) return this.navigateToProfilePage();
  };
  navigateToDashboard = () => {
    this.props.navigation.resetTo(SCREEN_NAMES.Dashboard);
  };
  navigateToManagePage = () => {
    this.props.navigation.resetTo(SCREEN_NAMES.Deals_RewardsPage);
  };
  navigateToScanPage = () => {
    this.setState({ menu_inactive: true });
    this.props.mainNavigation.navigate(MAIN_SCREEN_NAMES.ModalNavigator, {
      routeName: MODAL_SCREEN_NAMES.ScanModal
    });
  };
  navigateToManageEmployeesPage = () => {
    this.props.navigation.resetTo(SCREEN_NAMES.ManageEmployeesPage);
  };
  navigateToProfilePage = () => {
    this.props.navigation.resetTo(SCREEN_NAMES.ProfilePage);
  };

  render() {
    return (
      <O_MenuBar_Main
        items={[
          A_Icon_Dashboard,
          A_Icon_Manage,
          A_Icon_Scan,
          A_Icon_Employees,
          A_Icon_Profile
        ]}
        navigateTo={this.navigateTo}
        shouldGetFreshState={this.shouldGetFreshState}
      />
    );
  }
}

const MenuBarMain = connect(state => ({
  navigation: state.navigation
}))(MenuBarMain_Pre);
