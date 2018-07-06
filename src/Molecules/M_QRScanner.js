import React from "react";
import { View, StyleSheet } from "react-native";
import { RNCamera } from "react-native-camera";
import { getResponsiveCSSFrom8 } from "../utils";

const M_QRScanner = props => {
  return (
    <View style={styles.container}>
      <RNCamera
        onBarCodeRead={props.onBarCodeRead}
        ref={props.cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        permissionDialogTitle={"Permission to use camera"}
        permissionDialogMessage={
          "We need your permission to use your camera phone"
        }
      >
        <View style={styles.cameraOverlayContainer}>
          <View style={styles.overlayLine}>
            <View style={[styles.cornerOverlay, styles.topLeftCornerOverlay]} />
            <View
              style={[styles.cornerOverlay, styles.topRightCornerOverlay]}
            />
          </View>
          <View style={styles.overlayLine}>
            <View
              style={[styles.cornerOverlay, styles.bottomLeftCornerOverlay]}
            />
            <View
              style={[styles.cornerOverlay, styles.bottomRightCornerOverlay]}
            />
          </View>
        </View>
      </RNCamera>
    </View>
  );
};

export { M_QRScanner };

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: "flex-end"
    // alignItems: "center"
  },
  container: {
    flexDirection: "column",
    backgroundColor: "black",
    width: "90%",
    height: getResponsiveCSSFrom8(400).height,
    alignSelf: "center"
  },
  cameraOverlayContainer: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    padding: getResponsiveCSSFrom8(10).width
  },
  overlayLine: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    height: getResponsiveCSSFrom8(50).height,
    width: "100%"
  },
  cornerOverlay: {
    width: getResponsiveCSSFrom8(50).width,
    height: "100%"
  },
  topLeftCornerOverlay: {
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: "white"
  },
  topRightCornerOverlay: {
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: "white"
  },
  bottomLeftCornerOverlay: {
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: "white"
  },
  bottomRightCornerOverlay: {
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "white"
  }
});
