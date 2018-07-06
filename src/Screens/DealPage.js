import React, { Component } from "react";
import { connect } from "../redux";

class DealPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal: props.navigation.state.params.deal
    };
  }

  componentWillMount = () => {
    console.warn("-----TODO...fetch deal details....");
  };

  render() {
    return <ScreenContainer title={`Deal #${this.state.deal.code}`} />;
  }
}

export default connect()(DealPage);
