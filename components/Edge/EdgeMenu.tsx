/*
 * @Author: tohsaka888
 * @Date: 2022-10-08 11:15:11
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 08:31:13
 * @Description: EdgeMenu
 */

// import { EdgeMenuContext } from "components/context";
import useCalcEdge from "components/hooks/Edge/useCalcEdge";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import * as d3 from "d3";

type Props = {
  edge: Edge.EdgeFrontProps;
};

function EdgeMenu({ edge }: Props) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(true);
  const { id } = edge;
  const { calcD } = useCalcEdge();
  const d = calcD(edge);

  useEffect(() => {
    if (isHovered) {
      d3.select(`#${id}direction`).style("display", "none");
    } else {
      d3.select(`#${id}direction`).style("display", "block");
    }
  }, [id, isHovered]);

  useEffect(() => {
    if (isShow) {
      d3.select(`#${id}`).style("opacity", 1);
      d3.select(`#${id}description`).style("opacity", 1);
    } else {
      d3.select(`#${id}`).style("opacity", 0.2);
      d3.select(`#${id}description`).style("opacity", 0.2);
    }
  }, [id, isShow]);
  return (
    <g>
      {isHovered && (
        <motion.g
          style={{ offsetPath: `path("${d}")`, offsetDistance: "50%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transform={`translate(-10, -8)`}
        >
          {isShow ? (
            <BsFillEyeFill color="#cecece" />
          ) : (
            <BsFillEyeSlashFill color="#cecece" style={{ opacity: 0.5 }} />
          )}
        </motion.g>
      )}

      <motion.path
        d={d}
        stroke={"transparent"}
        fill={"none"}
        strokeWidth={20}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setIsShow(!isShow);
        }}
      />
    </g>
  );
}

export default EdgeMenu;
