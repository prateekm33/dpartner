import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { A_View, A_Text, A_Button, A_Image } from "../../Atoms";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";
import { createNewLoyaltyRewardAction } from "../../redux/actions/reward.actions";
import { getResponsiveCSSFrom8 } from "../../utils";
import ScreenContainer from "../../Templates/ScreenContainer";

class RewardFormPageTwo extends Component {
  constructor(props) {
    super(props);
    console.warn("-----image uploader...TODO...");
    const data = props.navigation.state.params.data;
    this.state = {
      ...data,
      points_reward_ratio: data.points_rewarded / data.amount_spent,
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
        // TODO...quality control image here
        // check for appropriate size
        // width/height and most importantly: fileSize
        // although cloudinary may be able to dumb down the file size if needed...
        this.setState({ image: response });
        // let source = "data:image/jpeg;base64," + response.data;
        // this.uploadFile(source)
        //   .then(res => res.text())
        //   .then(result => {
        //     console.warn("------url : ", result);
        //   });
      }
    });
  };

  uploadFile = file => {
    return RNFetchBlob.fetch(
      "POST",
      "https://api.cloudinary.com/v1_1/dlk4o3ttz/image/upload?upload_preset=dineable_dev_upload_preset",
      {
        "Content-Type": "application/octet-stream"
      },
      RNFetchBlob.wrap(file.origURL)
    );
  };

  submit = () => {
    console.warn("--TODO...data validation first before dispatching action");
    this.props.dispatch(createNewLoyaltyRewardAction(this.state.data));
  };

  close = () => this.props.screenProps.mainNavigation.goBack();

  render() {
    return (
      <ScreenContainer
        title="Upload Image"
        scrollView
        onClose={this.close}
        headerMainContainerStyle={{
          backgroundColor: "#26627d"
        }}
        headerMainTitleTextStyle={{
          color: "white"
        }}
      >
        <A_Text strong>UPLOAD AN IMAGE</A_Text>
        <A_Button value="Choose an image" onPress={this.choose} />
        {this.state.image && (
          <A_Image
            source={this.state.image ? { uri: this.state.image.uri } : null}
            style={[
              style.stockImageStyle,
              this.state.image && {
                height: this.state.image.height,
                width: this.state.image.width
              }
            ]}
          />
        )}
      </ScreenContainer>
    );
  }
}

export default RewardFormPageTwo;

const style = StyleSheet.create({
  stockImageStyle: {
    height: getResponsiveCSSFrom8(200).height,
    width: "95%"
  }
});
