/*
 * @Author: tohsaka888
 * @Date: 2022-10-08 08:25:48
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:59:08
 * @Description: 请填写简介
 */
import { NodeProps } from "../../../KnowledgeGraph";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "utils/server/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NodeProps[]>
) {
  try {
    const db = await connectDB();
    const id = req.query.id as string;
    if (db) {
      const collection = await db.collection("Outside-Nodes");
      const nodes = await collection
        .find<NodeProps>({ parentId: id })
        .toArray();
      res.status(200).send(nodes);
    }
  } catch (error) {
    console.log(error);
    res.status(200).send([]);
  }
}
