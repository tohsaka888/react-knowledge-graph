<!--
 * @Author: tohsaka888
 * @Date: 2022-10-08 08:25:48
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-08 16:13:04
 * @Description: 请填写简介
-->

devThis is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 简介

基于 `Next.js`实现通用知识图谱组件。

## 功能

- 定义节点大小/颜色/文字颜色/文字大小
- 支持画布拖拽
- 支持异步获取数据/动态探索生成图
- 支持 Hover 节点时高亮节点及与其有关联的边
- 根据节点类型定制属性
- 支持 Hover 边时可选择隐藏边
- 已探索节点点击后隐藏已经探索的节点和边
- 复位画布
- 全屏
- 右键当前实体居中
- 支持服务端渲染
- 下载图谱为多种格式图片 (jpg, jpeg, png, bmp)
- 支持拖拽节点
- 右键实体菜单新增只显示当前节点即其子节点/关系
- 右键菜单显示所有节点
- 动态配置
- 节点菜单
  - 显示当前节点信息按钮: 可以根据自己项目的需求判断是否需要, 比如: 知识卡片功能
  - 显示增加节点至实体按钮: 可以根据自己项目的需求判断是否需要, 比如: 当前节点加入知识应用

## 接受的数据结构

### 点

```typescript
type NodeProps = {
  id: string;
  name: string; // 节点名称
  type: string; // 节点类型
  hasMore: boolean; // 是否有子节点
  direction: "root" | "inside" | "outside";
};
```

### 边

```typescript
type EdgeProps = {
  id: string; // 边id
  fromId: string;
  toId: string;
  description: string;
};
```

### 探索函数

> 需要接受一个异步函数,本库会返回参数 `id - 节点Id`
> 需要返回 `inside`入边节点,`outside`出边节点,`edge`边集合

```typescript
type explore = (id: React.Key) => Promise<{
  inside: Node.NodeProps[];
  outside: Node.NodeProps[];
  edge: Edge.EdgeProps[];
}>;
```

## 使用

### 安装

```bash
npm install react-knowledge-graph
# or
yarn add react-knowledge-graph
```

### 使用

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

[点击查看 Demo](https://knowledge-graph-demo.netlify.app/)
