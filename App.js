import React, { Component } from "react";
import { Provider } from "react-redux";
import { View } from "react-native";
import store from "./src/redux/store";
import AppNavigator from "./src/AppNavigator";
import { O_MenuBar_Main } from "./src/Organisms";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppNavigator />
          <O_MenuBar_Main />
        </View>
      </Provider>
    );
  }
}

export default App;
