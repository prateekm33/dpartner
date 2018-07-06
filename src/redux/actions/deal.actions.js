import loading_type from "../types/loading.types";
import Api from "../../Api";
import { dispatchErrorActionOfType } from ".";
import error_types from "../types/error.types";

export const fetchCustomerDealDetailsAction = (
  deal_uuid,
  customer_uuid
) => dispatch => {
  dispatch({
    type: loading_type.FETCHING_CUSTOMER_DEAL_DETAILS,
    loading: true
  });
  return Api.fetchCustomerDealDetails({ deal_uuid, customer_uuid })
    .then(deal => {
      dispatch({
        type: loading_type.FETCHING_CUSTOMER_DEAL_DETAILS,
        loading: false
      });
      return deal;
    })
    .catch(error => {
      dispatch({
        type: loading_type.FETCHING_CUSTOMER_DEAL_DETAILS,
        loading: false
      });
      dispatchErrorActionOfType(
        error_types.FETCHING_CUSTOMER_DEAL_DETAILS_ERROR
      )(error);
      return false;
    });
};
