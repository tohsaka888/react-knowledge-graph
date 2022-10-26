import React, { createContext, useContext, useState } from "react";

export const FullScreenContext = createContext<boolean | null>(null);
export const FullScreenDispatchContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

function FullScreenController({ children }: { children: React.ReactNode }) {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  return (
    <FullScreenContext.Provider value={isFullScreen}>
      <FullScreenDispatchContext.Provider value={setIsFullScreen}>
        {children}
      </FullScreenDispatchContext.Provider>
    </FullScreenContext.Provider>
  );
}

export const useFullScreen = () => {
  const isFullScreen = useContext(FullScreenContext)!;
  return isFullScreen;
};

export const useDispatchFullScreen = () => {
  const dispatchFullScreen = useContext(FullScreenDispatchContext)!;
  return dispatchFullScreen;
};

export default FullScreenController;
