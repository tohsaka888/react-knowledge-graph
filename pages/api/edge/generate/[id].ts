import type { NextApiRequest, NextApiResponse } from "next";
import { createEdgeFakeData } from "../../../../utils/client/createEdgeFakeData";
import { connectDB } from "../../../../utils/server/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await connectDB();
    const id = req.query.id as string;
    const insideLength = req.query.insideLength as string;
    const outsideLength = req.query.outsideLength as string;

    const collection = await db.collection("Edges");
    const lastData = await collection
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    const lastEdgeId = +lastData[0].id.split("-")[1];
    const insdieEdgeFakeData = createEdgeFakeData({
      rootId: id,
      direction: "inside",
      length: +insideLength,
      edgeLastId: lastEdgeId,
    });
    const outsideEdgeFakeData = createEdgeFakeData({
      rootId: id,
      direction: "outside",
      length: +outsideLength,
      edgeLastId: lastEdgeId + +insideLength,
    });
    collection.insertMany([...insdieEdgeFakeData, ...outsideEdgeFakeData])
    if (db) {
      res
        .status(200)
        .send({
          insideEdges: insdieEdgeFakeData,
          outsideEdges: outsideEdgeFakeData,
        });
    }
  } catch (error) {
    res.status(200).send([]);
  }
}
