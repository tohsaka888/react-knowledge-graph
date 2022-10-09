import { NodeFrontProps } from "./Node";

type CalcQuadrantProps = {
  node: NodeFrontProps;
  parentNode: NodeFrontProps;
};

type CalcFlagProps = {
  fromNode: NodeFrontProps;
  toNode: NodeFrontProps;
  parentNode: NodeFrontProps;
};

type CalcQuadrantFunc = (
  props: CalcQuadrantProps
) => "第一象限" | "第二象限" | "第三象限" | "第四象限";

type CalcFlagFunc = (Props: CalcFlagProps) => 1 | -1;

export type {
  CalcFlagProps,
  CalcFlagFunc,
  CalcQuadrantProps,
  CalcQuadrantFunc,
};
