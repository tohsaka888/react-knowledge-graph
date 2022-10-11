/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 09:24:39
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:33:29
 * @Description: Canvas Type
 */

type RightMenuProps = {
  event: React.MouseEvent<SVGSVGElement, MouseEvent> | null;
  setEvent: React.Dispatch<
    React.SetStateAction<React.MouseEvent<SVGSVGElement, MouseEvent> | null>
  >;
};

export type { RightMenuProps }