import React, { Component } from "react";
import { connect } from "../redux";
import ScreenContainer from "../Templates/ScreenContainer";
import {
  M_Card_Deal_Mini,
  M_Card_LoyaltyReward_Mini,
  M_TabOptions
} from "../Molecules";
import { A_ListContainer, A_Button } from "../Atoms";
import { fetchOrgDealsAction } from "../redux/actions/deal.actions";
import { fetchOrgRewardsAction } from "../redux/actions/reward.actions";
import { withEventDispatcher } from "../HOCs/EventDispatcher";
import { SCREEN_NAMES } from "../AppNavigator";
import { getResponsiveCSSFrom8 } from "../utils";

class Deals_RewardsPage extends Component {
  constructor(props) {
    super(props);
    this.tabHeaders = ["Deals", "Rewards"];
    this.state = {
      activeTab: 0,
      data: [],
      all_fetched: false,
      offset: 0
    };
  }

  componentWillMount = () => {
    this.fetchOrgDealsRewards(fetchOrgDealsAction);
  };

  fetchOrgDealsRewards = action => {
    this.props.dispatch(action(this.limit, this.state.offset)).then(res => {
      if (!res || res.end) return this.setState({ all_fetched: true });
      this.setState({
        offset: this.state.offset + this.limit,
        data: this.state.data.concat(
          res.deals ? res.deals : res.loyalty_rewards
        )
      });
    });
  };

  renderDeal = ({ item }) => {
    const deal = item;
    return <M_Card_Deal_Mini deal={deal} />;
  };

  renderLoyaltyReward = ({ item }) => {
    return <M_Card_LoyaltyReward_Mini reward={item} />;
  };

  onTabSelect = idx => {
    if (this.state.activeTab === idx) return;
    this.setState(
      { activeTab: idx, data: [], offset: 0, all_fetched: false },
      () => {
        let action;
        if (idx === 0) action = fetchOrgDealsAction;
        else if (idx === 1) action = fetchOrgRewardsAction;
        this.fetchOrgDealsRewards(action);
      }
    );
  };

  createNew = () => {
    if (this.state.activeTab === 0) {
      return this.showNewDealForm();
    } else if (this.state.activeTab === 1) {
      return this.showNewRewardForm();
    }
  };

  showNewDealForm = () => {
    this.props.navigation.navigate(SCREEN_NAMES.DealFormPageOne);
  };

  showNewRewardForm = () => {
    this.props.navigation.navigate(SCREEN_NAMES.RewardFormPageOne);
  };

  render() {
    let tabContent;
    switch (this.state.activeTab) {
      case 0:
        tabContent = (
          <A_ListContainer
            data={this.state.data}
            keyExtractor={item => `deal-${item.code}`}
            renderItem={this.renderDeal}
            listContainerStyle={{}}
          />
        );
        break;
      case 1:
        tabContent = (
          <A_ListContainer
            data={this.state.data}
            keyExtractor={item => `loyalty-rewards-${item.code}`}
            renderItem={this.renderLoyaltyReward}
          />
        );
        break;
    }
    return (
      <ScreenContainer title="-- ? --">
        <M_TabOptions
          label="deals-rewards-tabs"
          tabs={this.tabHeaders}
          onTabSelect={this.onTabSelect}
          activeTab={this.state.activeTab}
        />
        <A_Button onPress={this.createNew} value="CREATE NEW" />
        {tabContent}
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({
  deals: state.deals
});
export default connect(mapStateToProps)(withEventDispatcher(Deals_RewardsPage));
