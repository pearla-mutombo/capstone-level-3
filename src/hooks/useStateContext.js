import { useContext, useEffect, useState } from "react";

const STATE_CONTEXT_LIST = Symbol.for("STATE_CONTEXT_LIST");

export function useStateContext(key) {
  const contexts = window[STATE_CONTEXT_LIST];

  let sharedContext = null;

  // Find the StateContext that belongs to this component.
  for (let index = 0; index < contexts.length; index++) {
    const contextValue = useContext(contexts[index]);

    if (contextValue) {
      sharedContext = contextValue;
    }
  }

  // Make sure the state exists.
  if (!key) {
    throw new Error("useStateContext needs a state key.");
  }

  if (!sharedContext) {
    throw new Error("This component must be inside StateContext.");
  }

  if (!sharedContext.hasKey(key)) {
    throw new Error(`The state key "${key}" does not exist.`);
  }

  const { getValue, setValue, subscribe, unsubscribe } = sharedContext;

  // Get the current value.
  const value = getValue(key);

  // This causes the component to update when shared state changes.
  const [, setStateVersion] = useState(0);

  useEffect(() => {
    subscribe(setStateVersion, key);

    return () => {
      unsubscribe(setStateVersion);
    };
  }, []);

  // Allow normal values AND function updates.
  function setter(newValue) {
    if (typeof newValue === "function") {
      const currentValue = getValue(key);
      const updatedValue = newValue(currentValue);

      setValue(key, updatedValue);
      return;
    }

    setValue(key, newValue);
  }

  return [value, setter];
}
