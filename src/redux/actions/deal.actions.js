import loading_types from "../types/loading.types";
import Api from "../../Api";
import { dispatchErrorActionOfType } from ".";
import error_types from "../types/error.types";

export const fetchOrgDealsAction = (limit, offset) => dispatch => {
  dispatch({ type: loading_types.FETCHING_MY_DEALS, loading: true });
  return Api.getOrgDeals({ limit, offset })
    .then(res => {
      dispatch({ type: loading_types.FETCHING_MY_DEALS, loading: false });
      return res;
    })
    .catch(error => {
      dispatch({ type: loading_types.FETCHING_MY_DEALS, loading: false });
      dispatchErrorActionOfType(error_types.FETCHING_MY_DEALS_ERROR)(error);
      return false;
    });
};

export const fetchCustomerDealDetailsAction = (
  deal_uuid,
  customer_uuid
) => dispatch => {
  dispatch({
    type: loading_types.FETCHING_CUSTOMER_DEAL_DETAILS,
    loading: true
  });
  return Api.fetchCustomerDealDetails({ deal_uuid, customer_uuid })
    .then(deal => {
      dispatch({
        type: loading_types.FETCHING_CUSTOMER_DEAL_DETAILS,
        loading: false
      });
      return deal;
    })
    .catch(error => {
      dispatch({
        type: loading_types.FETCHING_CUSTOMER_DEAL_DETAILS,
        loading: false
      });
      dispatchErrorActionOfType(
        error_types.FETCHING_CUSTOMER_DEAL_DETAILS_ERROR
      )(error);
      return false;
    });
};

export const createNewDealAction = data => dispatch => {
  dispatch({
    type: loading_types.CREATING_NEW_DEAL,
    loading: true
  });
  return Api.createNewDeal(data)
    .then(deal => {
      dispatch({
        type: loading_types.CREATING_NEW_DEAL,
        loading: false
      });
      return deal;
    })
    .catch(error => {
      dispatch({
        type: loading_types.CREATING_NEW_DEAL,
        loading: false
      });
      dispatchErrorActionOfType(error_types.CREATING_NEW_DEAL_ERROR)(error);
      return false;
    });
};
