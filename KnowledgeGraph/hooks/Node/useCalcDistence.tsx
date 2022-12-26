import { ConfigContext } from "../../Controller/ConfigController";
import React, { useCallback, useContext } from "react";

type Props = {
  deg: number;
  length: number;
};

function useCalcDistence() {
  const { config } = useContext(ConfigContext)!;

  const calcDistence = useCallback(
    ({ deg, length }: Props) => {
      const basicDistence = config.basicDistence;
      return (
        basicDistence +
        basicDistence * (0.5 / deg) +
        (length / 5) * basicDistence
      );
    },
    [config.basicDistence]
  );

  return { calcDistence };
}

export default useCalcDistence;
