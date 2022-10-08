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

- 定义节点大小/颜色/文字颜色/文字大小 - 实现
- 支持画布拖拽/缩放 - 实现
- 支持异步获取数据/动态探索生成图 - 实现
- 支持 Hover 节点时高亮节点及与其有关联的边 - 实现
- 高度可定制属性 - 实现
- 支持 Hover 边时可选择隐藏边 - 实现
- 已探索节点点击后隐藏已经探索的节点和边 - 实现
- 复位画布 - 实现
- 全屏 - 实现
- 右键当前实体居中- 实现

## 待定实现的功能

- 拖拽节点
- 下载图
- `Shift + 左键`多选节点拖拽
- 重绘图

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
type explore = (
  id: React.Key
) => Promise<{
  inside: Node.NodeProps[];
  outside: Node.NodeProps[];
  edge: Edge.EdgeProps[];
}>;
```

## 使用

待补充
