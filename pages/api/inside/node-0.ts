/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 13:10:55
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 13:32:04
 * @Description: 1
 */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Node.NodeProps[]>
) {
  res.status(200).json([
    {
      id: "node-0-1",
      name: "测试节点-0-1",
      type: "node",
      hasMore: true,
      direction: "inside",
    },
    {
      id: "node-0-2",
      name: "测试节点-0-2",
      type: "node",
      hasMore: true,
      direction: "inside",
    },
    {
      id: "node-0-3",
      name: "测试节点-0-3",
      type: "node",
      hasMore: true,
      direction: "inside",
    },
    {
      id: "node-0-4",
      name: "测试节点-0-4",
      type: "test",
      hasMore: true,
      direction: "inside",
    },
    {
      id: "node-0-5",
      name: "测试节点-0-5",
      type: "test",
      hasMore: true,
      direction: "inside",
    },
    {
      id: "node-0-6",
      name: "测试节点-0-6",
      type: "test",
      hasMore: true,
      direction: "inside",
    },
  ]);
}
