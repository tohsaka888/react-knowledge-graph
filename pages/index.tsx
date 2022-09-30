import KnowledgeGraph from "components";
import Canvas from "components/Canvas";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div
      style={{ width: "1000px", height: "500px", border: "1px solid #cecece" }}
    >
      <KnowledgeGraph />
    </div>
  );
};

export default Home;
