import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { A_Text } from "../Atoms";
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
    justifyContent: "center",
    alignItems: "center",
    paddingTop: getResponsiveCSSFrom8(15).height,
    shadowOpacity: 1,
    shadowColor: "lightgrey",
    shadowOffset: {
      height: getResponsiveCSSFrom8(2).height,
      width: 0
    },
    shadowRadius: getResponsiveCSSFrom8(5).width
  },
  headerMainTitleTextStyle: {
    fontSize: getResponsiveCSSFrom8(30).height
  }
});
