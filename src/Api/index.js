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
          console.warn(
            "----backend server down error : ",
            config.api.root + "/" + url,
            err
          );
          throw { message: "Backend server is down." };
        }
      });
  };

  checkResponseForErrors = unprocessedResponse => {
    return unprocessedResponse.json().then(res => {
      if (res && res.error) throw res;
      if (res === false) throw res;
      return res;
    });
  };

  get = (url, options) => {
    return this.fetch(url, ...(options || {}));
  };

  post = (url, body, options) => {
    return this.fetch(url, {
      ...(options || {}),
      method: "post",
      headers: {
        "content-type": "application/json",
        ...((options || {}).headers || {})
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
    if (res.user_token) this.saveToken(res.user_token);
    if (employee.uuid === res.user_uuid) {
      this.employee = createEmployee({ ...employee, is_authenticated: true });
    }
    return res;
  };

  saveToken = token => {
    if (!valExists(token) || this.token === token) return;
    this.token = token;
    this.headers.authorization = `Bearer ${this.token}`;

    AsyncStorage.mergeItem("employee", JSON.stringify({ token }));
  };

  logout = () => {
    this.employee = null;
    AsyncStorage.removeItem("employee");
    return Promise.resolve(true);
    // return this.get(config.api.logout);
  };

  loginEmployee = employee => {
    return this.post(config.api.employees.login, { employee })
      .then(this.saveTokenAndEmployeeFromResponse)
      .then(res => createEmployee(res.employee));
  };

  signupEmployee = employee => {
    return this.post(config.api.vendors.employees, { employee })
      .then(this.saveTokenAndEmployeeFromResponse)
      .then(res => createEmployee(res.employee));
  };

  getEmployee = (employee, vendor_uuid) => {
    if (employee) vendor_uuid = employee.vendor_uuid;
    else if (this.employee) vendor_uuid = this.employee.vendor_uuid;
    let url = config.api.vendors.employees + "/" + vendor_uuid;
    if (employee && employee.uuid) url += "/" + employee.uuid;
    // if (!vendor_uuid) return Promise.reject();
    return this.get(url).then(res => {
      if (res.employee) return createEmployee(res.employee);
      else if (res.employees) return res.employees.map(createEmployee);
    });
  };

  updateEmployee = (updates, employee) => {
    let uuid;
    if (employee) {
      uuid = employee.uuid;
    } else uuid = this.employee.uuid;
    return this.put(
      config.api.vendors.employees +
        "/" +
        this.employee.vendor_uuid +
        "/" +
        uuid,
      {
        updates
      }
    ).then(res => createEmployee(res.employee));
  };

  deleteEmployee = employee =>
    this.delete(
      config.api.vendors.employees +
        "/" +
        (employee || this.employee).vendor_uuid +
        "/" +
        (employee.uuid || this.employee.uuid)
    );

  getMyOrganization = vendor_uuid =>
    this.get(
      config.api.vendors.root + "/" + (vendor_uuid || this.employee.vendor_uuid)
    ).then(res => createVendor(res.vendor));

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
        return {
          ...res,
          deal: createDeal({
            ...res.deal.data.deal,
            vendor: res.deal.data.vendor
          })
        };
      else if (res.deals)
        return {
          ...res,
          deals: res.deals.map(deal => {
            return createDeal({ ...deal.data.deal, vendor: deal.data.vendor });
          })
        };
    });
  };

  getOrgLoyaltyRewards = ({ loyalty_reward_uuid, limit, offset }) => {
    let url = config.api.vendors.rewards + "/" + this.employee.vendor_uuid;
    if (loyalty_reward_uuid) url += "/" + loyalty_reward_uuid;
    limit = +limit || 20;
    limit = +offset || 0;
    url += `?limit=${limit}&offset=${offset}`;
    return this.get(url).then(res => {
      if (res.loyalty_reward)
        return {
          ...res,
          loyalty_reward: createLoyaltyReward({
            ...res.loyalty_reward.data.loyalty_reward,
            vendor: res.loyalty_reward.data.vendor
          })
        };
      else if (res.loyalty_rewards)
        return {
          ...res,
          loyalty_rewards: res.loyalty_rewards.map(reward =>
            createLoyaltyReward({
              ...reward.data.loyalty_reward,
              vendor: reward.data.vendor
            })
          )
        };
    });
  };

  registerDeviceToken = device_token => {
    return this.post(config.api.notifications.register, { device_token });
  };

  updateCustomerRewardPoints = (points, num_points_redeemed, reward, type) => {
    const updates = {
      points
    };

    if (!!num_points_redeemed)
      updates.num_points_redeemed = num_points_redeemed;

    return this.put(
      config.api.customers.rewards +
        "/" +
        reward.customer.uuid +
        "/" +
        this.employee.vendor_uuid +
        "/" +
        reward.uuid,
      {
        updates,
        type
      }
    ).then(res =>
      createCustomerLoyaltyRewardCard(...reward, ...res.loyalty_reward)
    );
  };

  // TODO...add in API to save amount_spent under PurchaseHistory table for customer
  rewardCustomerRewardPoints = (points_to_reward, amount_spent, reward) =>
    this.updateCustomerRewardPoints(
      reward.customer.points + points_to_reward,
      null,
      reward,
      "earn"
    );

  redeemCustomerRewardPoints = (points_to_redeem, reward) =>
    this.updateCustomerRewardPoints(
      reward.customer.points - points_to_redeem,
      reward.customer.num_points_redeemed + points_to_redeem,
      reward,
      "redeem"
    );

  redeemCustomerDeal = (deal_uuid, customer_uuid) =>
    this.put(
      config.api.customers.deals +
        "/redeem/" +
        customer_uuid +
        this.employee.vendor_uuid +
        deal_uuid
    );

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
        this.employee.vendor_uuid +
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

  createNewDeal = deal =>
    this.post(config.api.vendors.deals + "/" + this.employee.vendor_uuid, {
      deal
    }).then(res => createDeal(res.deal));

  createNewLoyaltyProgram = loyalty_reward =>
    this.post(config.api.vendors.rewards + "/" + this.employee.vendor_uuid, {
      loyalty_reward
    }).then(res => createLoyaltyReward(res.loyalty_reward));

  createNewEmployee = employee =>
    this.post(config.api.vendors.employees + "/" + this.employee.vendor_uuid, {
      employee
    }).then(res => createEmployee(res.employee));
}

export default new Api(config.api.root);
