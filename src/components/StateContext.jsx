import { createContext, useEffect, useState } from "react";

const STATE_CONTEXT_LIST = Symbol.for("STATE_CONTEXT_LIST");

window[STATE_CONTEXT_LIST] = [];

export function StateContext({ children, initialState }) {
  if (!initialState) {
    throw new Error(
      "initialState must be a Map object - example: new Map() - that declares all states for child components.",
    );
  }

  const [didMount, setDidMount] = useState();
  const [Context, setContext] = useState();
  const [, setStateVersion] = useState(1);
  const [listeners] = useState(new Set());

  // Create a copy so we do not modify the original initialState.
  const [map] = useState(() => {
    const startingState = new Map(initialState);

    const savedCart = loadSavedCart();

    if (startingState.has("cartItems") && savedCart !== null) {
      startingState.set("cartItems", savedCart);
    }

    return startingState;
  });

  useEffect(componentDidMount, []);
  useEffect(componentWillUnmount, []);

  let component = <></>;

  if (didMount) {
    component = (
      <Context
        value={{
          getValue,
          setValue,
          hasKey,
          subscribe,
          unsubscribe,
        }}>
        {children}
      </Context>
    );
  }

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
    listeners.add({
      update: setter,
      key,
    });
  }

  function unsubscribe(setter) {
    for (const item of listeners) {
      if (item.update === setter) {
        listeners.delete(item);
      }
    }
  }

  function getValue(key) {
    return map.get(key);
  }

  function setValue(key, value) {
    map.set(key, value);

    // Save the cart for guest shoppers.
    if (key === "cartItems") {
      try {
        localStorage.setItem("novus_cart", JSON.stringify(value));
      } catch (error) {
        console.error("Unable to save cart:", error);
      }
    }

    setStateVersion(incrementVersion);

    listeners.forEach(updateListener);

    function updateListener(listener) {
      if (listener.key === key) {
        listener.update(incrementVersion);
      }
    }
  }

  function hasKey(key) {
    return map.has(key);
  }
}

function incrementVersion(currentVersion) {
  return currentVersion + 1;
}

// Load a previously saved guest cart.
function loadSavedCart() {
  try {
    const savedCart = localStorage.getItem("novus_cart");

    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error("Unable to load saved cart:", error);
  }

  return null;
}
