import type { NextApiRequest, NextApiResponse } from "next";
import { createEdgeFakeData } from "utils/client/createEdgeFakeData";
import { createNodeFakeData } from "utils/client/createNodeFakeData";
import { connectDB } from "utils/server/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await connectDB();
    // collection.insertMany([...insdieEdgeFakeData, ...outsideEdgeFakeData])
    if (db) {
      const id = req.query.id as string;
      const insideLength = req.query.insideLength as string;
      const outsideLength = req.query.outsideLength as string;

      const insideCollection = await db.collection("Inside-Nodes");
      const outsideCollection = await db.collection("Outside-Nodes");
      const insideNodes = createNodeFakeData({
        direction: "inside",
        length: +insideLength,
        rootId: id,
      });
      const outsideNodes = createNodeFakeData({
        direction: "outside",
        length: +outsideLength,
        rootId: id,
      });
      if (insideLength) {
        insideCollection.insertMany([...insideNodes]);
      }
      if (outsideLength) {
        outsideCollection.insertMany([...outsideNodes]);
      }
      res.status(200).send({ insideNodes, outsideNodes });
    }
  } catch (error) {
    res.status(200).send([]);
  }
}
