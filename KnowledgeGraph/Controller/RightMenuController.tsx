import React, { useState, createContext, useContext } from "react";

type Props = {
  children: React.ReactNode;
};

const RightMenuEventContext = createContext<React.MouseEvent<
  SVGSVGElement,
  MouseEvent
> | null>(null);

const RightMenuDispatchEventContext = createContext<React.Dispatch<
  React.SetStateAction<React.MouseEvent<SVGSVGElement, MouseEvent> | null>
> | null>(null);

function RightMenuController({ children }: Props) {
  const [event, setEvent] = useState<React.MouseEvent<
    SVGSVGElement,
    MouseEvent
  > | null>(null);
  return (
    <RightMenuEventContext.Provider value={event}>
      <RightMenuDispatchEventContext.Provider value={setEvent}>
        {children}
      </RightMenuDispatchEventContext.Provider>
    </RightMenuEventContext.Provider>
  );
}

export const useRightMenuEvent = () => {
  const event = useContext(RightMenuEventContext)!;
  return event;
};

export const useRightMenuEventDispatch = () => {
  const setEvent = useContext(RightMenuDispatchEventContext)!;
  return setEvent;
};

export default RightMenuController;
