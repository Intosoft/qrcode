import { useState } from "react";

import { useEffect } from "react";

interface WindowDimension {
  width: number;
  height: number;
}

function useWindowDimension(): WindowDimension {
  const [windowDimension, setWindowDimension] = useState<WindowDimension>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowDimension;
}

export default useWindowDimension;
