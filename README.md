# React-Knowledge-Graph

English | [简体中文](/README_zh.md)

[![CodeFactor](https://www.codefactor.io/repository/github/tohsaka888/react-knowledge-graph/badge?style=flat-square)](https://www.codefactor.io/repository/github/tohsaka888/react-knowledge-graph)
[![GitHub Release Date](https://img.shields.io/github/release-date/tohsaka888/react-knowledge-graph.svg?style=flat-square)](https://github.com/tohsaka888/react-knowledge-graph/releases)
[![npm package](https://img.shields.io/npm/v/react-knowledge-graph.svg?style=flat-square)](https://www.npmjs.org/package/react-knowledge-graph)
[![NPM downloads](http://img.shields.io/npm/dm/react-knowledge-graph.svg?style=flat-square)](https://npmjs.org/package/react-knowledge-graph)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/tohsaka888/react-knowledge-graph/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Introduction

a react component that can help you create a dynamic knowledge-graph built with `Next.js`.

## Features

- Customize node size/color/text color/text size
- Canvas drag and drop support
- Support asynchronous data acquisition / dynamic exploration to generate graphs
- Support for highlighting nodes and their associated edges when Hovering nodes
- Customize properties by node type 
- Option to hide edges when Hover edge is supported
- Hide explored nodes and edges when explored nodes are clicked
- Reset Canvas
- Fullscreen
- Right click to center the current entity
- Support server-side rendering
- Download the chart as a multi-format image (jpg, jpeg, png, bmp)
- Support drag and drop nodes
- Right-click entity menu adds only the current node i.e. its children/relationships
- Right-click menu display all nodes
- Dynamic configuration
- Configuration flying line effect
- Click the highlights of the same type of node highlight
- Node Menu
- display help memu
  - Display the current node information button: You can judge whether you need it according to the needs of your own project, such as: knowledge card function
  - Show the increase node to the physical button: you can determine whether it is required according to the needs of your own project, for example: the current node is added to the knowledge application
- two way to optimize dragging performance: use `react` or use `dom`
- and so on
## Accepted data structures

### Nodes

```typescript
type NodeProps = {
  id: string;
  name: string; // 节点名称
  type: string; // 节点类型
  hasMore: boolean; // 是否有子节点
  direction: "root" | "inside" | "outside";
};
```

### Edges

```typescript
type EdgeProps = {
  id: string; // 边id
  fromId: string;
  toId: string;
  description: string;
};
```

### Explore Function

> Need to accept an asynchronous function, this library will return the parameter `id - Node Id`, `node - current node`
> Need to return `inside` in edge node, `outside` out edge node, `edge` array of edges

```typescript
type explore = (id: React.Key) => Promise<{
  inside: Node.NodeProps[];
  outside: Node.NodeProps[];
  edge: Edge.EdgeProps[];
}>;
```


## install

```bash
npm install react-knowledge-graph
# or
yarn add react-knowledge-graph
```

## Usage

import style files in the top file:

```tsx
import "react-knowledge-graph/KnowledgeGraph/index.css";
```

Next:

```tsx
<KnowledgeGraph
  explore={explore}
  basicDistence={width}
  position={{ x: 100, y: 100 }}
  node={{
    id: "node-0",
    type: "根节点",
    hasMore: true,
    direction: "root",
    name: "根节点",
  }}
  onExploreEnd={() => {
    message.info("已经到尾节点了!");
  }}
  edgeConfig={{
    hoveredColor: "#e27272",
    stroke: "#DEDEDE",
    strokeWidth: 1,
  }}
  typeConfig={{
    根节点: {
      radius: 20,
      fill: "#747ba6",
      hoverStyle: {
        fill: "#3949a3",
      },
    },
    model: {
      radius: 15,
      fill: "#b4e5a2",
      typeSize: 8,
      nameSize: 8,
      hoverStyle: {
        fill: "#6be73e",
      },
    },
    data: {
      radius: 15,
      fill: "#ea52ea",
      typeSize: 8,
      nameSize: 8,
      hoverStyle: {
        fill: "#e5a2e5",
      },
    },
    test: {
      radius: 13,
      fill: "#89c4fb",
      typeSize: 8,
      nameSize: 8,
      hoverStyle: {
        fill: "#2f8fe8",
      },
    },
  }}
/>
```

### Demo

[click to show the Demo](https://react-knowledge-graph.vercel.app/)
