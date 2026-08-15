import { useContext, useEffect, useState } from "react";

const STATE_CONTEXT_LIST = Symbol.for("STATE_CONTEXT_LIST");

export function useStateContext(key) {
  const Contexts = window[STATE_CONTEXT_LIST];

  let closestContext = null;

  for (let index = 0; index < Contexts.length; index++) {
    const contextValue = useContext(Contexts[index]);

    if (contextValue) {
      closestContext = contextValue;
    }
  }

  handleErrors(key, closestContext);

  const { getValue, setValue, hasKey, subscribe, unsubscribe } = closestContext;

  const value = getValue(key);

  const [stateVersion, setStateVersion] = useState(1);

  useEffect(componentDidMount, []);
  useEffect(componentWillUnmount, []);

  return [value, setter];

  /////////////////////////////////////////////////////

  function componentDidMount() {
    subscribe(setStateVersion, key);
  }

  function componentWillUnmount() {
    return function () {
      unsubscribe(setStateVersion);
    };
  }

  function setter(newValue) {
    // Support both:
    //
    // setCartItems(newCart)
    //
    // and:
    //
    // setCartItems(previousCart => newCart)
    //
    // This is important because Products.jsx
    // uses the second form.

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
