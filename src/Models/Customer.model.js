import DataModel from "./Data.model";

export class Customer extends DataModel {
  static validProperties = {
    first_name: { type: String, defaultValue: "" },
    last_name: { type: String, defaultValue: "" }
  };

  fullName = () => (this.first_name || "") + (this.last_name || "");

  memberSince = () => {
    console.warn("----TODO...");
    return;
  };
}

export const createCustomer = options => new Customer(options);
export const updateCustomer = (oldCustomer, options) =>
  oldCustomer.renew(options);
