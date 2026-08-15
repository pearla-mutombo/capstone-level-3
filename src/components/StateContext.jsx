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

  // Create the shared state only once.
  const [map] = useState(() => {
    const startingState = new Map(initialState);

    // Load the saved guest cart.
    const savedCart = loadSavedCart();

    // Only use the saved value if it is actually an array.
    if (Array.isArray(savedCart)) {
      startingState.set("cartItems", savedCart);
    } else {
      startingState.set("cartItems", []);
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

  ////////////////////////////////////////////////////////////////

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
    // Make sure the cart is always an array.
    if (key === "cartItems" && !Array.isArray(value)) {
      value = [];
    }

    map.set(key, value);

    // Save the guest cart.
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

// Load the saved guest cart.
function loadSavedCart() {
  try {
    const savedCart = localStorage.getItem("novus_cart");

    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    // Only return arrays.
    if (Array.isArray(parsedCart)) {
      return parsedCart;
    }

    // If the saved value is not an array, start fresh.
    localStorage.removeItem("novus_cart");

    return [];
  } catch (error) {
    console.error("Unable to load saved cart:", error);

    localStorage.removeItem("novus_cart");

    return [];
  }
}
