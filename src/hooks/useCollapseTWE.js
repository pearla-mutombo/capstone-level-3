import { useState, useEffect } from "react";
import { Collapse, initTWE } from "tw-elements";

export default function useCollapseTWE() {
 useEffect(componentDidMount, []);

 function componentDidMount() {
  initTWE({ Collapse });
 }
}