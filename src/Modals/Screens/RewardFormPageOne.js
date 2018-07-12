import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { A_Text, A_Input, A_Button, A_View_Scroll } from "../../Atoms";
import { getResponsiveCSSFrom8 } from "../../utils";
import { REWARD_FORM_MODAL_SCREEN_NAMES } from "../RewardFormModal";

class RewardFormPageOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: null,
      amount_spent: 0,
      points_rewarded: 0,
      headline: "",
      details: ""
    };
  }

  goToNext = () =>
    this.props.navigation.navigate(
      REWARD_FORM_MODAL_SCREEN_NAMES.RewardFormPageTwo,
      {
        data: this.state
      }
    );

  updateName = name => this.setState({ name });
  updateCode = code => this.setState({ code });
  updateAmountSpent = amount_spent => this.setState({ amount_spent });
  updatePointsRewarded = points_rewarded => this.setState({ points_rewarded });
  updateHeadline = headline => this.setState({ headline });
  updateDetails = details => this.setState({ details });

  render() {
    return (
      <A_View_Scroll contentContainerStyle={[style.scrollContainer]}>
        <A_Input
          placeholder="Name"
          onChangeText={this.updateName}
          style={[style.formInputContainer, style.formInput]}
        />
        <A_Input
          placeholder="Code"
          onChangeText={this.updateCode}
          style={[style.formInput]}
        />
        <View style={[style.ratioInputContainer, style.formInputContainer]}>
          <A_Input
            placeholder="Amt Spent"
            onChangeText={this.updateAmountSpent}
            style={[style.formInput]}
          />
          <A_Text>/</A_Text>
          <A_Input
            placeholder="Points Rewarded"
            onChangeText={this.updatePointsRewarded}
            style={[style.formInput]}
          />
        </View>
        <A_Input
          placeholder="Headline"
          onChangeText={this.updateHeadline}
          style={[
            style.formInputContainer,
            style.formInput,
            style.headlineInput
          ]}
        />
        <A_Input
          placeholder="Details"
          onChangeText={this.updateDetails}
          style={[
            style.formInputContainer,
            style.formInput,
            style.detailsInput
          ]}
        />
        <A_Button value="Next" onPress={this.goToNext} />
      </A_View_Scroll>
    );
  }
}

export default RewardFormPageOne;

const style = StyleSheet.create({
  scrollContainer: {
    flexDirection: "column",
    paddingHorizontal: getResponsiveCSSFrom8(30).width,
    paddingBottom: getResponsiveCSSFrom8(200).height,
    marginTop: getResponsiveCSSFrom8(30).height
  },
  formInputContainer: {
    marginVertical: getResponsiveCSSFrom8(30).height
  },
  ratioInputContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  },
  headlineInput: { height: getResponsiveCSSFrom8(100).height },
  detailsInput: { height: getResponsiveCSSFrom8(200).height }
});
