import loading_types from "../types/loading.types";
import Api from "../../Api";
import { dispatchErrorActionOfType } from ".";
import error_types from "../types/error.types";

export const fetchCustomerDetailsAction = customer_uuid => dispatch => {
  dispatch({ type: loading_types.FETCHING_CUSTOMER_DETAILS, loading: true });
  return Api.fetchCustomerDetails(customer_uuid)
    .then(customer => {
      dispatch({
        type: loading_types.FETCHING_CUSTOMER_DETAILS,
        loading: false
      });
      return customer;
    })
    .catch(error => {
      dispatch({
        type: loading_types.FETCHING_CUSTOMER_DETAILS,
        loading: false
      });
      dispatchErrorActionOfType(error_types.FETCHING_CUSTOMER_DETAILS_ERROR)(
        error
      );
    });
};
