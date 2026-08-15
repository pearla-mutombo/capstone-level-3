import { createContext, useEffect, useState } from "react";

const STATE_CONTEXT_LIST = Symbol.for("STATE_CONTEXT_LIST");

window[STATE_CONTEXT_LIST] = [];

export function StateContext({ children, initialState }) {
  if (!initialState) {
    throw new Error("StateContext needs an initialState Map.");
  }

  const [Context, setContext] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // Create the shared state one time.
  const [stateMap] = useState(() => {
    const newState = new Map(initialState);

    // Always make sure cartItems starts as an array.
    let savedCart = [];

    try {
      const savedCartText = localStorage.getItem("novus_cart");

      if (savedCartText) {
        const parsedCart = JSON.parse(savedCartText);

        if (Array.isArray(parsedCart)) {
          savedCart = parsedCart;
        }
      }
    } catch (error) {
      console.error("Could not load the saved cart:", error);
    }

    newState.set("cartItems", savedCart);

    return newState;
  });

  // Store components that are listening for state changes.
  const [listeners] = useState(new Set());

  useEffect(() => {
    const NewContext = createContext();

    window[STATE_CONTEXT_LIST].push(NewContext);

    setContext(NewContext);
    setIsReady(true);

    return () => {
      const contextIndex = window[STATE_CONTEXT_LIST].indexOf(NewContext);

      if (contextIndex !== -1) {
        window[STATE_CONTEXT_LIST].splice(contextIndex, 1);
      }
    };
  }, []);

  if (!isReady || !Context) {
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

  // Get a value from shared state.
  function getValue(key) {
    return stateMap.get(key);
  }

  // Change a value in shared state.
  function setValue(key, newValue) {
    // Cart must always be an array.
    if (key === "cartItems" && !Array.isArray(newValue)) {
      console.error("Cart must be an array. Resetting cart.");
      newValue = [];
    }

    stateMap.set(key, newValue);

    // Save the cart in the browser.
    if (key === "cartItems") {
      try {
        localStorage.setItem("novus_cart", JSON.stringify(newValue));
      } catch (error) {
        console.error("Could not save the cart:", error);
      }
    }

    // Tell components that the state changed.
    listeners.forEach((listener) => {
      if (listener.key === key) {
        listener.update((version) => version + 1);
      }
    });
  }

  // Check whether a state key exists.
  function hasKey(key) {
    return stateMap.has(key);
  }

  // Add a component to the listener list.
  function subscribe(update, key) {
    listeners.add({
      update,
      key,
    });
  }

  // Remove a component from the listener list.
  function unsubscribe(update) {
    for (const listener of listeners) {
      if (listener.update === update) {
        listeners.delete(listener);
      }
    }
  }
}
