import { NodeProps } from "../../KnowledgeGraph";

type Props = {
  direction: "inside" | "outside";
  length: number;
  rootId: string;
};

type CreateNodeFakeDataFunc = ({
  direction,
  length,
  rootId,
}: Props) => (NodeProps & { parentId: string })[];

export const createNodeFakeData: CreateNodeFakeDataFunc = ({
  direction,
  length,
  rootId,
}) => {
  const nodes: (NodeProps & { parentId: string })[] = [];

  for (let i = 0; i < length; i++) {
    const random = Math.random();
    let type = "";
    if (random >= 0 && random < 0.3) {
      type = "test";
    } else if (random >= 0.3 && random < 0.6) {
      type = "model";
    } else {
      type = "data";
    }
    nodes.push({
      id: direction === 'inside' ? rootId + "-0" + (i + 1) : rootId + "-1" + (i + 1),
      type,
      name: "测试节点",
      hasMore: true,
      direction,
      parentId: rootId,
    });
  }
  return nodes;
};
