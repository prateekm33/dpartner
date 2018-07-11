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
  A_Text
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
    A_Icon_Profile
  ];
  setActiveIdx = idx => {
    if (this.state.activeIdx === idx) return;
    this.setState({ activeIdx: idx });
  };
  navigateToDashboard = () => {
    this.setActiveIdx(0);
    this.props.navigation.resetTo(SCREEN_NAMES.Dashboard);
  };
  navigateToManagePage = () => {
    this.setActiveIdx(1);
    this.props.navigation.resetTo(SCREEN_NAMES.Deals_RewardsPage);
  };
  navigateToManageEmployeesPage = () => {
    this.setActiveIdx(2);
    this.props.navigation.resetTo(SCREEN_NAMES.ManageEmployeesPage);
  };
  navigateToProfilePage = () => {
    this.setActiveIdx(3);
    this.props.navigation.resetTo(SCREEN_NAMES.ProfilePage);
  };

  onItemSelect = idx => {
    if (idx === 0) return this.navigateToDashboard();
    if (idx === 1) return this.navigateToManagePage();
    if (idx === 2) return this.navigateToManageEmployeesPage();
    if (idx === 3) return this.navigateToProfilePage();
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
    height: getResponsiveCSSFrom8(20).width
  },

  containerHandleBar: {
    width: getResponsiveCSSFrom8(50).width,
    height: getResponsiveCSSFrom8(10).height,
    backgroundColor: TEAL_DARK_THREE,
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
