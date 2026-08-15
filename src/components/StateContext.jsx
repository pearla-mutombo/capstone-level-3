import { createContext, useEffect, useState } from "react";

const STATE_CONTEXT_LIST = Symbol.for("STATE_CONTEXT_LIST");

// Create the list of StateContexts once.
if (!window[STATE_CONTEXT_LIST]) {
  window[STATE_CONTEXT_LIST] = [];
}

export function StateContext({ children, initialState }) {
  // Make sure the starting state was provided.
  if (!initialState) {
    throw new Error("initialState must be a Map object.");
  }

  // Store the React Context.
  const [Context, setContext] = useState(null);

  // Track whether the component has loaded.
  const [didMount, setDidMount] = useState(false);

  // Keep track of components that are listening for state changes.
  const [listeners] = useState(new Set());

  // Create the shared state only once.
  const [map] = useState(() => {
    const startingState = new Map(initialState);

    // Get the saved cart from the browser.
    const savedCart = loadSavedCart();

    // Make sure cartItems is ALWAYS an array.
    if (Array.isArray(savedCart)) {
      startingState.set("cartItems", savedCart);
    } else {
      startingState.set("cartItems", []);
    }

    return startingState;
  });

  // Create the React Context after the component loads.
  useEffect(() => {
    const newContext = createContext();

    window[STATE_CONTEXT_LIST].push(newContext);

    setContext(newContext);
    setDidMount(true);

    // Remove this context when the component is removed.
    return () => {
      const contextIndex = window[STATE_CONTEXT_LIST].indexOf(newContext);

      if (contextIndex !== -1) {
        window[STATE_CONTEXT_LIST].splice(contextIndex, 1);
      }

      setDidMount(false);
    };
  }, []);

  // Do not render the children until the Context exists.
  if (!didMount || !Context) {
    return null;
  }

  return (
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

  // --------------------------------------------------
  // Get a value from shared state.
  // --------------------------------------------------

  function getValue(key) {
    return map.get(key);
  }

  // --------------------------------------------------
  // Change a value in shared state.
  // --------------------------------------------------

  function setValue(key, value) {
    // cartItems must always be an array.
    if (key === "cartItems") {
      if (!Array.isArray(value)) {
        console.error("cartItems must be an array. Resetting the cart.");

        value = [];
      }
    }

    // Save the new value.
    map.set(key, value);

    // Save the cart in the browser.
    if (key === "cartItems") {
      saveCart(value);
    }

    // Tell components that the state changed.
    listeners.forEach(updateListener);
  }

  // --------------------------------------------------
  // Check whether a state key exists.
  // --------------------------------------------------

  function hasKey(key) {
    return map.has(key);
  }

  // --------------------------------------------------
  // Add a component to the listener list.
  // --------------------------------------------------

  function subscribe(setter, key) {
    listeners.add({
      update: setter,
      key: key,
    });
  }

  // --------------------------------------------------
  // Remove a component from the listener list.
  // --------------------------------------------------

  function unsubscribe(setter) {
    for (const listener of listeners) {
      if (listener.update === setter) {
        listeners.delete(listener);
      }
    }
  }

  // --------------------------------------------------
  // Tell the correct components to update.
  // --------------------------------------------------

  function updateListener(listener) {
    listener.update(increaseVersion);
  }
}

// Increase the state version.
function increaseVersion(currentVersion) {
  return currentVersion + 1;
}

// --------------------------------------------------
// Load the guest cart from localStorage.
// --------------------------------------------------

function loadSavedCart() {
  try {
    const savedCart = localStorage.getItem("novus_cart");

    // No saved cart means start with an empty array.
    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    // Only accept an array.
    if (Array.isArray(parsedCart)) {
      return parsedCart;
    }

    // Remove invalid cart data.
    localStorage.removeItem("novus_cart");

    return [];
  } catch (error) {
    console.error("Unable to load saved cart:", error);

    localStorage.removeItem("novus_cart");

    return [];
  }
}

// --------------------------------------------------
// Save the guest cart in localStorage.
// --------------------------------------------------

function saveCart(cartItems) {
  try {
    // Only save an array.
    if (Array.isArray(cartItems)) {
      localStorage.setItem("novus_cart", JSON.stringify(cartItems));
    }
  } catch (error) {
    console.error("Unable to save cart:", error);
  }
}
