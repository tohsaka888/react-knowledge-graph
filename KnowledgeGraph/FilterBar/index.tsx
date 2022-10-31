import { animate, motion } from "framer-motion";
import React, { useContext, useMemo, useState } from "react";
import { BsFillFilterCircleFill } from "react-icons/bs";
import { ConfigContext } from "../Controller/ConfigController";
import { useAppSelector } from "../hooks";

function FilterBar() {
  const [visible, setVisible] = useState<boolean>(false);
  const { config } = useContext(ConfigContext)!;
  const nodes = useAppSelector((state) => state.graph.nodes);
  const types = useMemo(() => {
    const res: { type: string; count: number }[] = [];
    nodes
      .map((node) => node.type)
      .forEach((type) => {
        const current = res.find((item) => item.type === type);
        if (!current) {
          res.push({
            type,
            count: 1,
          });
        } else {
          current.count++;
        }
      });
    return res;
  }, [nodes]);

  return (
    <>
      <motion.div
        initial={{
          position: "absolute",
          top: "16px",
          right: "48px",
          background: "transparent",
          cursor: "pointer",
          userSelect: "none",
          zIndex: 10,
          overflow: "hidden",
        }}
        onClick={() => setVisible(!visible)}
        whileHover={{
          opacity: 0.5,
        }}
      >
        <BsFillFilterCircleFill
          style={{
            fontSize: config.filterConfig?.size,
            color: config.filterConfig?.color,
          }}
        />
      </motion.div>
      <motion.div
        initial={{
          padding: "16px",
          borderBottom: "1px solid #cecece",
          opacity: "0px",
          position: "absolute",
          top: "-100px",
          display: "flex",
          alignItems: "center",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          top: visible ? "0px" : "-100px",
          background: "#fff",
          width: "100%",
        }}
        transition={{
          type: "spring",
        }}
      >
        {types.map((type) => {
          return (
            <motion.div
              key={type.type}
              initial={{
                fontSize: "10px",
                marginRight: "8px",
                borderRadius: "5px",
                background: config.typeConfig![type.type].fill,
                padding: "2px 6px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <motion.span initial={{ marginRight: "4px" }}>
                {type.type}
              </motion.span>
              <motion.span>{type.count}个</motion.span>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}

export default FilterBar;
