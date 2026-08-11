import { createContext, useEffect, useState } from "react";

const STATE_CONTEXT_LIST = Symbol.for("STATE_CONTEXT_LIST");
window[STATE_CONTEXT_LIST] = [];

export function StateContext({ children, initialState }) {
  if (!initialState)
    throw new Error(
      "initialState must be a Map object - example: new Map() - that declares all states for child components.",
    );

  const [didMount, setDidMount] = useState();
  const [Context, setContext] = useState();
  const [stateVersion, setStateVersion] = useState(1);
  const [listeners] = useState(new Set());
  const [map] = useState(initialState);

  useEffect(componentDidMount, []);
  useEffect(componentWillUnmount, []);

  let component = <></>;
  if (didMount)
    component = (
      <Context value={{ getValue, setValue, hasKey, subscribe, unsubscribe }}>
        {children}
      </Context>
    );

  return <>{component}</>;

  //////////////////////////////////////////////////////////////////

  function componentDidMount() {
    const Context = createContext();
    window[STATE_CONTEXT_LIST].push(Context);

    setDidMount(true);
    setContext(Context);
  }

  function componentWillUnmount() {
    return function () {
      setDidMount(false);
    };
  }

  function subscribe(setter, key) {
    listeners.add({ update: setter, key });
  }

  function unsubscribe(setter) {
    for (let item of listeners) {
      if (item.update === setter) listeners.delete(item);
    }
  }

  function getValue(key) {
    const value = map.get(key);
    return value;
  }

  function setValue(key, value) {
    map.set(key, value);
    setStateVersion(incrementVersion);
    listeners.forEach(updateListener);
    function updateListener(listener) {
      if (listener.key === key) listener.update(incrementVersion);
    }
  }

  function hasKey(key) {
    return map.has(key);
  }
}

function incrementVersion(currentVersion) {
  return currentVersion + 1;
}
