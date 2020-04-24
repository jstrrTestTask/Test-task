import { useEffect } from "react";
//or use ClickAwayListener/react-click-outside
export const ESCAPE = "Escape";

export const useClickOutside = (ref, shouldAddEvent, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (ref.current && !ref.current.contains(event.target)) ||
        event.key === ESCAPE
      ) {
        callback();
      }
    };

    if (shouldAddEvent) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keyup", handleClickOutside, false);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keyup", handleClickOutside);
    };
  }, [ref, shouldAddEvent, callback]);
};
