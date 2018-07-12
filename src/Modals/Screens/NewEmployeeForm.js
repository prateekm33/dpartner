import React, { Component } from "react";
import { connect } from "../../redux";
import {
  A_View,
  A_Text,
  A_Input,
  A_Input_Dropdown_Role,
  A_Button
} from "../../Atoms";
import { USER_ROLES } from "../../utils/constants";
import { createNewEmployeeAction } from "../../redux/actions/employee.actions";
import ScreenContainer from "../../Templates/ScreenContainer";

class NewEmployeeFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: USER_ROLES.VENDOR_EMPLOYEE
    };
  }

  changeFirstName = first_name => this.setState({ first_name });
  changeLastName = last_name => this.setState({ last_name });
  changeEmail = email => this.setState({ email });
  changePassword = password => this.setState({ password });
  changeRole = role => this.setState({ role });

  submit = () => {
    this.props.dispatch(createNewEmployeeAction(this.state)).then(employee => {
      if (!employee) return;
      try {
        this.props.screenProps.params.onDone();
      } catch (e) {}
      this.close();
    });
  };

  close = () => {
    this.props.screenProps.mainNavigation.goBack();
  };

  render() {
    return (
      <ScreenContainer
        title="New Employee"
        scrollView
        onClose={this.close}
        headerMainContainerStyle={{
          backgroundColor: "#622f6b"
        }}
        headerMainTitleTextStyle={{
          color: "white"
        }}
      >
        <A_Input placeholder="First name" onChangeText={this.changeFirstName} />
        <A_Input placeholder="Last name" onChangeText={this.changeLastName} />
        <A_Input placeholder="Email" onChangeText={this.changeEmail} />
        <A_Input
          placeholder="Password"
          onChangeText={this.changePassword}
          secureTextEntry
        />
        <A_Input_Dropdown_Role changeRole={role => this.changeRole(role)} />
        <A_Button value="CREATE" onPress={this.submit} />
      </ScreenContainer>
    );
  }
}

export default connect()(NewEmployeeFormPage);
