import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { getResponsiveCSSFrom8 } from "../utils";
import { A_View_Scroll, A_View } from ".";

const A_ListContainer = props => {
  return (
    <A_View>
      {props.data.map((data, index) => (
        <A_View key={props.keyExtractor(data, index)}>
          {props.renderItem({ item: data, index })}
        </A_View>
      ))}
    </A_View>
  );
  // return (
  //   <FlatList
  //     data={props.data}
  //     renderItem={props.renderItem}
  //     keyExtractor={props.keyExtractor}
  //     extraData={props.extraData}
  //     style={[style.listContainerStyle, props.listContainerStyle]}
  //   />
  // );
};

export { A_ListContainer };

const style = StyleSheet.create({
  listContainerStyle: {
    height: "100%"
  }
});
