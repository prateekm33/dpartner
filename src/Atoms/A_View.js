import React from "react";
import { View, ScrollView } from "react-native";
import { getResponsiveCSSFrom8 } from "../utils";

export const A_View = props => (
  <View {...props} style={[{ backgroundColor: "white" }, props.style]}>
    {props.children}
  </View>
);

export const A_View_Scroll = props => (
  <ScrollView
    {...props}
    style={[
      { backgroundColor: "white", padding: getResponsiveCSSFrom8(5).width },
      props.style
    ]}
  >
    {props.children}
  </ScrollView>
);
