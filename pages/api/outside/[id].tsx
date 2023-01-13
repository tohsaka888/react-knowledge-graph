import { NodeProps } from "../../../KnowledgeGraph";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../utils/server/connectDB";
import { runMiddleware } from "../../../utils/server/runMiddleware";
import Cors from "cors";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
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
