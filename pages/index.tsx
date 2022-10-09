/*
 * @Author: tohsaka888
 * @Date: 2022-10-08 08:25:48
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 15:05:15
 * @Description: 请填写简介
 */
import KnowledgeGraph from "KnowledgeGraph";
import { baseUrl } from "../config/baseUrl";
import type { NextPage } from "next";
import { Key } from "react";

const Home: NextPage = () => {
  const getNode = async (id: Key, direction: "inside" | "outside") => {
    const res = await fetch(`${baseUrl}/api/${direction}/${id}`);
    const data = await res.json();
    return data;
  };

  const getEdge = async (id: Key) => {
    const res = await fetch(`${baseUrl}/api/edge/${id}`);
    const data = await res.json();
    return data;
  };

  const explore = async (id: Key) => {
    const inside = await getNode(id, "inside");
    const outside = await getNode(id, "outside");
    const edges = await getEdge(id);

    return {
      edges,
      inside,
      outside,
    };
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        border: "1px solid #cecece",
        overflow: "hidden",
      }}
    >
      <KnowledgeGraph
        explore={explore}
        basicDistence={38}
        position={{ x: 100, y: 100 }}
        node={{
          id: "node-0",
          type: "根节点",
          hasMore: true,
          direction: "root",
          name: "根节点",
        }}
        edgeConfig={{
          // descriptionColor: "#000",
          // stroke: "#999999",
          // descriptionSize: 10,
          hoveredColor: "#ff0000",
          // strokeWidth: 2,
        }}
        typeConfig={{
          根节点: {
            radius: 23,
            fill: "#404d95",
            hoverStyle: {
              fill: "#1429a0",
            },
          },
          model: {
            radius: 20,
            fill: "#b4e5a2",
            hoverStyle: {
              fill: "#6be73e",
            },
          },
          test: {
            radius: 18,
            fill: "#89c4fb",
            hoverStyle: {
              fill: "#2f8fe8",
            }
          },
        }}
      />
    </div>
  );
};

export default Home;
