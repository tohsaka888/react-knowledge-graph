import { clientPromise } from "./clientPromise";

const dbName = process.env.DBNAME as string;

export const connectDB = async () => {
  const connection = await clientPromise;
  return connection.db(dbName);
};
