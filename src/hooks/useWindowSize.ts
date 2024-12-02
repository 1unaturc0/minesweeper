import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState([0, 0]);

  useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);

    window.addEventListener("resize", () =>
      setWindowSize([window.innerWidth, window.innerHeight]),
    );
  }, []);

  return windowSize;
};
