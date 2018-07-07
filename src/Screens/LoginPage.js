import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "../redux";
import ScreenContainer from "../Templates/ScreenContainer";
import { M_Form } from "../Molecules";
import { A_Text, A_Button_Opacity } from "../Atoms";
import { loginAction } from "../redux/actions/employee.actions";
import { SCREEN_NAMES } from "../AppNavigator";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login_inputs = [
      {
        placeholder: "username",
        required: true
      },
      {
        placeholder: "password",
        required: true,
        secureTextEntry: true
      }
    ];
    this.signup_inputs = [
      {
        placeholder: "Business name",
        required: true
      },
      {
        placeholder: "Business address",
        required: true
        // todo...validate using google api that it is an actual location
      },
      {
        placeholder: "Primary contact name",
        required: true
      },
      {
        placeholder: "Primary contact email",
        required: true
      },
      {
        placeholder: "Primary contact phone number",
        required: true
      }
    ];
    this.state = {
      login_form: true
    };
  }

  login = inputs => {
    const [username, password] = inputs.map(input => input._lastNativeText);
    const credentials = { username, password };
    this.props
      .dispatch(loginAction(credentials))
      .then(employee => employee && this.navigateToDashboard(employee));
  };

  navigateToDashboard = employee => {
    if (!employee) return;
    this.props.navigation.resetTo(SCREEN_NAMES.Dashboard);
  };

  signup = inputs => {
    const [
      name,
      address,
      contact_name,
      contact_email,
      contact_phone
    ] = inputs.map(input => input._lastNativeText);
    /**
     * TODO...show message that we will contact them via email/phone
     *
     */
    console.warn("----TODO...handle flow around signing up new businesses.");
  };

  toggleForm = () => this.setState({ login_form: !this.state.login_form });

  render() {
    return (
      <ScreenContainer noHeader>
        {this.state.login_form ? (
          <M_Form
            title="Partner Account Log In"
            label="login_form"
            inputs={this.login_inputs}
            handleSubmit={this.login}
          />
        ) : (
          <M_Form
            title="New Partner Account Form"
            label="signup_form"
            inputs={this.signup_inputs}
            handleSubmit={this.signup}
          />
        )}
        <View>
          <A_Text>
            {this.state.login_form
              ? "New to Dineable? Welcome!"
              : "Already a Dineable Partner? Great!"}
          </A_Text>
          <A_Button_Opacity
            value={this.state.login_form ? "Sign up!" : "Log in!"}
            onPress={this.toggleForm}
          />
        </View>
      </ScreenContainer>
    );
  }
}

export default connect()(Login);
