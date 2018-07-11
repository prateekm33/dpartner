import React from "react";
import { View, StyleSheet } from "react-native";
import { A_Text } from "../Atoms";
import { getResponsiveCSSFrom8 } from "../utils";

const M_Stat = props => {
  return (
    <View style={[style.statContainer, props.statContainerStyle]}>
      <A_Text strong style={[style.statTitle, props.statTitleStyle]}>
        {props.title}
      </A_Text>
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
