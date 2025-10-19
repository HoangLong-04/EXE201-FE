import React, { useEffect } from 'react'

function TawkMessenger() {
  useEffect(() => {
    const s1 = document.createElement("script");
    s1.src = "https://embed.tawk.to/68f497e20524d4194f5338b3/1j7tn2jd2";
    s1.async = true;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    document.body.appendChild(s1);

    return () => {
      document.body.removeChild(s1);
    };
  }, []);

  return null;
};

export default TawkMessenger