import React, { Component } from "react";
import { StyleSheet } from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "../../redux";
import { A_View, A_Text, A_Button, A_Image } from "chemics/Atoms";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import { getResponsiveCSSFrom8 } from "../../utils";
import base64 from "base-64";
import { createNewDealAction } from "../../redux/actions/deal.actions";

class DealFormPageTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.navigation.state.params.data,
      image: null
    };
  }

  choose = () => {
    const options = {
      title: "Select thumbnail image.",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.warn("----user cancelled image picker");
      } else if (response.error) {
        console.warn("-----image picker error", response.error);
      } else if (response.customButton) {
        console.warn("-----user tapped custom button", respose.customButton);
      } else {
        console.warn(response);
        this.setState({
          image_uri: response.uri,
          image: `data:image/jpg;base64,${response.data}`
        });
      }
    });
  };

  submit = () => {
    console.warn("--TODO...data validation first before dispatching action");
    const tags = this.state.tags.split(",").map(val => val.trim());
    const state_copy = { ...this.state };
    delete state_copy.image_uri;
    this.props.dispatch(createNewDealAction({ ...state_copy, tags }));
  };

  close = () => this.props.screenProps.mainNavigation.goBack();

  render() {
    return (
      <ScreenContainer
        title="Upload Image"
        onClose={this.close}
        scrollView
        headerMainContainerStyle={{
          backgroundColor: "#36A0B2"
        }}
        headerMainTitleTextStyle={{
          color: "white"
        }}
      >
        <A_Text strong>UPLOAD AN IMAGE</A_Text>
        <A_Button value="Choose an image" onPress={this.choose} />
        <A_Image
          source={{ uri: this.state.image_uri }}
          style={[style.stockImageStyle]}
        />
        <A_Button onPress={this.submit} value="Submit" />
      </ScreenContainer>
    );
  }
}

export default connect()(DealFormPageTwo);

const style = StyleSheet.create({
  stockImageStyle: {
    height: getResponsiveCSSFrom8(300).height,
    width: getResponsiveCSSFrom8(300).width
  }
});
