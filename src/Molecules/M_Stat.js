import React from "react";
import { View, StyleSheet } from "react-native";
import { A_Text, A_View } from "../Atoms";
import { getResponsiveCSSFrom8 } from "../utils";

const M_Stat = props => {
  let titleNode;
  if (typeof props.title === "string")
    titleNode = (
      <A_Text strong style={[style.statTitle, props.statTitleStyle]}>
        {props.title}
      </A_Text>
    );
  else titleNode = props.title;
  return (
    <View style={[style.statContainer, props.statContainerStyle]}>
      {titleNode}
      {props.children}
    </View>
  );
};

export { M_Stat };

const style = StyleSheet.create({
  statContainer: {},
  statTitle: {
    fontSize: getResponsiveCSSFrom8(20).height,
    padding: getResponsiveCSSFrom8(10).width
  }
});
