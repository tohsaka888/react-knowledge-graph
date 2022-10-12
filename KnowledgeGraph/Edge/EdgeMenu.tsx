/*
 * @Author: tohsaka888
 * @Date: 2022-10-08 11:15:11
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-09 15:03:56
 * @Description: EdgeMenu
 */

// import { EdgeMenuContext } from "components/context";
import useCalcEdge from "../hooks/Edge/useCalcEdge";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { EdgeFrontProps } from "KnowledgeGraph";

type Props = {
  edge: EdgeFrontProps;
};

function EdgeMenu({ edge }: Props) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(true);
  const { id } = edge;
  const { calcD } = useCalcEdge();
  const d = calcD(edge);

  useEffect(() => {
    const edge = document.getElementById(`${id}direction`);
    if (edge) {
      if (isHovered) {
        edge.style.display = "none";
      } else {
        edge.style.display = "block";
      }
    }
  }, [id, isHovered]);

  useEffect(() => {
    const edge = document.getElementById(id as string);
    const description = document.getElementById(id + "description");
    const direction = document.getElementById(id + "direction");
    if (isShow) {
      if (edge) {
        edge.style.opacity = "1";
      }
      if (description) {
        description.style.opacity = "1";
      }
      if (direction) {
        direction.style.opacity = "1";
      }
    } else {
      if (edge) {
        edge.style.opacity = "0.2";
      }
      if (description) {
        description.style.opacity = "0.2";
      }
      if (direction) {
        direction.style.opacity = "0.2";
      }
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
