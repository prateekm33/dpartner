import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { A_Input, A_Button, A_Text } from "../Atoms";
import { getResponsiveCSSFrom8 } from "../utils";

class M_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
    this.inputs = [];
  }
  handleSubmit = () => {
    if (!this.inputsValidated(this.inputs)) return;
    this.props.handleSubmit(this.inputs);
  };

  inputsValidated = inputs => {
    let validated = true;
    const newState = { errors: this.state.errors };
    inputs.forEach((input, idx) => {
      newState.errors[idx] = newState.errors[idx] || {};
      const value = input._lastNativeText;
      if (this.props.inputs[idx].required) {
        if (!value) {
          newState.errors[idx].required = "Required.";
          validated = false;
        } else {
          delete newState.errors[idx].required;
        }
      }
      const validators = this.props.inputs[idx].validate || [];
      validators.forEach(validator => {
        if (!validator.cb(value)) {
          newState.errors[idx][validator.message] = validator.message;
          validated = false;
        } else delete newState.errors[idx][validator.message];
      });
    });
    this.setState(newState);
    return validated;
  };

  wrappedInputs = inputs => {
    return inputs.map((input, idx) => {
      const copy = { ...input };
      copy.inputRef = el => {
        if (input.inputRef) input.inputRef(el);
        this.inputs[idx] = el;
      };
      return copy;
    });
  };

  renderInputErrors = (errors, idx) => {
    const nodes = [];
    for (let error in errors) {
      nodes.push(
        <A_Text
          key={`form-${this.props.label}-input-${idx}-error-${errors[error]}`}
          type="error"
        >
          {errors[error]}
        </A_Text>
      );
    }
    return nodes;
  };

  render() {
    const inputs = this.wrappedInputs(this.props.inputs);
    return (
      <View style={[this.props.formContainerStyles]}>
        {this.props.title && (
          <A_Text strong style={[style.titleStyles, this.props.titleStyles]}>
            {this.props.title}
          </A_Text>
        )}
        {inputs.map((input, idx) => {
          return (
            <View
              key={`form-${this.props.label}-input-${input.name || idx}`}
              style={this.props.inputContainerStyles}
            >
              <A_Input
                {...input}
                {...this.props.inputProps}
                style={[style.inputStyles, this.props.inputStyles]}
              />
              {this.renderInputErrors(this.state.errors[idx], idx)}
            </View>
          );
        })}
        {this.props.children}
        <A_Button
          onPress={this.handleSubmit}
          style={[style.submitButtonStyles, this.props.submitButtonStyles]}
          value={this.props.button_text || "Submit"}
          buttonTextStyles={[
            style.submitButtonTextStyles,
            this.props.submitButtonTextStyles
          ]}
          strong
          {...this.props.submitButtonProps}
        />
      </View>
    );
  }
}
M_Form.propTypes = {
  label: PropTypes.string.isRequired,
  inputs: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired
};

export { M_Form };

const style = StyleSheet.create({
  titleStyles: {
    textAlign: "center",
    fontSize: getResponsiveCSSFrom8(20).height
  },
  submitButtonStyles: {},
  submitButtonTextStyles: {
    fontSize: getResponsiveCSSFrom8(20).height,
    textAlign: "center"
  }
});
