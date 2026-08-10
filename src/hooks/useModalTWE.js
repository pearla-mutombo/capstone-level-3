import { Modal, Ripple, initTWE } from "tw-elements";
import { useState, useEffect } from "react";

export default function useModalTWE() {
  useEffect(componentDidMount, []);

  function componentDidMount() {
    initTWE({ Modal, Ripple });
  }
}
