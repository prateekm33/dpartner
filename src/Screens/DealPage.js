import React, { Component } from "react";
import { connect } from "../redux";
import { View, StyleSheet } from "react-native";
import ScreenContainer from "../Templates/ScreenContainer";
import { A_Text, A_Image, A_View, A_Button_Opacity, A_Button } from "../Atoms";
import { getResponsiveCSSFrom8 } from "../utils";
import { M_Editable } from "../Molecules";
import { updateDealAction } from "../redux/actions/deal.actions";
import { RED_ONE } from "../styles/Colors";

class DealPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal: props.navigation.state.params.deal
    };
  }

  componentWillMount = () => {
    /**
     * TODO...consider changing API on dealspage to only fetch bare minimum for deals
     * then on this page fetch all the details needed for the deal
     */
  };

  updateDeal = updates =>
    this.props
      .dispatch(updateDealAction(this.state.deal.uuid, updates))
      .then(deal => {
        if (!deal) return;
        this.setState({ deal });
        return true;
      });

  onSaveExpiration = expiration =>
    this.updateDeal({ expiration: expiration.toISOString() });
  onSaveImage = image => this.updateDeal({ image });
  onSaveLongDesc = long_desc => this.updateDeal({ long_desc });
  onSaveShortDesc = short_desc => this.updateDeal({ short_desc });
  onSaveName = name => this.updateDeal({ name });

  delete = () => {
    console.warn("---DELETE TODO...");
  };

  render() {
    return (
      <ScreenContainer title={`Deal #${this.state.deal.code}`} scrollView>
        <M_Editable
          title={this.state.deal.name}
          onComplete={this.onSaveName}
          titleEditable
          containerStyle={{
            marginBottom: getResponsiveCSSFrom8(0).height
          }}
          titleStyles={{
            fontSize: getResponsiveCSSFrom8(25).height
          }}
        />
        <M_Editable
          title="Thumbnail"
          type="image"
          content={this.state.deal.image}
          onComplete={this.onSaveImage}
          titleContainerStyle={{
            backgroundColor: "#d45353"
          }}
          titleTextStyles={{
            color: "white"
          }}
        />
        <M_Editable
          title="Short Description"
          type="text"
          content={this.state.deal.short_desc}
          onComplete={this.onSaveShortDesc}
          editableInputStyle={style.editableInputStyle}
          titleContainerStyle={{
            backgroundColor: "#b92f2f" //"#6d2e68"
          }}
          titleTextStyles={{
            color: "white"
          }}
        />
        <M_Editable
          title="Long Description"
          type="text"
          content={this.state.deal.long_desc}
          onComplete={this.onSaveLongDesc}
          editableInputStyle={style.editableInputStyle}
          titleContainerStyle={{
            backgroundColor: "#982929" //"#791c1c" //"#213450"
          }}
          titleTextStyles={{
            color: "white"
          }}
        />
        <M_Editable
          title="Good Until"
          type="date"
          content={this.state.deal.expiration}
          onComplete={this.onSaveExpiration}
          titleContainerStyle={{
            backgroundColor: "#791b1b"
          }}
          titleTextStyles={{
            color: "white"
          }}
        />
        <A_Button
          value="DELETE"
          onPress={this.delete}
          style={{
            backgroundColor: "white",
            alignItems: "center",
            borderColor: RED_ONE,
            borderWidth: 1
          }}
          buttonTextStyles={{
            color: RED_ONE,
            fontSize: getResponsiveCSSFrom8(23).height
          }}
          strong
        />
      </ScreenContainer>
    );
  }
}

export default connect()(DealPage);

const style = StyleSheet.create({
  detailItemStyle: {
    marginVertical: getResponsiveCSSFrom8(20).height
  },
  detailItemTitleStyle: {
    fontSize: getResponsiveCSSFrom8(20).height
  },
  detailItemContentText: {
    fontSize: getResponsiveCSSFrom8(18).height
  },
  editableInputStyle: {
    paddingHorizontal: getResponsiveCSSFrom8(10).height,
    paddingVertical: getResponsiveCSSFrom8(20).height,
    paddingTop: getResponsiveCSSFrom8(20).height,
    borderWidth: 1,
    borderRadius: 0
  }
});
