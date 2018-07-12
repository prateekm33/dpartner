import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TEAL } from "../styles/Colors";
import { M_Header_Main } from "../Molecules";
import { O_MenuBar_Main } from "../Organisms";
import { getResponsiveCSSFrom8 } from "../utils";
import { A_View } from "../Atoms";

export default props => (
  <View style={[style.container, props.containerStyle]}>
    {props.noHeader ? null : (
      <M_Header_Main
        title={props.title}
        headerMainContainerStyle={props.headerMainContainerStyle}
        headerMainTitleTextStyle={props.headerMainTitleTextStyle}
        onClose={props.onClose}
      />
    )}
    {props.scrollView ? (
      <ScrollView style={style.innerContainerStyle}>
        {props.children}
      </ScrollView>
    ) : (
      <A_View style={style.innerContainerStyle}>{props.children}</A_View>
    )}
  </View>
);
const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    width: "100%"
  },
  innerContainerStyle: {
    padding: getResponsiveCSSFrom8(10).width
  }
});
