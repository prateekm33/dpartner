import React, { Component } from "react";
import { connect } from "../redux";
import { View } from "react-native";
import ScreenContainer from "../Templates/ScreenContainer";
import { A_Text } from "../Atoms";

class DealPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal: props.navigation.state.params.deal
    };
  }

  componentWillMount = () => {
    /**
     * TODO...consider changing API on dealspage to only fetch bare minimum for deals
     * then on this page fetch all the details needed for the deal
     */
  };

  render() {
    return (
      <ScreenContainer title={`Deal #${this.state.deal.code}`}>
        {}
        <View>
          <A_Text strong>CODE:</A_Text>
          <A_Text>{this.state.deal.code}</A_Text>
        </View>
        <A_Text strong>{this.state.deal.name}</A_Text>
        <A_Text strong>Image</A_Text>
        {this.state.deal.image && <A_Image source={this.state.deal.image} />}
        <A_Text strong>Short Description</A_Text>
        <A_Text>{this.state.deal.short_desc}</A_Text>
        <A_Text strong>Long Description</A_Text>
        <A_Text>{this.state.deal.long_desc}</A_Text>
        <View>
          <A_Text strong>Good Until</A_Text>
          <A_Text>{this.state.deal.getFormattedExpiration()}</A_Text>
        </View>
      </ScreenContainer>
    );
  }
}

export default connect()(DealPage);
