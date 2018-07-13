import React, { Component } from "react";
import { connect } from "../redux";
import { StyleSheet } from "react-native";
import config from "../../config";
import ScreenContainer from "../Templates/ScreenContainer";
import {
  A_Text,
  A_Input,
  A_View,
  A_Text_Email,
  A_Input_Dropdown_Role,
  A_Button_Opacity
} from "chemics/Atoms";
import { USER_ROLES } from "../utils/constants";
import { M_VendorHours } from "chemics/Molecules";
import {
  logoutAction,
  updateEmployeeAction
} from "../redux/actions/employee.actions";
import { SCREEN_NAMES } from "../AppNavigator";
import { getResponsiveCSSFrom8 } from "../utils";
import { RED_TWO } from "../styles/Colors";

const ADMIN_DROPDOWN_OPTION = {
  text: "ADMIN",
  value: USER_ROLES.VENDOR_ADMIN
};
const EMPLOYEE_DROPDOWN_OPTION = {
  text: "EMPLOYEE",
  value: USER_ROLES.VENDOR_EMPLOYEE
};
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    let role;
    if (props.employee.role === USER_ROLES.VENDOR_ADMIN)
      role = ADMIN_DROPDOWN_OPTION;
    else if (props.employee.role === USER_ROLES.VENDOR_EMPLOYEE)
      role = EMPLOYEE_DROPDOWN_OPTION;
    this.state = {
      role,
      first_name: props.employee.first_name,
      last_name: props.employee.last_name,
      email: props.employee.email
    };
  }

  savePersonalInfo = () => {
    const { role, first_name, last_name, email } = this.state;
    const updates = {
      role,
      first_name,
      last_name,
      email
    };
    this.props.dispatch(updateEmployeeAction(this.props.employee, updates));
  };

  changeRole = (role, employee, idx) => {
    this.setState({ role });
  };

  changeFirstName = first_name => this.setState({ first_name });
  changeLastName = last_name => this.setState({ last_name });
  changeEmail = email => this.setState({ email });

  logout = () =>
    this.props.dispatch(logoutAction()).then(success => {
      if (!success) return;
      this.props.navigation.resetTo(SCREEN_NAMES.SplashScreen);
    });

  render() {
    const { employee, vendor } = this.props;
    return (
      <ScreenContainer
        title="Profile"
        scrollView
        containerStyle={style.containerStyle}
        headerMainContainerStyle={{
          backgroundColor: "#3D9990" //"#03a9f4"
        }}
        headerMainTitleTextStyle={{
          color: "white"
        }}
      >
        <A_View
          style={{
            marginBottom: getResponsiveCSSFrom8(25).height,
            borderBottomWidth: 1,
            borderBottomColor: "lightgrey"
          }}
        >
          <A_Text
            strong
            style={{ marginBottom: getResponsiveCSSFrom8(5).height }}
          >
            BUSINESS INFORMATION
          </A_Text>
          <A_Text style={{ marginBottom: getResponsiveCSSFrom8(25).height }}>
            Please contact us at{" "}
            <A_Text_Email
              buttonStyles={{ height: getResponsiveCSSFrom8(20).height }}
            >
              {config.email_addresses.merchants}
            </A_Text_Email>{" "}
            if you notice any issues and/or you need to update your business's
            information
          </A_Text>
          <A_Text strong>Business name</A_Text>
          <A_Text style={{ marginBottom: getResponsiveCSSFrom8(25).height }}>
            {vendor.name}
          </A_Text>
          <A_Text strong>Business phone</A_Text>
          <A_Text style={{ marginBottom: getResponsiveCSSFrom8(25).height }}>
            {vendor.business_phone}
          </A_Text>
          <M_VendorHours
            hours={vendor.hours}
            containerStyles={{ marginBottom: getResponsiveCSSFrom8(25).height }}
          />
        </A_View>
        <A_View>
          <A_Text
            strong
            style={{ marginBottom: getResponsiveCSSFrom8(20).height }}
          >
            PERSONAL INFORMATION
          </A_Text>
          <A_Text strong>First Name</A_Text>
          <A_Input
            placeholder="First name"
            defaultValue={employee.first_name}
            onChangeText={this.changeFirstName}
            style={{
              borderWidth: 1
            }}
          />
          <A_Text
            strong
            style={{ marginTop: getResponsiveCSSFrom8(25).height }}
          >
            Last Name
          </A_Text>
          <A_Input
            placeholder="Last name"
            defaultValue={employee.last_name}
            onChangeText={this.changeLastName}
            style={{
              borderWidth: 1
            }}
          />
          <A_Input_Dropdown_Role
            role={employee.role}
            changeRole={role => this.changeRole(role, employee, idx)}
            dropdownContainerStyle={{
              marginTop: getResponsiveCSSFrom8(25).height
            }}
          />
          <A_Text
            strong
            style={{ marginTop: getResponsiveCSSFrom8(25).height }}
          >
            Email
          </A_Text>
          <A_Input
            placeholder="Email"
            defaultValue={employee.email}
            onChangeText={this.changeEmail}
            style={{
              borderWidth: 1
            }}
          />
          <A_Button_Opacity
            strong
            value="SAVE"
            onPress={this.savePersonalInfo}
            style={[style.saveButtonStyles]}
            buttonTextStyles={style.saveButtonTextStyles}
          />
        </A_View>
        <A_Button_Opacity
          onPress={this.logout}
          value="Logout"
          style={style.logoutButtonStyles}
          buttonTextStyles={style.logoutButtonTextStyles}
          strong
        />
      </ScreenContainer>
    );
  }
}

export default connect(state => ({
  employee: state.employee,
  vendor: state.vendor
}))(ProfilePage);

const style = StyleSheet.create({
  containerStyle: {},
  logoutButtonStyles: {
    marginBottom: getResponsiveCSSFrom8(50).height,
    backgroundColor: RED_TWO,
    alignItems: "center"
  },
  logoutButtonTextStyles: {
    color: "white",
    fontSize: getResponsiveCSSFrom8(20).height
  },
  saveButtonStyles: {
    alignItems: "center",
    marginVertical: getResponsiveCSSFrom8(20).height,
    backgroundColor: "#3D9990"
  },
  saveButtonTextStyles: {
    color: "white",
    fontSize: getResponsiveCSSFrom8(20).height
  }
});
