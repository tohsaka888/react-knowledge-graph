/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 11:59:36
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:10:15
 * @Description: 计算距离
 */

import { ConfigContext } from "../../context";
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
      return basicDistence + basicDistence * 0.1 * (30 / deg) * length;
    },
    [config.basicDistence]
  );

  return { calcDistence };
}

export default useCalcDistence;