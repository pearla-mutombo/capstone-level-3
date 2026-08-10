import { useContext, useEffect, useState } from "react";

const STATE_CONTEXT_LIST = Symbol.for("STATE_CONTEXT_LIST");

export function useStateContext(key) {
  const Contexts = window[STATE_CONTEXT_LIST];
  const Context = Contexts.reduce(toClosestContext(key), null);

  handleErrors(key, Context);

  const { getValue, setValue, hasKey, subscribe, unsubscribe } = Context;
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
    setValue(key, newValue);
  }
}

function toClosestContext(key) {
  return function (closestContext, Context) {
    const contextValue = useContext(Context);
    if (contextValue) closestContext = contextValue;
    return closestContext;
  };
}

function handleErrors(key, Context) {
  if (!key)
    throw new Error('A key is required. Example: useStateContext("username")');
  if (!Context)
    throw new Error(
      "Invalid StateContext. Include this component in <StateContext> to give it access.",
    );
  if (!Context.hasKey(key))
    throw new Error(
      "Invalid key. Keys must be declared in initialState. Example: <StateContext initialState={state}>",
    );
}
