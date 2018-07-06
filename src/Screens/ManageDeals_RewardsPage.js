import React, { Component } from "react";
import { connect } from "../redux";
import ScreenContainer from "../Templates/ScreenContainer";
import {
  M_Card_Deal_Mini,
  M_Card_LoyaltyReward_Mini,
  M_TabOptions
} from "../Molecules";

class ManageDeals_RewardsPage extends Component {
  constructor(props) {
    super(props);
    this.tabHeaders = ["Deals", "Loyalty Rewards"];
    this.state = {
      activeTab: 0
    };
  }

  componentWillMount = () => {
    console.warn("------TODO...fetch all deals action");
  };

  renderDeal = ({ item }) => {
    const deal = item;
    return <M_Card_Deal_Mini deal={deal} />;
  };

  renderLoyaltyReward = ({ item }) => {
    return <M_Card_LoyaltyReward_Mini reward={item} />;
  };

  onTabSelect = idx => {
    this.setState({ activeTab: idx });
  };

  render() {
    let tabContent;
    switch (this.state.activeTab) {
      case 0:
        tabContent = (
          <A_ListContainer
            data={this.props.deals}
            keyExtractor={item => `deal-${item.code}`}
            renderItem={this.renderDeal}
          />
        );
        break;
      case 1:
        tabContent = (
          <A_ListContainer
            data={this.props.loyalty_rewards}
            keyExtractor={item => `loyalty-rewards-${item.code}`}
            renderItem={this.renderLoyaltyReward}
          />
        );
        break;
    }
    return (
      <ScreenContainer title="Deals">
        <M_TabOptions
          label="deals-rewards-tabs"
          tabs={this.tabHeaders}
          onTabSelect={this.onTabSelect}
          activeTab={this.state.activeTab}
        />
        {tabContent}
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({
  deals: state.deals
});
export default connect(mapStateToProps)(ManageDeals_RewardsPage);
