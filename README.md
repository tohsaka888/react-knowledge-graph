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
- 支持画布拖拽/缩放
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

## 待定实现的功能

- 拖拽节点 (下个版本支持)
- `Shift + 左键`多选节点拖拽 (出于性能问题暂不支持)
- 重绘图 (暂不支持)

## 接受的数据结构

### 点

```typescript
type NodeProps = {
  id: React.Key;
  name: string; // 节点名称
  type: string; // 节点类型
  hasMore: boolean; // 是否有子节点
  direction: "root" | "inside" | "outside";
};
```

### 边

```typescript
type EdgeProps = {
  id: React.Key; // 边id
  fromId: React.Key;
  toId: React.Key;
  description: string;
};
```

### 探索函数

> 需要接受一个异步函数,本库会返回参数 `id - 节点Id`
>
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
const Home = () => {
  const getNode = async (id: Key, direction: "inside" | "outside") => {
    const res = await fetch(`${baseUrl}/api/${direction}/${id}`);
    const data = await res.json();
    return data;
  };

  const getEdge = async (id: Key) => {
    const res = await fetch(`${baseUrl}/api/edge/${id}`);
    const data = await res.json();
    return data;
  };

  const explore = async (id: Key) => {
    const inside = await getNode(id, "inside");
    const outside = await getNode(id, "outside");
    const edges = await getEdge(id);

    return {
      edges,
      inside,
      outside,
    };
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        border: "1px solid #cecece",
        overflow: "hidden",
      }}
    >
      <KnowledgeGraph
        // 探索函数
        explore={explore}
        // 基础半径
        basicDistence={38}
        // 根节点位置
        position={{ x: 100, y: 100 }}
        // 根节点数据结构
        node={{
          id: "node-0",
          type: "根节点",
          hasMore: true,
          direction: "root",
          name: "根节点",
        }}
        // 探索结束事件
        onExploreEnd={() => {
          message.info("已经到尾节点了!");
        }}
        // 边配置
        edgeConfig={{
          hoveredColor: "#ff0000",
        }}
        // 节点配置 (类型)
        typeConfig={{
          根节点: {
            radius: 23,
            fill: "#404d95",
            hoverStyle: {
              fill: "#1429a0",
            },
          },
          model: {
            radius: 20,
            fill: "#b4e5a2",
            hoverStyle: {
              fill: "#6be73e",
            },
          },
          test: {
            radius: 18,
            fill: "#89c4fb",
            hoverStyle: {
              fill: "#2f8fe8",
            },
          },
        }}
      />
    </div>
  );
};

export default Home;
```

### 入参说明

待补充

