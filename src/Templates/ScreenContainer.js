import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { APP_BACKGROUND_COLOR } from "../styles/Colors";
import { M_Header_Main } from "../Molecules";
import { O_MenuBar_Main } from "../Organisms";
import { getResponsiveCSSFrom8 } from "../utils";

export default props => (
  <View style={[style.container, props.containerStyle]}>
    {props.noHeader ? null : <M_Header_Main title={props.title} />}
    {props.scrollView ? (
      <ScrollView>{props.children}</ScrollView>
    ) : (
      props.children
    )}
    <O_MenuBar_Main />
  </View>
);
const style = StyleSheet.create({
  container: {
    backgroundColor: APP_BACKGROUND_COLOR,
    height: "100%",
    width: "100%",
    padding: getResponsiveCSSFrom8(10).width
  }
});
