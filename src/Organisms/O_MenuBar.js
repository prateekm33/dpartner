import React, { Component } from "react";
import { connect } from "../redux";
import PropTypes from "prop-types";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";

import {
  A_Button_Opacity,
  A_Icon_Dashboard,
  A_Icon_Manage,
  A_Icon_Scan,
  A_Icon_Profile,
  A_View,
  A_Icon_Employees
} from "../Atoms";

import { getResponsiveCSSFrom8 } from "../utils";
import { SCREEN_NAMES, UNAUTH_ROUTES } from "../AppNavigator";
import {
  TEAL_DARK_ONE,
  TEAL_DARK_THREE,
  TEAL_DARK_TWO,
  TEAL_LIGHT
} from "../styles/Colors";

const O_MenuBar = props => {
  return (
    <A_View style={[props.containerStyle]}>
      {props.items.map((Item, idx) => (
        <A_Button_Opacity
          onPress={() => props.onItemSelect(idx, Item)}
          key={`menu-bar-${props.label}-item-${idx}`}
          style={[
            style.menuItem,
            props.activeItem === idx && style.activeMenuItem
          ]}
        >
          <Item idx={idx} />
        </A_Button_Opacity>
      ))}
    </A_View>
  );
};
O_MenuBar.propTypes = {
  items: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired
};

class O_MenuBar_Main_Pre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIdx: 0,
      items: this.getInitialItems(),
      menu_inactive: true
    };
  }

  getInitialItems = () => [
    A_Icon_Dashboard,
    A_Icon_Manage,
    A_Icon_Scan,
    A_Icon_Employees,
    A_Icon_Profile
  ];
  setActiveIdx = idx => {
    if (this.state.activeIdx === idx) return false;
    this.setState({ activeIdx: idx });
    return true;
  };
  navigateToDashboard = () => {
    if (!this.setActiveIdx(0)) return;
    this.props.navigation.resetTo(SCREEN_NAMES.Dashboard);
  };
  navigateToManagePage = () => {
    if (!this.setActiveIdx(1)) return;
    this.props.navigation.resetTo(SCREEN_NAMES.Deals_RewardsPage);
  };
  navigateToScanPage = () => {
    if (!this.setActiveIdx(2)) return;
    this.props.navigation.resetTo(SCREEN_NAMES.ScanPage);
  };
  navigateToManageEmployeesPage = () => {
    if (!this.setActiveIdx(3)) return;
    this.props.navigation.resetTo(SCREEN_NAMES.ManageEmployeesPage);
  };
  navigateToProfilePage = () => {
    if (!this.setActiveIdx(4)) return;
    this.props.navigation.resetTo(SCREEN_NAMES.ProfilePage);
  };

  onItemSelect = idx => {
    if (idx === 0) return this.navigateToDashboard();
    if (idx === 1) return this.navigateToManagePage();
    if (idx === 2) return this.navigateToScanPage();
    if (idx === 3) return this.navigateToManageEmployeesPage();
    if (idx === 4) return this.navigateToProfilePage();
  };

  toggleMenu = () => {
    this.setState({ menu_inactive: !this.state.menu_inactive });
  };
  render() {
    const current_route = this.props.navigation.state.routeName;
    if (current_route in UNAUTH_ROUTES) return null;
    return (
      <A_View
        style={[
          style.peekabooContainer,
          !this.state.menu_inactive && style.activeContainer
        ]}
      >
        <A_Button_Opacity
          style={style.containerHandleBar}
          onPress={this.toggleMenu}
        />
        {!this.state.menu_inactive && (
          <O_MenuBar
            activeItem={this.state.activeIdx}
            items={this.state.items}
            containerStyle={[style.mainContainerStyle]}
            label="main"
            onItemSelect={this.onItemSelect}
          />
        )}
      </A_View>
    );
  }
}
O_MenuBar_Main_Pre.propTypes = {
  vertical: PropTypes.bool
};
const O_MenuBar_Main = connect(state => ({
  navigation: state.navigation
}))(O_MenuBar_Main_Pre);

const style = StyleSheet.create({
  peekabooContainer: {
    height: getResponsiveCSSFrom8(30).width,
    backgroundColor: "white",
    borderTopWidth: 0.5,
    borderTopColor: "#bdbdbd",
    shadowRadius: getResponsiveCSSFrom8(3).width,
    shadowOffset: {
      width: 0,
      height: getResponsiveCSSFrom8(-2).height
    },
    shadowColor: "lightgrey",
    shadowOpacity: 1
  },

  containerHandleBar: {
    width: getResponsiveCSSFrom8(50).width,
    height: getResponsiveCSSFrom8(10).height,
    backgroundColor: "grey",
    marginTop: getResponsiveCSSFrom8(5).height,
    alignSelf: "center",
    borderRadius: getResponsiveCSSFrom8(5).width,
    marginBottom: getResponsiveCSSFrom8(10).height
  },
  activeContainer: {
    height: getResponsiveCSSFrom8(80).width
  },
  mainContainerStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  }
});

export { O_MenuBar, O_MenuBar_Main };
