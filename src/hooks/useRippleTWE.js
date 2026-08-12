// Initialization for ES Users
import { Ripple, initTWE } from "tw-elements";
import { useState, useEffect } from "react";

export default function useRippleTWE() {
  useEffect(componentDidMount, []);

  function componentDidMount() {
    initTWE({ Ripple });
  }
}
