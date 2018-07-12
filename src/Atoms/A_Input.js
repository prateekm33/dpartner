import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInput, StyleSheet, Platform } from "react-native";
import { A_Text, A_View } from ".";
import moment from "moment";
import { A_Button_Opacity } from "./A_Button";
import { A_Icon_DropdownToggle } from "./A_Icon";
import { USER_ROLES } from "../utils/constants";
import { getResponsiveCSSFrom8 } from "../utils";
import { A_View_Scroll } from "./A_View";

const A_Input = props => {
  return (
    <TextInput
      placeholderTextColor="grey"
      {...props}
      style={[style.inputStyles, props.style]}
      ref={props.inputRef}
    />
  );
};
A_Input.propTypes = {
  ...TextInput.propTypes,
  name: PropTypes.string,
  inputRef: PropTypes.func
};

class A_Input_Date extends Component {
  constructor(props) {
    super(props);
    const date = this.props.defaultValue;
    let m = "",
      d = "",
      y = "";
    if (date) {
      m = date.format("MM");
      d = date.format("DD");
      y = date.format("YYYY");
    }
    this.state = {
      m,
      d,
      y
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.defaultValue === this.props.defaultValue) return;
    this.setState({ defaultValue });
  };

  updateMonth = m => {
    this.setState({ m }, () => {
      const isComplete = this.isComplete();
      if (!isComplete && m.length === 2) {
        this.dayEl.focus();
      } else if (isComplete) {
        this.monthEl.blur();
      }
    });
  };
  updateDay = d =>
    this.setState({ d }, () => {
      const isComplete = this.isComplete();
      if (!isComplete && d.length === 2) {
        this.yearEl.focus();
      } else if (isComplete) {
        this.dayEl.blur();
      }
    });
  updateYear = y =>
    this.setState({ y }, () => {
      const isComplete = this.isComplete();
      if (!isComplete) return;
      this.yearEl.blur();
    });

  isComplete = () => {
    if (
      this.state.m.length > 0 &&
      this.state.d.length > 0 &&
      this.state.y.length === 4
    ) {
      this.props.onComplete(
        moment(`${this.state.m}/${this.state.d}/${this.state.y}`, "MM/DD/YYYY")
      );
      return true;
    }
    return false;
  };
  render() {
    return (
      <A_View style={{ marginVertical: getResponsiveCSSFrom8(10).height }}>
        {/* <A_Text strong style={{ fontSize: getResponsiveCSSFrom8(20).height }}>
          Expires on
        </A_Text> */}
        <A_View
          style={{
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <A_Input
            placeholder="MM"
            onChangeText={this.updateMonth}
            keyboardType="numeric"
            maxLength={2}
            inputRef={el => (this.monthEl = el)}
            defaultValue={this.state.m}
            editable={this.props.editable !== false}
            inputRef={this.props.monthRef}
          />
          <A_Text>/</A_Text>
          <A_Input
            placeholder="DD"
            onChangeText={this.updateDay}
            keyboardType="numeric"
            maxLength={2}
            inputRef={el => (this.dayEl = el)}
            defaultValue={this.state.d}
            editable={this.props.editable !== false}
          />
          <A_Text>/</A_Text>
          <A_Input
            placeholder="YYYY"
            onChangeText={this.updateYear}
            keyboardType="numeric"
            maxLength={4}
            inputRef={el => (this.yearEl = el)}
            defaultValue={this.state.y}
            editable={this.props.editable !== false}
          />
        </A_View>
      </A_View>
    );
  }
}

class A_Input_Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_dropdown: false
    };
  }

  getValue = value => {
    if (!value) return null;
    if (typeof value === "string") return value;
    else if (value.constructor.prototype === Object.prototype)
      return value.text;
    else return null;
  };

  toggleDropdown = () =>
    this.setState({ show_dropdown: !this.state.show_dropdown });

  renderDropdown = () => {
    // TODO...convert to scrollview
    return (
      <A_View
        style={[
          style.dropdownOptionsContainerStyle,
          this.props.dropdownOptionsContainerStyle
        ]}
      >
        <A_View_Scroll>
          {this.props.values.map(val => {
            const value = this.getValue(val);
            return (
              <A_Button_Opacity
                onPress={() => this.onValueSelected(val)}
                key={`dd-option-${value}`}
                style={style.ddOptionStyle}
              >
                <A_Text>{value}</A_Text>
              </A_Button_Opacity>
            );
          })}
        </A_View_Scroll>
      </A_View>
    );
  };
  onValueSelected = value => {
    this.toggleDropdown();
    this.props.onValueSelected(value);
  };
  render() {
    return (
      <A_View
        style={[
          style.dropdownContainerStyle,
          this.props.dropdownContainerStyle
        ]}
      >
        <A_Text strong>{this.props.title}</A_Text>
        <A_View
          style={[
            style.dropdownInputContainer,
            this.props.dropdownInputContainerStyle
          ]}
        >
          <A_Text
            style={[style.selectedValueStyle, this.props.selectedValueStyle]}
          >
            {this.getValue(this.props.selectedValue)}
          </A_Text>
          <A_Icon_DropdownToggle
            onPress={this.toggleDropdown}
            style={[style.ddIconStyle]}
          />
        </A_View>
        {this.state.show_dropdown && this.renderDropdown()}
      </A_View>
    );
  }
}

const ADMIN_DROPDOWN_OPTION = {
  text: "ADMIN",
  value: USER_ROLES.VENDOR_ADMIN
};
const EMPLOYEE_DROPDOWN_OPTION = {
  text: "EMPLOYEE",
  value: USER_ROLES.VENDOR_EMPLOYEE
};
class A_Input_Dropdown_Role extends Component {
  constructor(props) {
    super(props);
    let role;
    if (props.role === USER_ROLES.VENDOR_ADMIN) role = ADMIN_DROPDOWN_OPTION;
    else role = EMPLOYEE_DROPDOWN_OPTION;
    this.state = {
      role
    };
  }

  changeRole = role => {
    this.setState({ role });
    if (this.props.changeRole) {
      let _role;
      if (role === ADMIN_DROPDOWN_OPTION) _role = USER_ROLES.VENDOR_ADMIN;
      else if (role === EMPLOYEE_DROPDOWN_OPTION)
        _role = USER_ROLES.VENDOR_EMPLOYEE;
      this.props.changeRole(_role);
    }
  };

  render() {
    if (this.props.role === USER_ROLES.VENDOR_ACCOUNT_OWNER)
      return (
        <A_View style={[this.props.dropdownContainerStyle]}>
          <A_Text strong>Role</A_Text>
          <A_Text>
            {this.props.role
              .split("_")
              .slice(1)
              .join(" ")}
          </A_Text>
        </A_View>
      );
    return (
      <A_Input_Dropdown
        title="ROLE"
        values={[ADMIN_DROPDOWN_OPTION, EMPLOYEE_DROPDOWN_OPTION]}
        onValueSelected={this.changeRole}
        selectedValue={this.state.role}
        dropdownContainerStyle={this.props.dropdownContainerStyle}
        dropdownOptionsContainerStyle={this.props.dropdownOptionsContainerStyle}
        dropdownInputContainerStyle={this.props.dropdownInputContainerStyle}
      />
    );
  }
}

export { A_Input, A_Input_Date, A_Input_Dropdown, A_Input_Dropdown_Role };

const style = StyleSheet.create({
  inputStyles: {
    borderRadius: getResponsiveCSSFrom8(8).width,
    paddingVertical: getResponsiveCSSFrom8(20).height,
    paddingHorizontal: getResponsiveCSSFrom8(10).width,
    fontSize: getResponsiveCSSFrom8(20).height
  },
  dropdownInputContainer: {
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  selectedValueStyle: {
    flex: 1
  },
  dropdownOptionsContainerStyle: {
    borderWidth: 1,
    // position: "absolute",
    // left: 0,
    // right: 0,
    backgroundColor: "white"
  },
  ddIconStyle: {},
  ddOptionStyle: {
    borderBottomWidth: 0.6,
    padding: getResponsiveCSSFrom8(10).width
  },
  dropdownContainerStyle: {
    ...Platform.select({
      ios: { zIndex: 1000 },
      android: { elevation: 1000 }
    })
  }
});
