/*
 * @Author: tohsaka888
 * @Date: 2022-10-08 08:25:48
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 14:56:29
 * @Description: 请填写简介
 */
import { EdgeProps } from "../../../KnowledgeGraph";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "utils/server/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EdgeProps[]>
) {
  try {
    const db = await connectDB();
    const id = req.query.id as string;
    if (db) {
      const collection = await db.collection("Edges");
      const toEdges = await collection
        .find<EdgeProps>({ fromId: id })
        .toArray();
      const fromEdges = await collection
        .find<EdgeProps>({ toId: id })
        .toArray();
      res.status(200).send([...fromEdges, ...toEdges]);
    }
  } catch (error) {
    res.status(200).send([]);
  }
}
