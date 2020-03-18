import { useEffect, useRef } from "react";

/**
 * React hook to maintain the previous version of a value
 * Taken from https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 * @param {*} value
 */
export default function usePrevious(value) {
  const ref = useRef();

  // Not using shorthand without curly braces to prevent automatic return.
  // React will complain when returning anything other than a clean up function from an effect.
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
