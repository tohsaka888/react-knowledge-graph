import { EdgeProps } from "../../KnowledgeGraph";

type Props = {
  direction: "inside" | "outside";
  length: number;
  rootId: string;
  edgeLastId: number;
};

type CreateEdgeFakeDataFunc = ({
  direction,
  length,
  rootId,
  edgeLastId,
}: Props) => EdgeProps[];

export const createEdgeFakeData: CreateEdgeFakeDataFunc = ({
  direction,
  length,
  rootId,
  edgeLastId,
}) => {
  const edges: EdgeProps[] = [];
  for (let i = 0; i < length; i++) {
    edges.push({
      id: "edge-" + (edgeLastId + i + 1),
      fromId: direction === "outside" ? rootId : rootId + "-0" + (i + 1),
      toId: direction === "inside" ? rootId : rootId + "-1" + (i + 1),
      description: "description",
    });
  }
  return edges;
};
