import React, { createContext, useState } from "react";

type FullScreenContextProps = {
  isFullScreen: boolean;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FullScreenContext = createContext<FullScreenContextProps | null>(
  null
);

function FullScreenController({ children }: { children: React.ReactNode }) {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  return (
    <FullScreenContext.Provider value={{ isFullScreen, setIsFullScreen }}>
      {children}
    </FullScreenContext.Provider>
  );
}

export default FullScreenController;
