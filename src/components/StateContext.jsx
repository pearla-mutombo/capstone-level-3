import { createContext, useContext, useState } from "react";

// Create one shared React context.
const StateContext = createContext(null);

export function StateContextProvider({ children, initialState }) {
  // Create the shared state.
  const [state, setState] = useState(() => {
    const startingState = new Map(initialState);

    // Get the saved cart from the browser.
    try {
      const savedCartText = localStorage.getItem("novus_cart");

      if (savedCartText) {
        const savedCart = JSON.parse(savedCartText);

        // Only use the saved value if it is an array.
        if (Array.isArray(savedCart)) {
          startingState.set("cartItems", savedCart);
        }
      }
    } catch (error) {
      console.error("Unable to load saved cart:", error);
      startingState.set("cartItems", []);
    }

    // Make sure cartItems always starts as an array.
    if (!Array.isArray(startingState.get("cartItems"))) {
      startingState.set("cartItems", []);
    }

    return startingState;
  });

  // Get a value from shared state.
  function getValue(key) {
    return state.get(key);
  }

  // Change a value in shared state.
  function setValue(key, value) {
    setState(function updateState(previousState) {
      const newState = new Map(previousState);

      // cartItems must always be an array.
      if (key === "cartItems" && !Array.isArray(value)) {
        value = [];
      }

      newState.set(key, value);

      // Save the guest cart.
      if (key === "cartItems") {
        try {
          localStorage.setItem("novus_cart", JSON.stringify(value));
        } catch (error) {
          console.error("Unable to save cart:", error);
        }
      }

      return newState;
    });
  }

  // Check whether a state key exists.
  function hasKey(key) {
    return state.has(key);
  }

  return (
    <StateContext.Provider
      value={{
        getValue,
        setValue,
        hasKey,
      }}>
      {children}
    </StateContext.Provider>
  );
}

// Give other files access to the shared context.
export function useSharedStateContext() {
  return useContext(StateContext);
}
