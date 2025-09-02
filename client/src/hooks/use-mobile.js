import * as React from "react"

// Define a constant for the mobile breakpoint.
const MOBILE_BREAKPOINT = 768

/**
 * A custom React hook to determine if the current viewport is mobile-sized.
 * It's reactive, updating the state whenever the window is resized across the breakpoint.
 * @returns {boolean} True if the viewport width is less than the mobile breakpoint, otherwise false.
 */
export function useIsMobile() {
  // Use a state variable to store the mobile status.
  // We initialize it as undefined to ensure the first render correctly
  // checks the viewport size.
  const [isMobile, setIsMobile] = React.useState(undefined)

  React.useEffect(() => {
    // Create a media query list that listens for changes to the viewport width.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Define the change handler function.
    const onChange = () => {
      // Update the state based on the current window width.
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Add the event listener for the media query list.
    mql.addEventListener("change", onChange)

    // Set the initial state on component mount.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Clean up the event listener when the component unmounts.
    return () => mql.removeEventListener("change", onChange)
  }, []) // The empty dependency array ensures this effect runs only once.

  // The '!!' operator converts 'undefined' or 'null' to 'false', and a boolean to itself.
  return !!isMobile
}
