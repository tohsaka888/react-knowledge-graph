import { createSlice, Slice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NodeFrontProps } from "../typings/Node";
import { ConfigProps } from "../typings/Config";
import { EdgeFrontProps, EdgeProps } from "../typings/Edge";

const initialState: { nodes: NodeFrontProps[]; edges: EdgeFrontProps[] } = {
  nodes: [],
  edges: [],
};

type ExploredGraphProps = {
  node: NodeFrontProps;
  inside: NodeFrontProps[];
  outside: NodeFrontProps[];
  edges: EdgeProps[];
};

type SetNodePositionProps = {
  node: NodeFrontProps;
  dx: number;
  dy: number;
};

export const graphSlice: Slice<typeof initialState> = createSlice({
  name: "graph",
  initialState,
  reducers: {
    /**
     * 初始化知识图谱
     * @date 2022-10-14
     * @param {any} state
     * @param {any} action:PayloadAction<Pick<ConfigProps
     * @param {any} "node"|"position">>
     * @returns {any}
     */
    initialize: (
      state,
      action: PayloadAction<Pick<ConfigProps, "node" | "position">>
    ) => {
      state.nodes.push({
        ...action.payload.node,
        position: action.payload.position,
        pId: [],
        isExplore: false,
        angle: 0,
        distence: 0,
        visible: true,
      });
    },
    /**
     * 探索
     * @date 2022-10-14
     * @param {any} state
     * @param {any} action:PayloadAction<ExploredGraphProps>
     * @returns {any}
     */
    graphExplore(state, action: PayloadAction<ExploredGraphProps>) {
      const inside = action.payload.inside;
      const outside = action.payload.outside;
      const node = action.payload.node;
      const edges = action.payload.edges;
      const preNodes = state.nodes.slice();

      state.nodes = [...state.nodes, ...inside, ...outside];

      // 去重
      const filteredEdges = edges.filter(
        (edge) => !state.edges.find((preEdge) => preEdge.id === edge.id)
      );

      const frontEdges = filteredEdges
        .map((edge) => {
          const fromNode = state.nodes.find((n) => n.id == edge.fromId);
          const toNode = state.nodes.find((n) => n.id === edge.toId);
          return {
            ...edge,
            type:
              (node.id === edge.fromId &&
                !preNodes.find(
                  (n) => n.id === edge.toId && n.id !== node.id
                )) ||
              (node.id === edge.toId &&
                !preNodes.find((n) => n.id === edge.fromId && n.id !== node.id))
                ? ("straight" as "straight")
                : ("curve" as "curve"),
            pId: [...(fromNode?.pId || []), ...(toNode?.pId || [])],
            fromNode,
            toNode,
            visible: true,
          };
        })
        .filter(
          (edge) =>
            !(edge.fromId === node.id && edge.toId === node.parentNode?.id) &&
            !(edge.toId === node.id && edge.fromId === node.parentNode?.id)
        );
      state.edges = [...state.edges, ...frontEdges];
    },
    /**
     * 显示所有节点
     * @date 2022-10-14
     * @param {any} state
     * @returns {any}
     */
    showAllNodes: (state, payload: PayloadAction<void>) => {
      state.nodes.forEach((node) => {
        node.visible = true;
      });
      state.edges.forEach((edge) => {
        edge.visible = true;
      });
    },
    /**
     * 仅显示当前节点及其子节点/关系
     * @date 2022-10-14
     * @param {any} state
     * @param {any} action:PayloadAction<NodeFrontProps>
     * @returns {any}
     */
    onlyShowCurrentNodeAndChildren: (
      state,
      action: PayloadAction<NodeFrontProps>
    ) => {
      state.nodes.forEach((node) => {
        if (
          node.id === action.payload.id ||
          node.pId.find((pId) => pId === action.payload.id)
        ) {
          node.visible = true;
        } else {
          node.visible = false;
        }
      });
      state.edges.forEach((edge) => {
        const availableNodes = state.nodes.filter((n) => n.visible);
        const fromNode = availableNodes.find((n) => n.id === edge.fromId);
        const toNode = availableNodes.find((n) => n.id === edge.toId);

        if (fromNode && toNode) {
          edge.visible = true;
        } else {
          edge.visible = false;
        }
      });
    },
    /**
     * 取消探索
     * @date 2022-10-14
     * @param {any} state
     * @param {any} action:PayloadAction<NodeFrontProps>
     * @returns {any}
     */
    cancelGraphExplore(state, action: PayloadAction<NodeFrontProps>) {
      const currentNode = action.payload;
      state.nodes = state.nodes.filter(
        (n) => !n.pId.find((pId) => pId === currentNode.id)
      );
      state.edges = state.edges.filter(
        (edge) =>
          state.nodes.find((node) => node.id === edge.fromId) &&
          state.nodes.find((node) => node.id === edge.toId)
      );
    },
    /**
     * 移动节点/边
     * @date 2022-10-14
     * @param {any} state
     * @param {any} action:PayloadAction<SetNodePositionProps>
     * @returns {any}
     */
    moveNodeAndEdge(state, action: PayloadAction<SetNodePositionProps>) {
      const node = action.payload.node;
      const dx = action.payload.dx;
      const dy = action.payload.dy;

      const n = state.nodes.find((n) => n.id === node.id);

      if (n) {
        n.position.x += dx;
        n.position.y += dy;
      }

      state.edges.forEach((edge) => {
        if (edge.fromId === node.id) {
          if (edge.fromNode) {
            edge.fromNode.position.x += dx;
            edge.fromNode.position.y += dy;
            edge.visible = true;
          }
        } else if (edge.toId === node.id) {
          if (edge.toNode) {
            edge.toNode.position.x += dx;
            edge.toNode.position.y += dy;
            edge.visible = true;
          }
        }
      });
    },
    /**
     * 更改探索状态
     * @date 2022-10-14
     * @param {any} state
     * @param {any} action:PayloadAction<NodeFrontProps>
     * @returns {any}
     */
    changeExploreState(state, action: PayloadAction<NodeFrontProps>) {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.isExplore = !node.isExplore;
      }
    },
    /**
     * 拖动开始事件
     * @date 2022-10-14
     * @param {any} state
     * @param {any} action:PayloadAction<NodeFrontProps>
     * @returns {any}
     */
    onDragStart(state, action: PayloadAction<NodeFrontProps>) {
      const node = action.payload;
      state.edges.forEach((edge) => {
        if (edge.fromId === node.id || edge.toId === node.id) {
          edge.visible = false;
        }
      });
    },
  },
});

export const {
  initialize,
  graphExplore,
  cancelGraphExplore,
  onlyShowCurrentNodeAndChildren,
  moveNodeAndEdge,
  changeExploreState,
  onDragStart,
  showAllNodes,
} = graphSlice.actions;
export default graphSlice.reducer;
