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
  const value = getValue(key);

  const [, setStateVersion] = useState(1);

  // Subscribe this component to changes.
  useEffect(componentDidMount, []);

  // Remove the subscription when the component leaves the page.
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

  // Update the shared state.
  function setter(newValue) {
    /*
      This supports BOTH forms:

      1. Direct value:

         setCartItems(newCart);

      2. Function updater:

         setCartItems((previousItems) => {
           return newCart;
         });

      Products.jsx uses the second form.
    */

    if (typeof newValue === "function") {
      const currentValue = getValue(key);

      const updatedValue = newValue(currentValue);

      setValue(key, updatedValue);

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
