import React, { useState } from "react";

type isNodeDragContextProps = {
  isNodeDrag: boolean;
  setIsNodeDrag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const IsNodeDragContext = React.createContext<isNodeDragContextProps | null>(
  null
);

type Props = {
  children: React.ReactNode;
};

function IsNodeDragController({ children }: Props) {
  const [isNodeDrag, setIsNodeDrag] = useState<boolean>(false);

  return (
    <IsNodeDragContext.Provider value={{ isNodeDrag, setIsNodeDrag }}>
      {children}
    </IsNodeDragContext.Provider>
  );
}

export default IsNodeDragController;
