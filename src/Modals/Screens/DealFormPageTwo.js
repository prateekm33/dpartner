import React, { Component } from "react";
import { StyleSheet } from "react-native";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
import { A_View, A_Text, A_Button, A_Image } from "chemics/Atoms";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import { getResponsiveCSSFrom8 } from "../../utils";
import base64 from "base-64";

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
        // TODO...quality control image here
        // check for appropriate size
        // width/height and most importantly: fileSize
        // although cloudinary may be able to dumb down the file size if needed...
        this.setState({ image_uri: response.uri });
        // let source = "data:image/jpeg;base64," + response.data;
        this.uploadFile(response)
          .then(res => res.json())
          .then(result => {
            console.warn("---results: ", result);
          })
          .catch(error => {
            console.warn("--nvm errro", error);
          });
        //   .then(res => res.text())
        //   .then(result => {
        //     console.warn("------url : ", result);
        //   });
      }
    });
  };

  uploadFile = file => {
    console.warn(file.uri, file.uri.split("file://")[1]);

    return RNFetchBlob.fetch(
      "POST",
      "https://api.cloudinary.com/v1_1/dlk4o3ttz/image/upload?upload_preset=dineable_dev_upload_preset",
      {
        "Content-Type": "application/json"
      },
      // [
      //   {
      //     name: "file",
      //     filename: file.fileName,
      //     data:
      //   }
      // ]
      JSON.stringify({
        file: base64.encode(file.data)
      })
    );
  };

  submit = () => {
    console.warn("--TODO...data validation first before dispatching action");
    this.props.dispatch(createNewDealAction(this.state.data));
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

export default DealFormPageTwo;

const style = StyleSheet.create({
  stockImageStyle: {
    height: getResponsiveCSSFrom8(300).height,
    width: getResponsiveCSSFrom8(300).width
  }
});
