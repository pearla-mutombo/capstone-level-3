import { useContext, useEffect, useState } from "react";

const STATE_CONTEXT_LIST = Symbol.for("STATE_CONTEXT_LIST");

export function useStateContext(key) {
  const Contexts = window[STATE_CONTEXT_LIST];

  let closestContext = null;

  // Find the StateContext that contains this component.
  for (let index = 0; index < Contexts.length; index++) {
    const contextValue = useContext(Contexts[index]);

    if (contextValue) {
      closestContext = contextValue;
    }
  }

  // Make sure the requested state exists.
  handleErrors(key, closestContext);

  const { getValue, setValue, hasKey, subscribe, unsubscribe } = closestContext;

  // Get the current value.
  const value = getSafeValue();

  // This state causes the component to update when shared state changes.
  const [, setStateVersion] = useState(1);

  // Subscribe this component to changes.
  useEffect(componentDidMount, []);

  // Remove the subscription when this component leaves the page.
  useEffect(componentWillUnmount, []);

  return [value, setter];

  ////////////////////////////////////////////////////////////

  function componentDidMount() {
    subscribe(setStateVersion, key);
  }

  function componentWillUnmount() {
    return function cleanup() {
      unsubscribe(setStateVersion);
    };
  }

  // Get the shared state safely.
  function getSafeValue() {
    const currentValue = getValue(key);

    // The cart must always be an array.
    if (key === "cartItems") {
      if (Array.isArray(currentValue)) {
        return currentValue;
      }

      return [];
    }

    return currentValue;
  }

  // Update the shared state.
  function setter(newValue) {
    /*
      This supports two forms:

      1. Direct value:

         setCartItems(newCart);

      2. Function updater:

         setCartItems((previousItems) => {
           return newCart;
         });
    */

    // Handle a function updater.
    if (typeof newValue === "function") {
      let currentValue = getValue(key);

      // The cart must always start as an array.
      if (key === "cartItems" && !Array.isArray(currentValue)) {
        currentValue = [];
      }

      const updatedValue = newValue(currentValue);

      // Make sure the cart can never become an object,
      // string, number, or another non-array value.
      if (key === "cartItems") {
        if (Array.isArray(updatedValue)) {
          setValue(key, updatedValue);
        } else {
          setValue(key, []);
        }

        return;
      }

      setValue(key, updatedValue);

      return;
    }

    // Handle a normal value.
    if (key === "cartItems") {
      if (Array.isArray(newValue)) {
        setValue(key, newValue);
      } else {
        setValue(key, []);
      }

      return;
    }

    setValue(key, newValue);
  }
}

function handleErrors(key, context) {
  if (!key) {
    throw new Error('A key is required. Example: useStateContext("username")');
  }

  if (!context) {
    throw new Error(
      "Invalid StateContext. Include this component in <StateContext> to give it access.",
    );
  }

  if (!context.hasKey(key)) {
    throw new Error(
      "Invalid key. Keys must be declared in initialState. Example: <StateContext initialState={state}>",
    );
  }
}
