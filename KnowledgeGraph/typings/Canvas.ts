/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:24:39
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:33:29
 * @Description: Canvas Type
 */

type CanvasConfigProps = {
  scale: 1; // 画布缩放倍数 (0, Infinity]
  dx: number; // 画布移动x偏移
  dy: number; // 画布移动y偏移
};

type RightMenuProps = {
  event: React.MouseEvent<SVGSVGElement, MouseEvent> | null;
  setEvent: React.Dispatch<
    React.SetStateAction<React.MouseEvent<SVGSVGElement, MouseEvent> | null>
  >;
};

export type { CanvasConfigProps, RightMenuProps }