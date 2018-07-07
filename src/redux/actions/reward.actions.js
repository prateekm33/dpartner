import Api from "../../Api";
import { dispatchErrorActionOfType } from ".";
import loading_types from "../types/loading.types";
import error_types from "../types/error.types";

export const fetchOrgRewardsAction = (limit, offset) => dispatch => {
  dispatch({ type: loading_types.FETCHING_ORG_REWARDS, loading: true });
  return Api.getOrgLoyaltyRewards({ limit, offset })
    .then(res => {
      dispatch({
        type: loading_types.FETCHING_ORG_REWARDS,
        loading: false
      });
      return res;
    })
    .catch(error => {
      dispatch({
        type: loading_types.FETCHING_ORG_REWARDS,
        loading: false
      });
      dispatchErrorActionOfType(error_types.FETCHING_ORG_REWARDS_ERROR)(error);
      return false;
    });
};

export const rewardCustomerRewardPointsAction = (pts, reward) => dispatch => {
  dispatch({ type: loading_types.REWARDING_POINTS_TO_CUSTOMER, loading: true });
  return Api.rewardCustomerRewardPoints(pts, reward)
    .then(loyalty_reward => {
      dispatch({
        type: loading_types.REWARDING_POINTS_TO_CUSTOMER,
        loading: false
      });
      return loyalty_reward;
    })
    .catch(error => {
      dispatch({
        type: loading_types.REWARDING_POINTS_TO_CUSTOMER,
        loading: false
      });
      dispatchErrorActionOfType(error_types.REWARDING_POINTS_TO_CUSTOMER_ERROR)(
        error
      );
      return false;
    });
};

export const redeemCustomerRewardPointsAction = (pts, reward) => dispatch => {
  dispatch({
    type: loading_types.REDEEMING_CUSTOMER_REWARD_POINTS,
    loading: true
  });
  return Api.redeemCustomerRewardPoints(pts, reward)
    .then(loyalty_reward => {
      dispatch({
        type: loading_types.REDEEMING_CUSTOMER_REWARD_POINTS,
        loading: false
      });
      return loyalty_reward;
    })
    .catch(error => {
      dispatch({
        type: loading_types.REDEEMING_CUSTOMER_REWARD_POINTS,
        loading: false
      });
      dispatchErrorActionOfType(
        error_types.REDEEMING_CUSTOMER_REWARD_POINTS_ERROR
      )(error);
      return false;
    });
};

export const fetchCustomerRewardDetailsAction = (
  loyalty_reward_uuid,
  customer_uuid
) => dispatch => {
  dispatch({
    type: loading_types.FETCHING_CUSTOMER_REWARD_DETAILS,
    loading: true
  });
  return Api.fetchCustomerRewardDetails({ loyalty_reward_uuid, customer_uuid })
    .then(loyalty_reward => {
      dispatch({
        type: loading_types.FETCHING_CUSTOMER_REWARD_DETAILS,
        loading: false
      });
      return loyalty_reward;
    })
    .catch(error => {
      dispatch({
        type: loading_types.FETCHING_CUSTOMER_REWARD_DETAILS,
        loading: false
      });
      dispatchErrorActionOfType(
        error_types.FETCHING_CUSTOMER_REWARD_DETAILS_ERROR
      )(error);
      return false;
    });
};

export const createNewLoyaltyRewardAction = data => dispatch => {
  dispatch({
    type: loading_types.CREATING_NEW_LOYALTY_REWARD,
    loading: true
  });
  return Api.createNewLoyaltyProgram(data)
    .then(loyalty_reward => {
      dispatch({
        type: loading_types.CREATING_NEW_LOYALTY_REWARD,
        loading: false
      });
      return loyalty_reward;
    })
    .catch(error => {
      dispatch({
        type: loading_types.CREATING_NEW_LOYALTY_REWARD,
        loading: false
      });
      dispatchErrorActionOfType(error_types.CREATING_NEW_LOYALTY_REWARD_ERROR)(
        error
      );
      return false;
    });
};
