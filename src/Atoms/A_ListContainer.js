import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { getResponsiveCSSFrom8 } from "../utils";

const A_ListContainer = props => {
  return (
    <FlatList
      data={props.data}
      renderItem={props.renderItem}
      keyExtractor={props.keyExtractor}
      extraData={props.extraData}
      style={[style.listContainerStyle, props.listContainerStyle]}
    />
  );
};

export { A_ListContainer };

const style = StyleSheet.create({
  listContainerStyle: {
    height: "100%"
  }
});
