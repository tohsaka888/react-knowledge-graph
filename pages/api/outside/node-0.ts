/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 13:10:55
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 13:17:55
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
      id: "node-1-1",
      name: "测试节点-1-1",
      type: "phone",
      hasMore: true,
      direction: "inside",
    },
    {
      id: "node-1-2",
      name: "测试节点-1-2",
      type: "phone",
      hasMore: true,
      direction: "inside",
    },
    {
      id: "node-1-3",
      name: "测试节点-1-3",
      type: "phone",
      hasMore: true,
      direction: "inside",
    },
  ]);
}
