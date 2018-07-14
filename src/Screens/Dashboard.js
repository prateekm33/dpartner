import React, { Component } from "react";
import { connect } from "../redux";
import { StyleSheet } from "react-native";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import { A_Text, A_View } from "chemics/Atoms";
import { M_Stat } from "chemics/Molecules";
import { getResponsiveCSSFrom8 } from "../utils";
import moment from "moment";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    // console.warn("------TODO...dispatch action to fetch dash stats data.");
  };

  render() {
    return (
      <ScreenContainer
        scrollView
        title="Dashboard"
        containerStyle={style.screenContainerStyle}
        headerMainTitleTextStyle={style.headerMainTitleTextStyle}
        headerMainContainerStyle={style.headerMainContainerStyle}
      >
        <M_Stat
          title={
            <A_View
              style={{
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between",
                padding: getResponsiveCSSFrom8(10).width,
                backgroundColor: "#50498c"
              }}
            >
              <A_Text
                strong
                style={{
                  color: "white",
                  fontSize: getResponsiveCSSFrom8(20).height
                }}
              >
                At a Glance
              </A_Text>
              <A_Text
                strong
                style={{
                  color: "white",
                  fontSize: getResponsiveCSSFrom8(20).height
                }}
              >
                {moment().format("MMM 'YY")}
              </A_Text>
            </A_View>
          }
          statContainerStyle={[
            style.revenueContainerStyle,
            style.cardShadowStyle
          ]}
          statTitleStyle={{
            backgroundColor: "#50498c", //"#45549e",
            color: "white"
          }}
        >
          <A_View>
            <A_View>
              <A_Text>Revenue</A_Text>
              <A_Text
                strong
                style={{
                  color: "green"
                }}
                numberOfLines={3}
              >
                $99999
              </A_Text>
            </A_View>
            <A_View>
              <A_Text>Active Deals: 3</A_Text>
              <A_Text>Num. Card Holders: 50</A_Text>
            </A_View>
          </A_View>
        </M_Stat>
        <M_Stat
          title="Month's Customers"
          statContainerStyle={[
            style.genericStatContainerStyle,
            style.cardShadowStyle
          ]}
          statTitleStyle={{
            backgroundColor: "#672b51", //"#4c1e3b", //"#c668e4", //"#ca81e2",
            color: "white"
          }}
        >
          <A_View style={style.statInnerContentStyle}>
            <A_Text>
              TODO: Show line graph that maps number of customers served over
              the month per day
            </A_Text>
            <A_Text>Total Customers In Month: 100</A_Text>
            <A_Text>Total Customers: 500</A_Text>
            <A_Text>Top 5 Customers: TODO...show table</A_Text>
          </A_View>
        </M_Stat>
        <M_Stat
          title="Rewards Performance"
          statContainerStyle={[
            style.genericStatContainerStyle,
            style.cardShadowStyle
          ]}
          statTitleStyle={{
            backgroundColor: "#2b4b67", // "#77f59e",
            color: "white"
          }}
        />
        <M_Stat
          title="Deals Performance"
          statContainerStyle={[
            style.genericStatContainerStyle,
            style.cardShadowStyle
          ]}
          statTitleStyle={{
            backgroundColor: "#0270a5", //"#154e7f", // "#77f59e",
            color: "white"
          }}
        />
        <A_View style={{ marginBottom: getResponsiveCSSFrom8(50).height }} />
      </ScreenContainer>
    );
  }
}

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(Dashboard);

const style = StyleSheet.create({
  screenContainerStyle: {},
  revenueContainerStyle: {
    minHeight: getResponsiveCSSFrom8(200).height,
    margin: getResponsiveCSSFrom8(5).width,
    marginBottom: getResponsiveCSSFrom8(15).height
  },
  statLineTwoContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  genericStatContainerStyle: {
    flex: 1,
    margin: getResponsiveCSSFrom8(5).width,
    marginBottom: getResponsiveCSSFrom8(15).height,
    minHeight: getResponsiveCSSFrom8(150).height
  },
  cardShadowStyle: {
    shadowRadius: getResponsiveCSSFrom8(10).width,
    shadowColor: "lightgrey",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 1,
    backgroundColor: "white"
  },
  statInnerContentStyle: {
    flex: 1,
    justifyContent: "center"
  },
  statInnerContentTextStyle: {
    fontSize: getResponsiveCSSFrom8(40).height
  },
  headerMainContainerStyle: {
    backgroundColor: "#092c50"
  },
  headerMainTitleTextStyle: {
    color: "white"
  }
});
