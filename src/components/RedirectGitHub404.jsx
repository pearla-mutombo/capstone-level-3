import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function RedirectGitHub404() {
  const navigateTo = useNavigate();

  useEffect(componentDidMount, []);

  return null;

  // Check whether GitHub Pages saved the original URL.
  function componentDidMount() {
    const redirectedFrom = localStorage.getItem("redirectedFrom");

    // If a URL was saved, navigate back to that page.
    if (redirectedFrom) {
      // Remove the saved URL after using it.
      localStorage.removeItem("redirectedFrom");

      // Navigate to the original page.
      navigateTo(redirectedFrom);
    }
  }
}
