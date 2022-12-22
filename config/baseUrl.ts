/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 13:03:20
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 13:03:20
 * @Description: baseUrl
 */

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? `http://localhost:3000`
    : `https://react-knowledge-graph.vercel.app`;
