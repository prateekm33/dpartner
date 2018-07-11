import React from "react";
import { StyleSheet } from "react-native";
import { A_Button_Opacity, A_View } from "../Atoms";
import { getResponsiveCSSFrom8 } from "../utils";

const M_TabOptions = props => {
  return (
    <A_View style={[style.tabsContainer, props.tabsContainerStyle]}>
      {props.tabs.map((tab, idx) => (
        <A_View
          style={[
            style.tabContainer,
            props.activeTab === idx && style.activeTab,
            props.activeTab === idx && props.activeTabStyle
          ]}
          key={`${props.label || "generic-tabs"}-option-${tab}`}
        >
          <A_Button_Opacity
            onPress={() => props.onTabSelect(idx)}
            style={[style.tabInnerContainer, props.tabInnerContainerStyle]}
            value={tab}
            strong
            buttonTextStyles={style.tabTextStyle}
          />
        </A_View>
      ))}
    </A_View>
  );
};

export { M_TabOptions };

const style = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  tabContainer: {
    flex: 1,
    alignItems: "center"
  },
  tabInnerContainer: {},
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#7b2525" //"#8e3131"
  },
  tabTextStyle: {
    fontSize: getResponsiveCSSFrom8(22).height
  }
});
