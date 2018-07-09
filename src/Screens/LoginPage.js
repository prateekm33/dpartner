import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "../redux";
import ScreenContainer from "../Templates/ScreenContainer";
import { M_Form } from "../Molecules";
import { A_Button_Opacity, A_View } from "../Atoms";
import { loginAction } from "../redux/actions/employee.actions";
import { SCREEN_NAMES } from "../AppNavigator";
import { getResponsiveCSSFrom8 } from "../utils";
import {
  APP_BACKGROUND_COLOR_LIGHT,
  APP_BACKGROUND_COLOR_DARK_ONE,
  APP_BACKGROUND_COLOR_DARK_TWO
} from "../styles/Colors";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login_inputs = [
      {
        placeholder: "Username",
        required: true
      },
      {
        placeholder: "Password",
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
      <ScreenContainer noHeader containerStyle={style.screenContainerStyle}>
        {this.state.login_form ? (
          <M_Form
            title="Dineable Partners"
            label="login_form"
            inputs={this.login_inputs}
            handleSubmit={this.login}
            titleStyles={style.titleStyles}
            formContainerStyles={style.formContainerStyles}
            inputContainerStyles={style.inputContainerStyles}
            submitButtonStyles={style.submitButtonStyles}
            submitButtonTextStyles={style.submitButtonTextStyles}
            inputStyles={style.inputStyles}
            inputProps={inputProps}
            button_text="Log In"
          />
        ) : (
          <M_Form
            title="Dineable Partners"
            label="signup_form"
            inputs={this.signup_inputs}
            handleSubmit={this.signup}
            titleStyles={style.titleStyles}
            formContainerStyles={style.formContainerStyles}
            inputContainerStyles={style.inputContainerStyles}
            submitButtonStyles={style.submitButtonStyles}
            submitButtonTextStyles={style.submitButtonTextStyles}
            inputStyles={style.inputStyles}
            inputProps={inputProps}
            button_text="Sign Up"
          />
        )}
        <A_View style={style.switchFormContainerStyles}>
          <A_Button_Opacity
            value={this.state.login_form ? "Sign up" : "Log in"}
            onPress={this.toggleForm}
            buttonTextStyles={style.switchFormButtonTextStyles}
            style={style.switchFormButtonStyles}
          />
        </A_View>
      </ScreenContainer>
    );
  }
}

export default connect()(Login);

const style = StyleSheet.create({
  screenContainerStyle: {
    justifyContent: "center",
    paddingHorizontal: getResponsiveCSSFrom8(30).width
  },
  titleStyles: {
    fontSize: getResponsiveCSSFrom8(30).height,
    marginBottom: getResponsiveCSSFrom8(50).height
  },
  formContainerStyles: {
    alignSelf: "center",
    width: "100%",
    alignItems: "center"
  },
  inputContainerStyles: {},
  submitButtonStyles: {
    marginTop: getResponsiveCSSFrom8(20).height,
    width: getResponsiveCSSFrom8(280).width,
    backgroundColor: APP_BACKGROUND_COLOR_DARK_TWO
  },
  submitButtonTextStyles: {
    color: "white"
  },
  inputStyles: {
    textAlign: "center",
    color: APP_BACKGROUND_COLOR_DARK_ONE
  },
  switchFormContainerStyles: {
    marginTop: getResponsiveCSSFrom8(20).height,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  switchFormContainerTextStyles: {
    marginRight: getResponsiveCSSFrom8(10).width
  },
  switchFormButtonTextStyles: {
    fontSize: getResponsiveCSSFrom8(20).height
  },
  switchFormButtonStyles: {
    alignItems: "center",
    width: "100%"
  }
});

const inputProps = {
  placeholderTextColor: APP_BACKGROUND_COLOR_LIGHT
};
