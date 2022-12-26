import { createSlice, Slice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NodeFrontProps } from "../typings/Node";
import { ConfigProps } from "../typings/Config";
import { EdgeFrontProps, EdgeProps } from "../typings/Edge";
import uniqBy from "lodash.uniqby";
import nodeTest from "node:test";

type GraphProps = { nodes: NodeFrontProps[]; edges: EdgeFrontProps[] };

const initialState: GraphProps = {
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
        isHovered: false,
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

      state.nodes = uniqBy([...state.nodes, ...inside, ...outside], "id");

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
            needHighlight: false,
            isMoving: false,
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
    /**
     * 过滤高亮边
     * @date 2022-10-18
     * @param {any} state
     * @param {any} action:PayloadAction<NodeFrontProps>
     * @returns {any}
     */
    filterHighlightEdges(state, action: PayloadAction<NodeFrontProps>) {
      const node = action.payload;
      state.edges.forEach((edge) => {
        if (edge.fromId === node.id || edge.toId === node.id) {
          edge.needHighlight = true;
        } else {
          edge.needHighlight = false;
        }
      });
    },
    /**
     * 取消高亮
     * @date 2022-10-18
     * @param {any} state
     * @returns {any}
     */
    notHighlight(state) {
      state.edges.forEach((edge) => {
        edge.needHighlight = false;
      });
    },
    /**
     * 节点移动事件
     * @date 2022-10-18
     * @param {any} state
     * @param {any} action:PayloadAction<NodeFrontProps>
     * @returns {any}
     */
    onMoving(state, action: PayloadAction<NodeFrontProps>) {
      const node = action.payload;
      state.edges.forEach((edge) => {
        if (edge.fromId === node.id || edge.toId === node.id) {
          edge.isMoving = true;
        } else {
          edge.isMoving = false;
        }
      });
    },
    /**
     * 移动结束
     * @date 2022-10-18
     * @param {any} state
     * @param {any} action:PayloadAction<undefined>
     * @returns {any}
     */
    onMoveEnd(state, action: PayloadAction<undefined>) {
      state.edges.forEach((edge) => {
        edge.isMoving = false;
      });
    },
    /**
     * 清空图
     * @date 2022-10-19
     * @param {any} state
     * @param {any} action:PayloadAction<undefined>
     * @returns {any}
     */
    clearAllGraph(state, action: PayloadAction<undefined>) {
      state.nodes = [];
      state.edges = [];
    },
    /**
     * 使用memoGraph
     * @date 2022-10-19
     * @param {any} state
     * @param {any} action:PayloadAction<GraphProps>
     * @returns {any}
     */
    initGraph(state, action: PayloadAction<GraphProps>) {
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
    },
    /**
     * 是否显示当前节点子节点和边
     * @date 2022-10-31
     * @param {any} state
     * @param {any} action:PayloadAction<{node:NodeFrontProps;visible:boolean}>
     * @returns {any}
     */
    isShowNodesAndEdges(
      state,
      action: PayloadAction<{ node: NodeFrontProps; visible: boolean }>
    ) {
      const currentNode = action.payload.node;
      const visible = action.payload.visible;
      state.nodes.forEach((n) => {
        if (
          n.pId.find((pId) => pId === currentNode.id) ||
          n.id === currentNode.id
        ) {
          n.visible = visible;
        }
      });
      state.edges.forEach((edge) => {
        if (
          edge.fromId === currentNode.id ||
          edge.toId === currentNode.id ||
          edge.pId.find((pId) => pId === currentNode.id)
        ) {
          edge.visible = visible;
        }
      });
    },
    setHoveredNodesAndEdges(
      state,
      { payload }: PayloadAction<{ nodes: NodeFrontProps[] }>
    ) {
      const nodes = payload.nodes;
      state.nodes
        .filter((n) => nodes.some((node) => node.id === n.id))
        .forEach((node) => {
          node.isHovered = !node.isHovered;
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
  filterHighlightEdges,
  notHighlight,
  onMoving,
  onMoveEnd,
  clearAllGraph,
  initGraph,
  isShowNodesAndEdges,
  setHoveredNodesAndEdges,
} = graphSlice.actions;
export default graphSlice.reducer;
