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
  const id = "node-0-1"
  res.status(200).json([
    {
      id: "edge-0-1-1",
      description: "测试节点-0-1",
      toId: id + "-1",
      fromId: id,
    },
    {
      id: "edge-0-2-2",
      description: "测试节点-0-2",
      toId: id + "-2",
      fromId: id,
    },
    {
      id: "edge-0-3-3",
      description: "测试节点-0-3",
      toId: id + "-3",
      fromId: id,
    },
    {
      id: "edge-0-4-4",
      description: "测试节点-0-4",
      toId: id + "-4",
      fromId: id,
    },
    {
      id: "edge-0-5-5",
      description: "测试节点-0-5",
      toId: id + "-5",
      fromId: id,
    },
    {
      id: "edge-0-6-6",
      description: "测试节点-0-6",
      toId: id + "-6",
      fromId: id,
    },
    {
      id: "edge-0-7-7",
      description: "测试节点-0-7",
      toId: id + "-1",
      fromId: 'node-0',
    },
  ]);
}
