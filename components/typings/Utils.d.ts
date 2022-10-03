declare namespace Utils {
  type CalcQuadrantProps = {
    node: Node.NodeFrontProps;
    parentNode: Node.NodeFrontProps;
  };

  type CalcFlagProps = {
    fromNode: Node.NodeFrontProps;
    toNode: Node.NodeFrontProps;
    parentNode: Node.NodeFrontProps;
  };

  type CalcQuadrantFunc = (
    props: CalcQuadrantProps
  ) => "第一象限" | "第二象限" | "第三象限" | "第四象限";

  type CalcFlagFunc = (Props: CalcFlagProps) => 1 | -1;
}
