import React from "react";
import { connect } from "../redux";
import { View } from "react-native";
import { withEventDispatcher } from "./EventDispatcher";
import { NavigationActions } from "react-navigation";

class NavigationLinkedList {
  constructor() {
    this.tail = null;
    this.head = null;
  }

  static createNode = (navigation, component) => ({
    navigation,
    prev: null,
    next: null,
    component
  });

  add(node) {
    if (this.tail !== null) {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    } else if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      console.warn("SOMETHING WENT WRONG IN ADDING TO THIS LINKED LIST.");
    }
  }

  remove(node) {
    const prev = node.prev;
    const next = node.next;
    if (prev) {
      prev.next = node.next;
    } else if (this.head === node) {
      this.head = next;
    } else {
      console.warn("SOMETHING WENT WRONG WHEN RESETTING THE HEAD.");
    }
    if (next) {
      next.prev = prev;
    } else if (this.tail === node) {
      this.tail = prev;
    } else {
      console.warn("SOMETHING WENT WRONG WHEN RESETTING THE TAIL.");
    }
  }
}

class NavigationStackHandler {
  constructor() {
    this.stack = {};
    this.latest = [];
    this.list = new NavigationLinkedList();
  }

  add = (component, navigation) => {
    this.stack[component] = this.stack[component] || [];
    const node = NavigationLinkedList.createNode(navigation, component);
    this.stack[component].push(node);
    this.list.add(node);
  };

  remove = component => {
    const node = this.stack[component].shift();
    this.list.remove(node);
  };

  get = component => {
    this.stack[component] = this.stack[component] || [];
    const arr = this.stack[component];
    return arr[arr.length - 1];
  };

  getLatest = () => {
    if (!this.list.tail) return null;
    return this.list.tail.navigation;
  };
}

export const withAppComponentInitiators = Component => {
  // pass in any redux state that needs to be sent to all screens
  return connect()(props => (
    <AppComponentInitiatorWithEventDispatcher
      navigation={props.navigation}
      component={Component}
      screenProps={props.screenProps}
    >
      <Component
        {...props}
        mainNavigation={(props.screenProps || {}).mainNavigation}
      />
    </AppComponentInitiatorWithEventDispatcher>
  ));
};

export const navStack = new NavigationStackHandler();

class AppComponentInitiator extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    navStack.add(this.props.component.displayName, this.props.navigation);
  };

  componentWillUnmount = () => {
    navStack.remove(this.props.component.displayName);
  };

  handleDrawerMenuNav = args => {
    const currentNavigationHandler = navStack.getLatest();
    const currentRoute = currentNavigationHandler.state.routeName;

    if (this.props.component.displayName !== currentRoute) return;
    if (currentRoute === args.routeName) return;

    if (args.shouldReset) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: args.routeName,
            params: args.params || {}
          })
        ]
      });
      return currentNavigationHandler.dispatch(resetAction);
    } else {
      return currentNavigationHandler.navigate(
        args.routeName,
        args.params || {}
      );
    }
  };

  render() {
    return <View>{this.props.children}</View>;
  }
}
const AppComponentInitiatorWithEventDispatcher = withEventDispatcher(
  AppComponentInitiator
);
