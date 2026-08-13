import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function useRedirect(url, milliseconds) {
  const navigateTo = useNavigate();
  const timerId = useRef(null);

  useEffect(componentDidMount, [url, milliseconds]);

  return handleRedirect;

  // Start the automatic redirect timer.
  function componentDidMount() {
    if (milliseconds) {
      timerId.current = setTimeout(handleRedirect, milliseconds);
    }

    // Clean up the timer if the page changes before the timer finishes.
    return function componentWillUnmount() {
      clearTimeout(timerId.current);
    };
  }

  // Navigate to the requested page.
  function handleRedirect() {
    clearTimeout(timerId.current);
    navigateTo(url);
  }
}

// Note: useEffect(componentDidMount, [url, milliseconds])

// "I use useEffect with a named componentDidMount callback to
// start the redirect timer when the component loads. The dependency
// list tells React to run the effect again if the URL or timer value
// changes."
// and

// return function componentWillUnmount() {
// clearTimeout(timerId.current);
// };
// "When the 404 component goes away, I clear the timer so it doesn't
// try to redirect after the component has already been removed."
