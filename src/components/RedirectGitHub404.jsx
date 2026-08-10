import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function RedirectGitHub404() {
  const navigateTo = useNavigate();
  useEffect(componentDidMount, []);
  return <></>;

  function componentDidMount() {
    // Check if GitHub Pages saved the original URL
    const redirectedFrom = localStorage.getItem("redirectedFrom");
    // If a URL was saved, go back to that page
    if (redirectedFrom) {
      // Remove the saved URL after using it.
      localStorage.removeItem("redirectedFrom");
      // Navigate to the original page
      navigateTo(redirectedFrom);
    }
  }
}
