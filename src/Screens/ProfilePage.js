import React, { Component } from "react";
import { connect } from "../redux";
import { StyleSheet } from "react-native";
import config from "../../config";
import ScreenContainer from "../Templates/ScreenContainer";
import {
  A_Text,
  A_Input,
  A_View,
  A_Text_Email,
  A_Input_Dropdown_Role,
  A_Button_Opacity
} from "chemics/Atoms";
import { USER_ROLES } from "../utils/constants";
import { M_VendorHours } from "chemics/Molecules";
import {
  logoutAction,
  updateEmployeeAction
} from "../redux/actions/employee.actions";
import { SCREEN_NAMES } from "../AppNavigator";
import { getResponsiveCSSFrom8 } from "../utils";
import { RED_TWO } from "../styles/Colors";

const ADMIN_DROPDOWN_OPTION = {
  text: "ADMIN",
  value: USER_ROLES.VENDOR_ADMIN
};
const EMPLOYEE_DROPDOWN_OPTION = {
  text: "EMPLOYEE",
  value: USER_ROLES.VENDOR_EMPLOYEE
};
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    let role;
    if (props.employee.role === USER_ROLES.VENDOR_ADMIN)
      role = ADMIN_DROPDOWN_OPTION;
    else if (props.employee.role === USER_ROLES.VENDOR_EMPLOYEE)
      role = EMPLOYEE_DROPDOWN_OPTION;
    this.state = {
      role,
      first_name: props.employee.first_name,
      last_name: props.employee.last_name,
      email: props.employee.email
    };
  }

  savePersonalInfo = () => {
    const { role, first_name, last_name, email } = this.state;
    const updates = {
      role,
      first_name,
      last_name,
      email
    };
    this.props.dispatch(updateEmployeeAction(this.props.employee, updates));
  };

  changeRole = (role, employee, idx) => {
    this.setState({ role });
  };

  changeFirstName = first_name => this.setState({ first_name });
  changeLastName = last_name => this.setState({ last_name });
  changeEmail = email => this.setState({ email });

  logout = () =>
    this.props.dispatch(logoutAction()).then(success => {
      if (!success) return;
      this.props.navigation.resetTo(SCREEN_NAMES.SplashScreen);
    });

  render() {
    const { employee, vendor } = this.props;
    return (
      <ScreenContainer
        title="Profile"
        scrollView
        headerMainContainerStyle={{
          backgroundColor: "#3D9990" //"#03a9f4"
        }}
        headerMainTitleTextStyle={{
          color: "white"
        }}
        containerStyle={style.scrollContainerStyles}
        innerContainerStyle={style.scrollInnerContainerStyles}
      >
        <A_View style={[style.sectionContainerStyles]}>
          <A_Text style={[style.sectionTitleStyles]}>
            BUSINESS INFORMATION
          </A_Text>
          <A_Text
            style={{
              color: "grey",
              marginBottom: getResponsiveCSSFrom8(25).height
            }}
          >
            Please contact us at{" "}
            <A_Text_Email
              buttonStyles={{ height: getResponsiveCSSFrom8(20).height }}
            >
              {config.email_addresses.merchants}
            </A_Text_Email>{" "}
            if you notice any issues and/or you need to update your business's
            information
          </A_Text>
          <A_View
            style={[style.infoDetailLineStyles, style.paddedContentStyles]}
          >
            <A_Text style={[style.infoLabelStyles]}>Business name</A_Text>
            <A_Input
              style={[style.infoDetailStyles]}
              editable={false}
              defaultValue={vendor.name}
              placeholder="Business name"
            />
          </A_View>
          <A_View
            style={[style.infoDetailLineStyles, style.paddedContentStyles]}
          >
            <A_Text style={[style.infoLabelStyles]}>Business phone</A_Text>
            <A_Input
              style={[style.infoDetailStyles]}
              editable={false}
              defaultValue={vendor.business_phone}
              placeholder="(123) 456 7890"
            />
          </A_View>
          <M_VendorHours
            hours={vendor.hours}
            containerStyles={{
              marginVertical: getResponsiveCSSFrom8(25).height
            }}
          />
        </A_View>
        <A_View style={[style.sectionContainerStyles]}>
          <A_Text style={[style.sectionTitleStyles]}>
            PERSONAL INFORMATION
          </A_Text>
          <A_View
            style={[style.infoDetailLineStyles, style.paddedContentStyles]}
          >
            <A_Text style={[style.infoLabelStyles]}>First Name</A_Text>
            <A_Input
              placeholder="First name"
              defaultValue={employee.first_name}
              onChangeText={this.changeFirstName}
              style={[style.infoDetailStyles]}
            />
          </A_View>
          <A_View
            style={[style.infoDetailLineStyles, style.paddedContentStyles]}
          >
            <A_Text style={[style.infoLabelStyles]}>Last Name</A_Text>
            <A_Input
              placeholder="Last name"
              defaultValue={employee.last_name}
              onChangeText={this.changeLastName}
              style={[style.infoDetailStyles]}
            />
          </A_View>
          <A_View
            style={[style.infoDetailLineStyles, style.paddedContentStyles]}
          >
            <A_Text style={[style.infoLabelStyles]}>Email</A_Text>
            <A_Input
              placeholder="Email"
              defaultValue={employee.email}
              onChangeText={this.changeEmail}
              style={[style.infoDetailStyles]}
            />
          </A_View>
          <A_View
            style={[style.infoDetailLineStyles, style.paddedContentStyles]}
          >
            <A_Text style={[style.infoLabelStyles]}>Role</A_Text>
            <A_Input
              placeholder="Role"
              defaultValue={employee.role
                .split("_")
                .slice(1)
                .join(" ")}
              editable={false}
              style={[style.infoDetailStyles]}
            />
          </A_View>
          {/* <A_Input_Dropdown_Role
              role={employee.role}
              changeRole={role => this.changeRole(role, employee, idx)}
              dropdownContainerStyle={{
                marginTop: getResponsiveCSSFrom8(25).height
              }}
            /> */}
        </A_View>
        <A_View style={[style.paddedContentStyles]}>
          <A_Button_Opacity
            strong
            value="SAVE"
            onPress={this.savePersonalInfo}
            style={[style.saveButtonStyles]}
            buttonTextStyles={style.saveButtonTextStyles}
          />
          <A_Button_Opacity
            onPress={this.logout}
            value="LOGOUT"
            style={style.logoutButtonStyles}
            buttonTextStyles={style.logoutButtonTextStyles}
            strong
          />
        </A_View>
      </ScreenContainer>
    );
  }
}

export default connect(state => ({
  employee: state.employee,
  vendor: state.vendor
}))(ProfilePage);

const style = StyleSheet.create({
  logoutButtonStyles: {
    marginBottom: getResponsiveCSSFrom8(50).height,
    backgroundColor: RED_TWO,
    alignItems: "center"
  },
  logoutButtonTextStyles: {
    color: "white",
    fontSize: getResponsiveCSSFrom8(20).height
  },
  saveButtonStyles: {
    alignItems: "center",
    marginVertical: getResponsiveCSSFrom8(20).height,
    backgroundColor: "#3D9990"
  },
  saveButtonTextStyles: {
    color: "white",
    fontSize: getResponsiveCSSFrom8(20).height
  },
  infoDetailLineStyles: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "white",
    alignItems: "center"
  },
  sectionTitleStyles: {
    color: "grey",
    fontSize: getResponsiveCSSFrom8(20).height,
    marginBottom: getResponsiveCSSFrom8(5).height
  },
  sectionContainerStyles: {
    marginTop: getResponsiveCSSFrom8(30).height
  },
  scrollContainerStyles: { backgroundColor: "rgba(255,255,255,0.6)" },
  scrollInnerContainerStyles: { padding: 0 },
  infoDetailStyles: {
    fontSize: getResponsiveCSSFrom8(18).height
  },
  infoLabelStyles: {
    fontSize: getResponsiveCSSFrom8(20).height
  },
  paddedContentStyles: { paddingHorizontal: getResponsiveCSSFrom8(10).width }
});
