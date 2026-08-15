import { useSharedStateContext } from "../components/StateContext";

export function useStateContext(key) {
  const context = useSharedStateContext();

  // Make sure the StateContext exists.
  if (!context) {
    throw new Error(
      "useStateContext must be used inside StateContextProvider.",
    );
  }

  // Make sure the requested key exists.
  if (!context.hasKey(key)) {
    throw new Error(`Invalid state key: ${key}`);
  }

  const value = context.getValue(key);

  // Create a setter for the requested state value.
  function setValue(newValue) {
    // Support:
    //
    // setCartItems(newCart)
    //
    // and:
    //
    // setCartItems((previousItems) => newCart)

    if (typeof newValue === "function") {
      const currentValue = context.getValue(key);
      const updatedValue = newValue(currentValue);

      context.setValue(key, updatedValue);

      return;
    }

    context.setValue(key, newValue);
  }

  return [value, setValue];
}
