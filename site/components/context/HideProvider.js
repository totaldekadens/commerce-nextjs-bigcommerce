import React, { useEffect, useRef } from "react";
import { useState } from "react";

export const hideContext = React.createContext({
  hide: false,
  setHide: () => {},
});
// Sets hide to true if scroll down and false when scroll up
const HideProvider = (props) => {
  const [scrollY, setScrollY] = useState(0);
  const [hide, setHide] = useState(false);
  const [hideUSP, setHideUSP] = useState(false);

  // Refs
  const valueRef = useRef();
  valueRef.current = scrollY;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  const handleScroll = () => {
    setScrollY(window.scrollY);
    let previousScrollY = valueRef.current;

    if (window.scrollY > 40) {
      setHideUSP(true);
      if (previousScrollY > window.scrollY) {
        setHide(false);
      } else {
        setHide(true);
      }
    } else {
      setHideUSP(false);
      setHide(false);
    }
  };

  return (
    <hideContext.Provider
      value={{ hide, setHide, hideUSP, setHideUSP, scrollY }}
    >
      {props.children}
    </hideContext.Provider>
  );
};

export default HideProvider;
