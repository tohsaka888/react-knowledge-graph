import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "utils/server/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Edge.EdgeProps[]>
) {
  try {
    const db = await connectDB();
    const id = req.query.id as string;
    if (db) {
      const collection = await db.collection("Edges");
      const toEdges = await collection
        .find<Edge.EdgeProps>({ fromId: id })
        .toArray();
      const fromEdges = await collection
        .find<Edge.EdgeProps>({ toId: id })
        .toArray();
      res.status(200).send([...fromEdges, ...toEdges]);
    }
  } catch (error) {
    res.status(200).send([]);
  }
}
