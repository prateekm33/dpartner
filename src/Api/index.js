import { AsyncStorage } from "react-native";
import config from "../../config";
import {
  createEmployee,
  createDeal,
  createLoyaltyReward,
  createVendor,
  createCustomerLoyaltyRewardCard,
  createCustomerDeal,
  createCustomer
} from "../Models";
import { valExists, logger } from "../utils";

class Api {
  static headers = {};
  constructor(root, options) {
    options = options || {};
    this.root = root;
    this.headers = { ...Api.headers };
    this.headers = { ...this.headers, ...(options.headers || {}) };
  }

  fetch = (url, options) => {
    options = options || {};
    const headers = { ...this.headers, ...(options.headers || {}) };
    delete options.headers;
    const requestOptions = {
      headers,
      ...options
    };

    return fetch(config.api.root + url, requestOptions)
      .then(this.checkResponseForErrors)
      .then(this.saveTokenAndEmployeeFromResponse)
      .catch(err => {
        if (err.IS_HASH_ERROR) {
          logger.warn(
            `API ERROR : ${options.method || "GET"} | ${config.api.root + url}`,
            err.message
          );
          throw err;
        } else {
          console.warn("----backend server down error : ", url, err);
          throw { message: "Backend server is down." };
        }
      });
  };

  checkResponseForErrors = unprocessedResponse => {
    return unprocessedResponse.json().then(res => {
      if (!res || res.error) throw res;
      return res;
    });
  };

  get = (url, options) => {
    return this.fetch(url, ...(options || {}));
  };

  post = (url, body, options) => {
    return this.fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
  };

  put = (url, body, options) => {
    return this.fetch(url, {
      method: "put",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
  };

  delete = (url, body, options) => {
    return this.fetch(url, {
      method: "delete",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });
  };

  saveTokenAndEmployeeFromResponse = res => {
    if (!res) return res;
    const employee = res.employee;
    if (!employee) return res;
    this.employee = createEmployee(employee);
    this.saveToken(employee.token);
    employee.is_authenticated = true;
    return res;
  };

  saveToken = token => {
    if (!valExists(token) || this.token === token) return;
    this.token = token;
    this.headers.authorization = `Bearer ${this.token}`;
    console.warn("--------token : ", token);
    AsyncStorage.mergeItem("employee", JSON.stringify({ token }));
  };

  logout = () => {
    this.employee = null;
    AsyncStorage.removeItem("employee");
    return Promise.resolve();
    // return this.get(config.api.logout);
  };

  loginEmployee = employee => {
    return this.post(config.api.employees.login, { employee })
      .then(this.saveTokenAndEmployeeFromResponse)
      .then(res => createEmployee(res.employee));
  };

  signupEmployee = employee => {
    return this.post(config.api.employees.root, { employee })
      .then(this.saveTokenAndEmployeeFromResponse)
      .then(res => createEmployee(res.employee));
  };

  getEmployee = employee =>
    this.get(
      config.api.employees.root +
        "/" +
        employee.vendor_uuid +
        "/" +
        employee.uuid
    ).then(res => createEmployee(res.employee));

  updateEmployee = updates =>
    this.put(config.api.employees.root + "/" + this.employee.uuid, {
      updates
    }).then(res => createEmployee(res.employee));

  deleteEmployee = () =>
    this.delete(config.api.employees.root + "/" + this.employee.uuid);

  getMyOrganization = () =>
    this.get(config.api.vendors.root + "/" + this.employee.vendor_uuid).then(
      res => createVendor(res.vendor)
    );

  getOrgDeals = ({ deal_uuid, limit, offset }) => {
    let url = config.api.vendors.deals + "/" + this.employee.vendor_uuid;
    if (deal_uuid) url += "/" + deal_uuid;
    else {
      limit = limit || 20;
      offset = offset || 0;
    }
    url += `?limit=${limit}&offset=${offset}`;
    return this.get(url).then(res => {
      if (res.deal)
        return createDeal({
          ...res.deal.data.deal,
          vendor: res.deal.data.vendor
        });
      else if (res.deals)
        return res.deals.map(deal => {
          return createDeal({ ...deal.data.deal, vendor: deal.data.vendor });
        });
    });
  };

  getOrgLoyaltyRewards = ({ loyalty_reward_uuid }) => {
    let url = config.api.vendors.rewards + "/" + this.employee.vendor_uuid;
    if (loyalty_reward_uuid) url += "/" + loyalty_reward_uuid;
    return this.get(url).then(res => {
      if (res.loyalty_reward)
        return createLoyaltyReward({
          ...res.loyalty_reward.data.loyalty_reward,
          vendor: res.loyalty_reward.data.vendor
        });
      else if (res.loyalty_rewards)
        return res.loyalty_rewards.map(reward =>
          createLoyaltyReward({
            ...reward.data.loyalty_reward,
            vendor: reward.data.vendor
          })
        );
    });
  };

  registerDeviceToken = device_token => {
    return this.post(config.api.notifications.register, { device_token });
  };

  updateCustomerRewardPoints = (points, reward) =>
    this.put(
      config.api.customers.rewards +
        "/" +
        reward.customer.uuid +
        "/" +
        this.employee.vendor_uuid +
        "/" +
        reward.uuid,
      {
        updates: {
          points
        }
      }
    ).then(res =>
      createCustomerLoyaltyRewardCard(...reward, ...res.loyalty_reward)
    );

  rewardCustomerRewardPoints = (points, reward) =>
    this.updateCustomerRewardPoints(reward.customer.points + points, reward);

  redeemCustomerRewardPoints = (points, reward) =>
    this.updateCustomerRewardPoints(reward.customer.points - points, reward);

  fetchCustomerRewardDetails = ({ loyalty_reward_uuid, customer_uuid }) =>
    this.get(
      config.api.customers.rewards +
        "/" +
        customer_uuid +
        "/" +
        this.employee.vendor_uuid +
        "/" +
        reward_uuid
    ).then(res =>
      createCustomerLoyaltyRewardCard({
        ...res.loyalty_reward.data.loyalty_reward,
        vendor: res.loyalty_reward.data.vendor
      })
    );

  fetchCustomerDealDetails = ({ deal_uuid, customer_uuid }) =>
    this.get(
      config.api.customers.deals +
        "/" +
        customer_uuid +
        "/" +
        "62e8a150-7fae-11e8-ba59-eb1e22dbd828" +
        // this.employee.vendor_uuid +
        "/" +
        deal_uuid
    ).then(res =>
      createCustomerDeal({
        ...res.deal.data.deal,
        vendor: res.deal.data.vendor
      })
    );

  fetchCustomerDetails = customer_uuid =>
    this.get(config.api.customers.root + "/" + customer_uuid).then(res =>
      createCustomer(res.customer)
    );
}

export default new Api(config.api.root);
