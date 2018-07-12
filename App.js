import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import AppNavigator from "./src/AppNavigator";
import MainNavigator from "./src/MainNavigator";
import ModalNavigator from "./src/ModalNavigator";
import { O_MenuBar_Main } from "./src/Organisms";
import { A_View } from "./src/Atoms";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <A_View style={{ height: "100%", width: "100%" }}>
          <MainNavigator />
        </A_View>
      </Provider>
    );
  }
}

export default App;
