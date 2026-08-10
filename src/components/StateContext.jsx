import { createContext, useEffect, useState } from "react";

// This Map stores the shared state for NOVUS Market.
const initialState = new Map([
  [
    "login",
    {
      email: "",
      password: "",
    },
  ],
  ["cartItems", []],
]);

// This creates a list where our Context objects can be stored
const STATE_CONTEXT_LIST = Symbol.for("STATE_CONTEXT_LIST");

// Create the list only if it does not already exist
if (!window[STATE_CONTEXT_LIST]) {
window[STATE_CONTEXT_LIST] = [];
}

export function StateContext({ children }) {

  const [didMount, setDidMount] = useState(false);
  const [Context, setContext] = useState(null);

  // This keeps track of components listening for state changes.
  const [listeners] = useState(new Set());
  // This Map contains our shared application state.
  const [map] = useState(initialState);
  
  // Run when the component mounts
  useEffect(componentDidMount, []);

  // Run when the components unmounts
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
  // Component lifecycle
  function componentDidMount() {
    const NewContext = createContext();
    window[STATE_CONTEXT_LIST].push(NewContext);

    setDidMount(true);
    setContext(NewContext);
  }
  function componentWillUnmount() {
    return function () {
      setDidMount(false);
    };
  }

  // Shared state functions
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
