import React, { Component } from "react";
import { connect } from "../redux";
import { View } from "react-native";
import ScreenContainer from "../Templates/ScreenContainer";
import { A_Text } from "../Atoms";
import { M_Stat } from "../Molecules";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    console.warn("------TODO...dispatch action to fetch dash stats data.");
  };

  render() {
    return (
      <ScreenContainer title="Dashboard">
        <M_Stat title="Revenue gained">
          <A_Text>$100</A_Text>
        </M_Stat>
        <View>
          <M_Stat title="Active Deals">
            <A_Text>3</A_Text>
          </M_Stat>
          <M_Stat title="Customers received">
            <A_Text>100</A_Text>
          </M_Stat>
        </View>
      </ScreenContainer>
    );
  }
}

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(Dashboard);
