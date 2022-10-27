import React, { useMemo } from "react";
import { useAppSelector } from "..";

function useIsShowText() {
  const scaleSize = useAppSelector((state) => state.canvasConfig.scale);

  const isShowText = useMemo(() => {
    if (scaleSize < 0.5) {
      return false;
    } else {
      return true;
    }
  }, [scaleSize]);

  return isShowText;
}

export default useIsShowText;
