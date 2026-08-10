import { Modal, Ripple, initTWE } from "tw-elements";
import { useEffect } from "react";

export default function useNovusModalTWE() {
  //Initialize TW Elements when the component loads
  useEffect(componentDidMount, []);

  // This function runs when the component mounts.
  function componentDidMount() {
    initTWE({ Modal, Ripple });
  }
}
//Note : I created a custom hook called useNovusModalTWE to keep my TW 
// Elements modal setup separate from my components. I use
//  useEffect with an empty dependency list so componentDidMount 
// runs when the component loads. The function initializes the TW 
// Elements Modal and Ripple components.
