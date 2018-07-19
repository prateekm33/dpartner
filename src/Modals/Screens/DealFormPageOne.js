import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { A_Input, A_Input_Date, A_Button, A_Text } from "chemics/Atoms";
import { getResponsiveCSSFrom8 } from "../../utils";
import { DEAL_FORM_MODAL_SCREEN_NAMES } from "../DealFormModal";
import ScreenContainer from "chemics/Templates/ScreenContainer";

class DealFormPageOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: null,
      headline: "",
      details: "",
      expiration: null,
      discount_amount: 0,
      tags: ""
    };
  }

  updateName = name => this.setState({ name });
  updateCode = code => this.setState({ code });
  updateDiscountAmount = discount_amount => this.setState({ discount_amount });
  updateHeadline = headline => this.setState({ headline });
  updateDetails = details => this.setState({ details });
  updateExpiration = expiration => this.setState({ expiration });
  updateTags = tags => this.setState({ tags });

  goToNext = () =>
    this.props.navigation.navigate(
      DEAL_FORM_MODAL_SCREEN_NAMES.DealFormPageTwo,
      {
        data: this.state
      }
    );

  close = () => this.props.screenProps.mainNavigation.goBack();

  render() {
    return (
      <ScreenContainer
        scrollView
        onClose={this.close}
        title="New Deal"
        headerMainContainerStyle={{
          backgroundColor: "#36A0B2"
        }}
        headerMainTitleTextStyle={{
          color: "white"
        }}
      >
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
          placeholder="Discount amount (%)"
          onChangeText={this.updateDiscountAmount}
          style={[style.formInputContainer]}
        />
        <A_Text
          style={{ color: "grey", fontSize: getResponsiveCSSFrom8(20).height }}
        >
          Good Until
        </A_Text>
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
          style={[style.formInputContainer, style.detailsInput]}
        />
        <A_Input
          placeholder="Tags"
          numberOfLines={3}
          multiline={true}
          style={[style.formInputContainer]}
          onChangeText={this.updateTags}
        />
        <A_Text>Enter as many tags as you'd like separated by commas.</A_Text>
        <A_Button
          value="Next"
          onPress={this.goToNext}
          style={style.nextButtonStyle}
          buttonTextStyles={style.nextButtonTextStyles}
          strong
        />
      </ScreenContainer>
    );
  }
}

export default DealFormPageOne;

const style = StyleSheet.create({
  formInputContainer: {
    marginVertical: getResponsiveCSSFrom8(30).height,
    borderBottomWidth: 1
  },
  headlineInput: {
    height: getResponsiveCSSFrom8(100).height,
    borderWidth: 1.6,
    borderColor: "lightgrey"
  },
  detailsInput: { height: getResponsiveCSSFrom8(200).height, borderWidth: 0.4 },
  nextButtonStyle: {
    alignItems: "center",
    backgroundColor: "#7b2525",
    marginBottom: getResponsiveCSSFrom8(25).height
  },
  nextButtonTextStyles: {
    fontSize: getResponsiveCSSFrom8(20).height,
    color: "white"
  }
});
