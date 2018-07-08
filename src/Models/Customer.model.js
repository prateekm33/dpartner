import DataModel from "./Data.model";
import moment from "moment";

export class Customer extends DataModel {
  static validProperties = {
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" }
  };

  fullName = () => (this.first_name || "") + (this.last_name || "");
}

export const createCustomer = options => new Customer(options);
export const updateCustomer = (oldCustomer, options) =>
  oldCustomer.renew(options);
