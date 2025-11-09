import { useEffect } from "react";

function RedirectHome() {
  useEffect(() => {
    window.location.href = `${window.location.origin}/`;
  }, []);
  return null;
}

export default RedirectHome;
