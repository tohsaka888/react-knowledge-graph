import { RightMenuPropsContext } from "../context";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

function RightMenuController({ children }: Props) {
  const [event, setEvent] = useState<React.MouseEvent<
    SVGSVGElement,
    MouseEvent
  > | null>(null);
  return (
    <RightMenuPropsContext.Provider value={{ event, setEvent }}>
      {children}
    </RightMenuPropsContext.Provider>
  );
}

export default RightMenuController;
