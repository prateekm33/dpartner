import React from "react";

export const CUSTOM_EVENTS = { SHOW_MODAL: "SHOW_MODAL" };

const LISTENERS = {};

const eventDispatcher = {
  addEventListener(event, cb, ref) {
    LISTENERS[event] = LISTENERS[event] || [];
    LISTENERS[event].push(cb);
  },
  removeEventListener(event, cb, ref) {
    LISTENERS[event] = LISTENERS[event] || [];
    LISTENERS[event] = LISTENERS[event].filter(c => c !== cb);
  },
  dispatchEvent(event, params) {
    LISTENERS[event] = LISTENERS[event] || [];
    const promises = LISTENERS[event].map(cb => {
      return new Promise((res, rej) => {
        (async () => {
          try {
            const result = await cb(params);
            res(result);
          } catch (e) {
            rej(e);
          }
        })();
      });
    });

    return Promise.all(promises);
  }
};

export const withEventDispatcher = Component => {
  const EventDispatcher = props => {
    const component = (
      <Component {...props} eventDispatcher={eventDispatcher} />
    );
    return component;
  };
  EventDispatcher.displayName = Component.originalName || Component.displayName;
  return EventDispatcher;
};
