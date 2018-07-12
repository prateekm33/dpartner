import React, { Component } from "react";
import { connect } from "../../redux";
import ScreenContainer from "../../Templates/ScreenContainer";
import { A_Text, A_Button, A_Input } from "../../Atoms";
import {
  createCustomerDeal,
  createCustomerLoyaltyRewardCard
} from "../../Models";
import {
  rewardCustomerRewardPointsAction,
  redeemCustomerRewardPointsAction,
  fetchCustomerRewardDetailsAction
} from "../../redux/actions/reward.actions";
import { fetchCustomerDealDetailsAction } from "../../redux/actions/deal.actions";
import { fetchCustomerDetailsAction } from "../../redux/actions/customer.actions";

/**
 * data shape
 *
 * type: String ('deal', 'reward_redeem', 'reward_earn')
 * code: String - deal code or reward code
 * customer_id: Number
 * points_to_redeem: Number (only if type === 'reward_redeem')
 * ...(all deal || all reward ) properties
 */

class PostScanDealPage_Pre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal: props.deal
    };
  }

  componentDidMount = () => {
    // if (this.state.deal.vendor_uuid !== this.props.employee.vendor_uuid) {
    //   console.warn("---tODO...this deal is from another vendor");
    //   return;
    // }

    if (this.state.deal.is_used) {
      console.warn("-----DEAL IS USED....no need to fetch details.");
      return;
    }

    const one = this.props.dispatch(
      fetchCustomerDealDetailsAction(
        this.props.deal.uuid,
        this.props.deal.customer_uuid
      )
    );
    const two = this.props.dispatch(
      fetchCustomerDetailsAction(this.props.deal.customer_uuid)
    );

    Promise.all([one, two]).then(results => {
      const [deal, customer] = results[0];
      if (!deal) return;
      this.setState({ deal, customer });
    });
  };

  render() {
    return <ScreenContainer title="" />;
  }
}
const PostScanDealPage = connect(state => ({
  // employee: state.employee
}))(PostScanDealPage_Pre);

class PostScanRewardPage_Pre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reward: props.reward
    };
    if (props.reward.type.toLowerCase() === "reward_earn") {
      this.state.num_points_to_redeem = null;
    }
  }

  componentDidMount = () => {
    // if (this.state.reward.vendor_uuid !== this.props.employee.vendor_uuid) {
    //   console.warn("---tODO...this rewards card is from another vendor");
    //   return;
    // }

    const one = this.props.dispatch(
      fetchCustomerRewardDetailsAction(
        this.state.reward.uuid,
        this.state.reward.customer_uuid
      )
    );
    const two = this.props.dispatch(
      fetchCustomerDetailsAction(this.props.reward.customer_uuid)
    );

    Promise.all([one, two]).then(results => {
      const [reward, customer] = results[0];
      if (!reward) return;
      this.setState({ reward, customer });
    });
  };

  redeem = () => {
    // TODO....only redeem the num of points that the customer requests
    // --- this.props.reward.points_to_redeem
    this.props
      .dispatch(
        redeemCustomerRewardPointsAction(
          this.props.reward.points_to_redeem,
          this.props.reward
        )
      )
      .then(reward => {
        if (!reward) return;
        this.setState({ reward });
      });
  };

  reward = () => {
    this.props.dispatch(
      rewardCustomerRewardPointsAction(
        this.state.points_to_reward,
        this.state.amount_spent,
        this.state.reward
      )
    );
  };

  setAmountSpent = amnt => {
    const points_to_reward = Math.round(
      this.state.amount_spent * this.state.reward.points_reward_ratio
    );
    this.setState({ amount_spent: amnt, points_to_reward });
  };

  render() {
    const code_type = this.state.reward.type.toLowerCase();
    return (
      <ScreenContainer noHeader>
        {/* <A_Avatar /> */}
        <A_Text strong>{this.state.customer.fullName()}</A_Text>
        <View>
          {/* <A_Logo /> */}
          <A_Text>
            Member Since {this.state.reward.created_at.format("MMM DD YYYY")}
          </A_Text>
        </View>
        {/* <M_Stat_CustomerRewards customer={this.state.customer} /> */}
        {code_type === "reward_redeem" && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "space-between"
            }}
          >
            <A_Text strong>{this.state.reward.points_to_redeem} PTS</A_Text>
            <A_Button onPress={this.redeem} value="REDEEM" />
          </View>
        )}
        {code_type === "reward_earn" && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "space-between"
            }}
          >
            <A_Text strong>POIINTS CALCULATOR</A_Text>
            <A_Input
              placeholder="Amount spent"
              value={this.state.amount_spent}
              onChangeText={this.setAmountSpent}
            />
            <A_Text>
              <A_Text strong>POINTS EARNED : </A_Text>
              <A_Text>{this.state.points_to_reward}</A_Text>
            </A_Text>
            <A_Button
              onPress={this.reward}
              value="REWARD"
              disabled={this.state.num_points_to_redeem === null}
            />
          </View>
        )}
      </ScreenContainer>
    );
  }
}
const PostScanRewardPage = connect(state => ({
  // employee: state.employee
}))(PostScanRewardPage_Pre);

const PostScanPage = props => {
  const data = props.navigation.state.params.data;
  const code_type = data.type.toLowerCase();
  if (code_type === "deal") {
    const deal = createCustomerDeal(data);
    return <PostScanDealPage deal={deal} />;
  }
  if (code_type === "reward_redeem" || code_type === "reward_earn") {
    const reward = createCustomerLoyaltyRewardCard(data);
    return <PostScanRewardPage reward={reward} />;
  }
  return null;
};
export default PostScanPage;
