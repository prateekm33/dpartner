import React, { Component } from "react";
import { connect } from "../redux";
import ScreenContainer from "../Templates/ScreenContainer";
import { stringMatches } from "../utils";
import { M_Search } from "../Molecules";
import {
  getOrgEmployeesAction,
  updateEmployeeAction
} from "../redux/actions/employee.actions";
import {
  A_View,
  A_Text,
  A_Input_Dropdown_Role,
  A_Button,
  A_Button_Opacity
} from "../Atoms";
import { USER_ROLES } from "../utils/constants";

class ManageEmployeesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      updates: []
    };
  }

  componentDidMount = () => {
    if (this.props.employee.role !== USER_ROLES.VENDOR_ADMIN) return;
    this.props.dispatch(getOrgEmployeesAction()).then(employees => {
      if (!employees) return;
      this.setState({ employees });
    });
  };

  onSearch = value => {
    return this.state.employees.filter(employee => {
      if (
        stringMatches(
          value,
          employee.first_name,
          employee.last_name,
          employee.email
        )
      )
        return true;
    });
  };

  changeRole = (role, employee, idx) => {
    const updates = this.state.updates.slice();
    if (employee.role === role) {
      updates[idx] = undefined;
      return this.setState({ updates });
    }
    updates[idx] = updates[idx] || {};
    updates[idx].role = role;
    this.setState({
      updates
    });
  };

  saveEmployeeUpdates = (employee, idx) => {
    this.props
      .dispatch(updateEmployeeAction(employee, this.state.updates[idx]))
      .then(employee => {
        const updates = this.state.updates.slice();
        updates[idx] = undefined;
        if (!employee)
          return this.setState({ employees: this.state.employees, updates });
        this.state.employees[idx] = employee;
        const employees = this.state.employees.map(e => {
          if (e.uuid !== employee.uuid) return e;
          return employee;
        });
        this.setState({ employees, updates });
      });
  };

  renderEmployee = (employee, idx) => {
    return (
      <A_View>
        {}
        <A_Text strong>Name</A_Text>
        <A_Text>{employee.fullName()}</A_Text>
        <A_Text strong>Email</A_Text>
        <A_Text>{employee.email}</A_Text>
        <A_Input_Dropdown_Role
          role={employee.role}
          changeRole={role => this.changeRole(role, employee, idx)}
        />
        {this.state.updates[idx] && (
          <A_Button_Opacity
            value="SAVE"
            onPress={() => this.saveEmployeeUpdates(employee, idx)}
          />
        )}
      </A_View>
    );
  };

  renderUnauthDisplay = () => {
    return (
      <A_View>
        <A_Text strong>
          You do not have the appropriate privileges to view this page. Please
          ask your account admin if you need access.
        </A_Text>
      </A_View>
    );
  };
  render() {
    return (
      <ScreenContainer title="Employees">
        {this.props.employee.role !== USER_ROLES.VENDOR_ADMIN ? (
          this.renderUnauthDisplay()
        ) : (
          <M_Search
            onSearch={this.onSearch}
            data={this.state.employees}
            renderItem={this.renderEmployee}
            extraData={{ updates: this.state.updates }}
          />
        )}
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({ employee: state.employee });
export default connect(mapStateToProps)(ManageEmployeesPage);
