import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "utils/server/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Node.NodeProps[]>
) {
  try {
    const db = await connectDB();
    const id = req.query.id as string;
    if (db) {
      const collection = await db.collection("Outside-Nodes");
      const nodes = await collection
        .find<Node.NodeProps>({ parentId: id })
        .toArray();
      res.status(200).send(nodes);
    }
  } catch (error) {
    console.log(error)
    res.status(200).send([]);
  }
}
