import React, { Component } from "react";
import { StyleSheet } from "react-native";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";
import {
  A_View,
  A_Text,
  A_Image,
  A_Input,
  A_Button_Opacity,
  A_Input_Date
} from "../Atoms";
import { getResponsiveCSSFrom8 } from "../utils";
import { WEIGHT } from "../styles/defaults";

class M_Editable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false
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
        this.updateValue(response);
      }
    });
  };

  renderEditableImage = () => {
    return (
      <A_Button_Opacity disabled={!this.state.editable} onPress={this.choose}>
        <A_Image
          source={
            this.state.editable
              ? require("../assets/delete_icon.png") // TODO...replace with edit_image.png
              : this.props.content
          }
          style={[
            style.imageInputStyle,
            this.props.inputStyle,
            this.state.editable && style.editableInputStyle,
            this.state.editable && this.props.editableInputStyle
          ]}
        />
      </A_Button_Opacity>
    );
  };

  renderEditableText = () => {
    return (
      <A_Input
        editable={this.state.editable}
        style={[
          style.textInputStyle,
          this.props.inputStyle,
          this.state.editable && style.editableInputStyle,
          this.state.editable && this.props.editableInputStyle
        ]}
        numberOfLines={5}
        multiline={true}
        defaultValue={this.props.content.trim()}
        onChangeText={this.updateValue}
        inputRef={el => (this.input = el)}
      />
    );
  };

  renderEditableDate = () => {
    return (
      <A_Input_Date
        onComplete={this.updateValue}
        defaultValue={this.props.content}
        editable={this.state.editable}
        monthRef={el => (this.input = el)}
      />
    );
  };

  toggleEdit = () => {
    this.setState({ editable: !this.state.editable }, () => {
      if (this.state.editable && this.input) this.input.focus();
    });
  };

  save = () => {
    this.props.onComplete(this.state.value).then(complete => {
      if (complete) this.toggleEdit();
    });
  };

  updateValue = value => this.setState({ value });

  renderTitle = () => {
    if (this.props.titleEditable) {
      return (
        <A_View>
          <A_Input
            defaultValue={this.props.title}
            style={[
              { fontWeight: WEIGHT.BOLD },
              style.titleStyles,
              this.props.titleStyles
            ]}
            editable={this.state.editable}
            inputRef={el => (this.input = el)}
            multiline={true}
            numberOfLines={3}
            onChangeText={this.updateValue}
          />
          <A_View style={{ flexDirection: "row", flexWrap: "nowrap" }}>
            <A_Button_Opacity
              value={this.state.editable ? "Save" : "Edit"}
              style={{ marginRight: getResponsiveCSSFrom8(20).width }}
              onPress={this.state.editable ? this.save : this.toggleEdit}
            />
            {this.state.editable && (
              <A_Button_Opacity value="Cancel" onPress={this.toggleEdit} />
            )}
          </A_View>
        </A_View>
      );
    } else {
      return (
        <A_View
          style={{
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "center"
          }}
        >
          <A_Text
            strong
            style={[{ flex: 0.6 }, style.titleStyles, this.props.titleStyles]}
            multiline={true}
            numberOfLines={3}
          >
            {this.props.title}
          </A_Text>
          {this.renderEditButtons()}
        </A_View>
      );
    }
  };

  renderEditButtons = () => (
    <A_View
      style={{
        flex: 0.4,
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-end"
      }}
    >
      {this.state.editable && (
        <A_Button_Opacity
          value="Cancel"
          onPress={this.toggleEdit}
          buttonTextStyles={{
            fontSize: getResponsiveCSSFrom8(18).height,
            marginRight: getResponsiveCSSFrom8(20).width
          }}
        />
      )}
      <A_Button_Opacity
        value={this.state.editable ? "Save" : "Edit"}
        onPress={this.state.editable ? this.save : this.toggleEdit}
        buttonTextStyles={{ fontSize: getResponsiveCSSFrom8(18).height }}
      />
    </A_View>
  );

  render() {
    let { type } = this.props;
    if (!type) type = "";
    let nodes = null;
    switch (type.toLowerCase()) {
      case "text":
        nodes = this.renderEditableText();
        break;
      case "image":
        nodes = this.renderEditableImage();
        break;
      case "date":
        nodes = this.renderEditableDate();
        break;
    }
    return (
      <A_View style={[style.containerStyle, this.props.containerStyle]}>
        <A_View style={style.titleContainerStyle}>
          {this.props.title && this.renderTitle()}
        </A_View>
        {nodes}
      </A_View>
    );
  }
}

export { M_Editable };

const style = StyleSheet.create({
  containerStyle: {
    marginVertical: getResponsiveCSSFrom8(20).height
  },
  titleContainerStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleStyles: {
    fontSize: getResponsiveCSSFrom8(20).height,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  textInputStyle: {
    fontSize: getResponsiveCSSFrom8(18).height,
    paddingHorizontal: 0,
    paddingVertical: 0
  }
});
