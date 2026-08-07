import { useState, useEffect} from "react";
import { Input, initTWE } from "tw-elements";

export default function useInputTWE() {
  useEffect(componentDidMount, []);

  function componentDidMount() {
    initTWE({ Input });
  }
}