import KnowledgeGraph from "components";
import { baseUrl } from "config/baseUrl";
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
        explore={getNode}
        radius={20}
        basicDistence={38}
        position={{ x: 100, y: 100 }}
        exploreEdge={getEdge}
        node={{
          id: "node-0",
          type: "根节点",
          hasMore: true,
          direction: "root",
          name: "根节点",
        }}
      />
    </div>
  );
};

export default Home;
