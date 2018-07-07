import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { A_Icon_Close, A_Text, A_View } from "../Atoms";
import { getResponsiveCSSFrom8 } from "../utils";
import { withEventDispatcher, CUSTOM_EVENTS } from "../HOCs/EventDispatcher";

export const O_Modal = props => {
  if (!props.show) return null;
  return (
    <A_View style={style.modalOuterContainer}>
      <A_View style={style.modalHeaderStyle}>
        <A_Icon_Close onPress={props.close} />
      </A_View>
      {props.children}
    </A_View>
  );
};

const style = StyleSheet.create({
  modalOuterContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap"
  },
  modalHeaderStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    height: getResponsiveCSSFrom8(60).height
  }
});
