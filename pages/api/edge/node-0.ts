/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 13:10:55
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 16:38:06
 * @Description: 1
 */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Edge.EdgeProps[]>
) {
  res.status(200).json([
    {
      id: "edge-0-1",
      description: "测试节点-0-1",
      toId: "node-0-1",
      fromId: "node-0",
    },
    {
      id: "edge-0-2",
      description: "测试节点-0-2",
      toId: "node-0-2",
      fromId: "node-0",
    },
    {
      id: "edge-0-3",
      description: "测试节点-0-3",
      toId: "node-0-3",
      fromId: "node-0",
    },
    {
      id: "edge-0-4",
      description: "测试节点-0-4",
      toId: "node-0-4",
      fromId: "node-0",
    },
    {
      id: "edge-0-5",
      description: "测试节点-0-5",
      toId: "node-0-5",
      fromId: "node-0",
    },
    {
      id: "edge-0-6",
      description: "测试节点-0-6",
      toId: "node-0-6",
      fromId: "node-0",
    },
    {
      id: "edge-1-1",
      description: "测试节点-1-1",
      fromId: "node-1-1",
      toId: "node-0",
    },
    {
      id: "edge-1-2",
      description: "测试节点-1-2",
      fromId: "node-1-2",
      toId: "node-0",
    },
    {
      id: "edge-1-3",
      description: "测试节点-1-3",
      fromId: "node-1-3",
      toId: "node-0",
    },
  ]);
}
