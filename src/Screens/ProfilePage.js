import React, { Component } from "react";
import { connect } from "../redux";
import config from "../../config";
import ScreenContainer from "../Templates/ScreenContainer";
import {
  A_Text,
  A_Input,
  A_Button,
  A_Input_Dropdown,
  A_View,
  A_Text_Email,
  A_Input_Dropdown_Role
} from "../Atoms";
import { USER_ROLES } from "../utils/constants";
import { M_VendorHours } from "../Molecules";
import { logoutAction } from "../redux/actions/employee.actions";
import { SCREEN_NAMES } from "../AppNavigator";

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
      first_name: "",
      last_name: "",
      email: ""
    };
  }

  savePersonalInfo = () => {
    console.warn("---TODO...");
    // this.props.dispatch();
  };

  changeRole = (role, employee, idx) => {
    this.setState({ role });
  };

  changeFirstName = first_name => this.setState({ first_name });
  changeLastName = last_name => this.setState({ last_name });
  changeEmail = email => this.setState({ email });

  logout = () =>
    this.props.dispatch(logoutAction()).then(() => {
      this.props.navigation.resetTo(SCREEN_NAMES.SplashScreen);
    });

  render() {
    const { employee, vendor } = this.props;
    return (
      <ScreenContainer title="Profile">
        <A_View>
          <A_Text strong>BUSINESS INFORMATION</A_Text>
          <A_Text>
            Please contact us at{" "}
            <A_Text_Email>{config.email_addresses.merchants}</A_Text_Email> if
            you notice any issues and/or you need to update your business's
            information
          </A_Text>
          <A_Text strong>Business name</A_Text>
          <A_Text>{vendor.name}</A_Text>
          <A_Text strong>Business phone</A_Text>
          <A_Text>{vendor.business_phone}</A_Text>
          <M_VendorHours hours={vendor.hours} />
        </A_View>
        <A_View>
          <A_Text strong>PERSONAL INFORMATION</A_Text>
          <A_Text strong>First Name</A_Text>
          <A_Input
            placeholder="First name"
            defaultValue={employee.first_name}
            onChangeText={this.changeFirstName}
          />
          <A_Text strong>Last Name</A_Text>
          <A_Input
            placeholder="Last name"
            defaultValue={employee.last_name}
            onChangeText={this.changeLastName}
          />
          <A_Input_Dropdown_Role
            role={employee.role}
            changeRole={role => this.changeRole(role, employee, idx)}
          />
          <A_Text strong>Email</A_Text>
          <A_Input
            placeholder="Email"
            defaultValue={employee.email}
            onChangeText={this.changeEmail}
          />
          <A_Button value="SAVE" onPress={this.savePersonalInfo} />
        </A_View>
        <A_Button onPress={this.logout} value="Logout" />
      </ScreenContainer>
    );
  }
}

export default connect(state => ({
  employee: state.employee,
  vendor: state.vendor
}))(ProfilePage);
