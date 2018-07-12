import React, { Component } from "react";
import ScreenContainer from "../../Templates/ScreenContainer";
import { A_Text } from "../../Atoms";
import { M_QRScanner } from "../../Molecules";
import { SCAN_MODAL_SCREEN_NAMES } from "../ScanModal";
import { MAIN_SCREEN_NAMES } from "../../MainNavigator";

class ScanPage extends Component {
  constructor(props) {
    super(props);
  }

  onBarCodeRead = code => {
    const data = JSON.parse(code.data);
    this.props.navigation.resetTo(SCAN_MODAL_SCREEN_NAMES.PostScanPage, {
      data
    });
  };

  close = () => this.props.screenProps.mainNavigation.goBack();

  render() {
    return (
      <ScreenContainer title="Scan" onClose={this.close}>
        <A_Text strong>Scan Loyalty Rewards Card or Discount</A_Text>
        <M_QRScanner
          takePicture={this.onScan}
          value="Scan"
          onBarCodeRead={this.onBarCodeRead}
          cameraRef={el => (this.camera = el)}
        />
      </ScreenContainer>
    );
  }
}

export default ScanPage;
