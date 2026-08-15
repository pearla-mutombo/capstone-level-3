import { createContext, useContext, useState } from "react";

// Create one shared React context.
const StateContext = createContext(null);

export function StateContextProvider({ children, initialState }) {
  // Create the shared state only once.
  const [state, setState] = useState(() => {
    const startingState = new Map(initialState);

    // Load the guest cart from localStorage.
    let savedCart = [];

    try {
      const savedCart = JSON.parse(localStorage.getItem("novus_cart"));

      if (Array.isArray(savedCart)) {
        startingState.set("cartItems", savedCart);
      } else {
        startingState.set("cartItems", []);
      }
    } catch (error) {
      console.error("Unable to load saved cart:", error);

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

      // The cart must ALWAYS be an array.
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

// Custom hook used by useStateContext.js.
export function useStateContextProvider() {
  return useContext(StateContext);
}
