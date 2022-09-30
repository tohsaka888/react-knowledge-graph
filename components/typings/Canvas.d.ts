/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:24:39
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 09:26:42
 * @Description: Canvas Type
 */

declare namespace Canvas {
  type ConfigProps = {
    scale: 1; // 画布缩放倍数 (0, Infinity]
    dx: number; // 画布移动x偏移
    dy: number; // 画布移动y偏移
  };
}
