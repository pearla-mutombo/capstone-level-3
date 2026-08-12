import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

export default function useRedirect(url, milliseconds) {
  const navigateTo = useNavigate();
  const [timerId, setTimerId] = useState();

  useEffect(componentDidMount, [url, milliseconds]);

  return handleRedirect;

  function handleRedirect() {
    clearTimeout(timerId);
    navigateTo(url);
  }

  function componentDidMount() {
    if (milliseconds) {
      const id = setTimeout(handleRedirect, milliseconds);
      setTimerId(id);
    }
  }
}
