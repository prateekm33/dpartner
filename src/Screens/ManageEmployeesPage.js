import React, { Component } from "react";
import { connect } from "../redux";
import { StyleSheet } from "react-native";
import ScreenContainer from "../Templates/ScreenContainer";
import { stringMatches, getResponsiveCSSFrom8 } from "../utils";
import { M_Search } from "../Molecules";
import {
  getOrgEmployeesAction,
  updateEmployeeAction,
  deleteEmployeeAction
} from "../redux/actions/employee.actions";
import {
  A_View,
  A_Text,
  A_Input_Dropdown_Role,
  A_Button_Opacity,
  A_Icon_Delete,
  A_Button
} from "../Atoms";
import { isAccountAdmin } from "../Models/Employee.model";
import { USER_ROLES } from "../utils/constants";
import { MODAL_SCREEN_NAMES } from "../ModalNavigator";
import { MAIN_SCREEN_NAMES } from "../MainNavigator";
import { TEAL_LIGHT } from "../styles/Colors";
import { DEFAULT_CARD_SHADOW } from "../styles/defaults";

class ManageEmployeesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      updates: []
    };
  }

  componentDidMount = () => {
    if (
      !isAccountAdmin(this.props.employee.role) ||
      !this.props.employee.vendor_uuid
    )
      return;

    this.props
      .dispatch(getOrgEmployeesAction(this.props.employee.vendor_uuid))
      .then(employees => {
        if (!employees) return;
        this.setState({ employees });
      });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.employee.uuid === this.props.employee.uuid) return;
    this.getOrgEmployees(nextProps);
  };

  getOrgEmployees = (props = this.props) =>
    props
      .dispatch(getOrgEmployeesAction(props.employee.vendor_uuid))
      .then(employees => {
        if (!employees) return;
        this.setState({ employees });
      });

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

  deleteEmployee = (employee, idx) => {
    this.props.dispatch(deleteEmployeeAction(employee)).then(done => {
      if (!done) return;
      this.state.updates.splice(idx, 1);
      this.setState({
        employees: this.state.employees.filter(e => e.uuid !== employee.uuid),
        updates: this.state.updates
      });
    });
  };

  renderEmployee = (employee, idx) => {
    const full_name = employee.fullName();
    return (
      <A_View style={style.employeeContainerStyle}>
        <A_View
          style={[style.employeeDetailLine, style.employeeNameContainerStyle]}
        >
          <A_Text strong style={style.employeeNameTextStyle}>
            {full_name}
          </A_Text>
          {employee.role !== USER_ROLES.VENDOR_ACCOUNT_OWNER && (
            <A_Icon_Delete onPress={() => this.deleteEmployee(employee, idx)} />
          )}
        </A_View>
        <A_View
          style={[style.employeeDetailLine, style.employeeEmailContainerStyle]}
        >
          <A_Text strong>Email</A_Text>
          {employee.email ? (
            <A_Text style={style.employeeEmailTextStyle}>
              {employee.email}
            </A_Text>
          ) : (
            <A_Text style={style.emptyDetailText}>--EMPTY--</A_Text>
          )}
        </A_View>
        <A_Input_Dropdown_Role
          role={employee.role}
          changeRole={role => this.changeRole(role, employee, idx)}
          dropdownContainerStyle={style.dropdownContainerStyle}
          dropdownOptionsContainerStyle={style.dropdownOptionsContainerStyle}
          dropdownInputContainerStyle={style.dropdownInputContainerStyle}
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

  showNewEmployeeForm = () =>
    this.props.mainNavigation.navigate(MAIN_SCREEN_NAMES.ModalNavigator, {
      routeName: MODAL_SCREEN_NAMES.NewEmployeeFormModal,
      params: {
        onDone: () => this.getOrgEmployees()
      }
    });

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
      <ScreenContainer
        title="Employees"
        scrollView
        headerMainContainerStyle={{
          backgroundColor: "#443266"
        }}
        headerMainTitleTextStyle={{ color: "white" }}
      >
        {!this.props.employee.isAccountAdmin() ? (
          this.renderUnauthDisplay()
        ) : (
          <A_View>
            <A_Button_Opacity
              value="NEW"
              onPress={this.showNewEmployeeForm}
              style={style.newButtonStyle}
              buttonTextStyles={style.newButtonTextStyles}
              strong
            />
            <M_Search
              onSearch={this.onSearch}
              data={this.state.employees}
              renderItem={this.renderEmployee}
              extraData={{ updates: this.state.updates }}
              listContainerStyle={style.listContainerStyle}
              listContentContainerStyle={style.listContentContainerStyle}
              containerStyle={style.containerStyle}
            />
          </A_View>
        )}
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => ({
  employee: state.employee,
  employees: state.employees
});
export default connect(mapStateToProps)(ManageEmployeesPage);

const style = StyleSheet.create({
  containerStyle: {
    marginBottom: getResponsiveCSSFrom8(200).height
  },
  listContainerStyle: {},
  listContentContainerStyle: {},
  employeeContainerStyle: {
    ...DEFAULT_CARD_SHADOW,
    backgroundColor: "white",
    paddingTop: 0,
    marginVertical: getResponsiveCSSFrom8(20).height
  },
  employeeNameContainerStyle: {
    paddingVertical: getResponsiveCSSFrom8(20).width,
    marginVertical: 0,
    backgroundColor: "#9c8aa5",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  },
  employeeNameTextStyle: {
    color: "white",
    fontSize: getResponsiveCSSFrom8(23).height
  },
  employeeEmailTextStyle: {},
  employeeDetailLine: {
    // marginVertical: getResponsiveCSSFrom8(10).height,
    paddingHorizontal: getResponsiveCSSFrom8(30).width,
    paddingVertical: getResponsiveCSSFrom8(10).height
  },
  emptyDetailText: {
    marginLeft: getResponsiveCSSFrom8(10).width,
    color: "grey"
  },
  newButtonStyle: {
    backgroundColor: "#622f6b",
    width: getResponsiveCSSFrom8(100).width,
    alignSelf: "flex-end",
    marginBottom: getResponsiveCSSFrom8(20).height
  },
  newButtonTextStyles: {
    textAlign: "center",
    color: "white"
  },
  dropdownContainerStyle: {
    marginHorizontal: getResponsiveCSSFrom8(30).width,
    paddingVertical: getResponsiveCSSFrom8(10).height
  },
  dropdownOptionsContainerStyle: {
    // top: getResponsiveCSSFrom8(50).height,
    position: "relative"
  },
  dropdownInputContainerStyle: {
    minHeight: getResponsiveCSSFrom8(50).height
  }
});
