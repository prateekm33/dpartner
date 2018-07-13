import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "../redux";
import ScreenContainer from "chemics/Templates/ScreenContainer";
import {
  M_TabOptions,
  M_Card_Deal_Mini,
  M_Card_LoyaltyReward_Mini
} from "chemics/Molecules";
import { A_ListContainer, A_Button_Opacity } from "chemics/Atoms";
import {
  M_LoyaltyReward_Card_Options,
  M_Deal_Card_Options
} from "../Molecules/M_Deal_Card_Options";
import { fetchOrgDealsAction } from "../redux/actions/deal.actions";
import { fetchOrgRewardsAction } from "../redux/actions/reward.actions";
import { withEventDispatcher } from "../HOCs/EventDispatcher";
import { getResponsiveCSSFrom8 } from "../utils";
import { MAIN_SCREEN_NAMES } from "../MainNavigator";
import { MODAL_SCREEN_NAMES } from "../ModalNavigator";

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
    return (
      <M_Card_Deal_Mini
        deal={deal}
        onPress={() => {
          return this.props.mainNavigation.navigate(
            MAIN_SCREEN_NAMES.ModalNavigator,
            {
              routeName: MODAL_SCREEN_NAMES.DealModal,
              params: { deal }
            }
          );
        }}
      >
        <M_Deal_Card_Options deal={deal} cardOptionsContainerStyle={{}} />
      </M_Card_Deal_Mini>
    );
  };

  renderLoyaltyReward = ({ item }) => {
    return (
      <M_Card_LoyaltyReward_Mini
        reward={item}
        onPress={() =>
          this.props.mainNavigation.navigate(MAIN_SCREEN_NAMES.ModalNavigator, {
            routeName: MODAL_SCREEN_NAMES.RewardModal,
            params: { reward: item }
          })
        }
      >
        <M_LoyaltyReward_Card_Options reward={item} />
      </M_Card_LoyaltyReward_Mini>
    );
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
    this.props.mainNavigation.navigate(MAIN_SCREEN_NAMES.ModalNavigator, {
      routeName: MODAL_SCREEN_NAMES.DealFormModal
    });
  };

  showNewRewardForm = () => {
    this.props.mainNavigation.navigate(MAIN_SCREEN_NAMES.ModalNavigator, {
      routeName: MODAL_SCREEN_NAMES.RewardFormModal
    });
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
      <ScreenContainer
        title="Deals and Rewards"
        scrollView
        headerMainTitleTextStyle={{ color: "white" }}
        headerMainContainerStyle={{
          backgroundColor: "#5d0303"
        }}
      >
        <M_TabOptions
          label="deals-rewards-tabs"
          tabs={this.tabHeaders}
          onTabSelect={this.onTabSelect}
          activeTab={this.state.activeTab}
        />
        <A_Button_Opacity
          onPress={this.createNew}
          value="NEW"
          style={style.createNewButtonStyles}
          buttonTextStyles={style.createNewButtonTextStyles}
          strong
        />
        {tabContent}
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({
  deals: state.deals
});
export default connect(mapStateToProps)(withEventDispatcher(Deals_RewardsPage));

const style = StyleSheet.create({
  createNewButtonStyles: {
    width: getResponsiveCSSFrom8(100).width,
    alignSelf: "flex-end",
    backgroundColor: "#36A0B2",
    marginVertical: getResponsiveCSSFrom8(20).height
  },
  createNewButtonTextStyles: {
    color: "white",
    textAlign: "center"
  }
});
