import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function RedirectGitHub404() {
  const navigateTo = useNavigate();

  useEffect(componentDidMount, []);

  return null;

  // Restore the original GitHub Pages URL, if one was saved.
  function componentDidMount() {
    const redirectedFrom = localStorage.getItem("redirectedFrom");

    // Nothing to restore.
    if (!redirectedFrom) {
      return;
    }

    // Remove the saved URL so it is only used once.
    localStorage.removeItem("redirectedFrom");

    // Only redirect to a valid internal path.
    if (redirectedFrom.startsWith("/")) {
      navigateTo(redirectedFrom);
    }
  }
}
