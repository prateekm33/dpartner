import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { A_Text, A_Icon_Close, A_View } from "../Atoms";
import { getResponsiveCSSFrom8 } from "../utils";
import { TEAL, TEAL_DARK_ONE } from "../styles/Colors";

const M_Header = props => {
  return (
    <View style={[style.header, props.headerContainerStyle]}>
      {/* {props.StatusBar && <props.StatusBar />} */}
      <A_Text
        strong
        style={[style.headerTitleText, props.headerTitleTextStyle]}
      >
        {props.title}
      </A_Text>
    </View>
  );
};

const M_Header_Main = props => (
  <View
    style={[style.headerMainContainerStyle, props.headerMainContainerStyle]}
  >
    {/* <StatusBar barStyle="dark-content" /> */}
    <A_Text
      strong
      style={[style.headerMainTitleTextStyle, props.headerMainTitleTextStyle]}
    >
      {props.title}
    </A_Text>
    <A_View style={style.closeIconContainerStyles}>
      {props.onClose && <A_Icon_Close onPress={props.onClose} />}
    </A_View>
  </View>
);

export { M_Header, M_Header_Main };

const style = StyleSheet.create({
  header: {},
  headerTitleText: {},
  headerMainContainerStyle: {
    height: getResponsiveCSSFrom8(80).height,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    alignItems: "center",
    paddingTop: getResponsiveCSSFrom8(15).height,
    shadowOpacity: 1,
    shadowColor: "lightgrey",
    shadowOffset: {
      height: getResponsiveCSSFrom8(2).height,
      width: 0
    },
    shadowRadius: getResponsiveCSSFrom8(5).width,
    justifyContent: "center"
  },
  headerMainTitleTextStyle: {
    fontSize: getResponsiveCSSFrom8(25).height
  },
  closeIconContainerStyles: {
    position: "absolute",
    right: getResponsiveCSSFrom8(5).width
  }
});
