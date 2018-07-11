import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  A_View_Scroll,
  A_Input,
  A_Input_Date,
  A_Button,
  A_Text
} from "../Atoms";
import { SCREEN_NAMES } from "../AppNavigator";
import { getResponsiveCSSFrom8 } from "../utils";

class DealFormPageOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: null,
      headline: "",
      details: "",
      expiration: null,
      discount_amount: 0
    };
  }

  updateName = name => this.setState({ name });
  updateCode = code => this.setState({ code });
  updateDiscountAmount = discount_amount => this.setState({ discount_amount });
  updateHeadline = headline => this.setState({ headline });
  updateDetails = details => this.setState({ details });
  updateExpiration = expiration => this.setState({ expiration });

  goToNext = () =>
    this.props.navigation.navigate(SCREEN_NAMES.DealFormPageTwo, {
      data: this.state
    });

  render() {
    return (
      <A_View_Scroll contentContainerStyle={[style.scrollContainer]}>
        <A_Text
          strong
          style={{
            fontSize: getResponsiveCSSFrom8(25).height,
            textAlign: "center"
          }}
        >
          NEW DEAL
        </A_Text>
        <A_Input
          placeholder="Name"
          onChangeText={this.updateName}
          style={[style.formInputContainer]}
        />
        <A_Input
          placeholder="Code"
          onChangeText={this.updateCode}
          style={[style.formInputContainer]}
        />
        <A_Input
          placeholder="Discount amount"
          onChangeText={this.updateDiscountAmount}
          style={[style.formInputContainer]}
        />
        <A_Input_Date
          onComplete={this.updateExpiration}
          style={[style.formInputContainer]}
        />
        <A_Input
          placeholder="Headline"
          onChangeText={this.updateHeadline}
          numberOfLines={2}
          multiline={true}
          style={[style.formInputContainer, style.headlineInput]}
        />
        <A_Input
          placeholder="Details"
          onChangeText={this.updateDetails}
          numberOfLines={5}
          multiline={true}
          style={{ height: getResponsiveCSSFrom8(200).height }}
          style={[style.formInputContainer, style.detailsInput]}
        />
        <A_Button
          value="Next"
          onPress={this.goToNext}
          style={style.nextButtonStyle}
          buttonTextStyles={style.nextButtonTextStyles}
          strong
        />
      </A_View_Scroll>
    );
  }
}

export default DealFormPageOne;

const style = StyleSheet.create({
  scrollContainer: {
    flexDirection: "column",
    paddingHorizontal: getResponsiveCSSFrom8(30).width,
    paddingBottom: getResponsiveCSSFrom8(80).height,
    marginTop: getResponsiveCSSFrom8(30).height
  },
  formInputContainer: {
    marginVertical: getResponsiveCSSFrom8(30).height,
    borderBottomWidth: 1
  },
  headlineInput: {
    height: getResponsiveCSSFrom8(100).height,
    borderWidth: 0.4
  },
  detailsInput: { height: getResponsiveCSSFrom8(200).height, borderWidth: 0.4 },
  nextButtonStyle: {
    alignItems: "center",
    backgroundColor: "#7b2525"
  },
  nextButtonTextStyles: {
    fontSize: getResponsiveCSSFrom8(20).height,
    color: "white"
  }
});
