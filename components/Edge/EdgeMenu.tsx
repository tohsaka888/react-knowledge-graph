/*
 * @Author: tohsaka888
 * @Date: 2022-10-08 11:15:11
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-08 11:53:59
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
  const { fromNode, toNode, type, id } = edge;
  const { calcFlag } = useCalcEdge();

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

  const d = useMemo(() => {
    const fromX = fromNode?.position.x as number;
    const fromY = fromNode?.position.y as number;
    const toX = toNode?.position.x as number;
    const toY = toNode?.position.y as number;

    if (type === "straight") {
      return `M ${fromX} ${fromY}, L ${toX} ${toY}`;
    } else {
      const flag =
        fromNode && toNode && fromNode.parentNode
          ? calcFlag({
              fromNode: fromNode!,
              toNode: toNode!,
              parentNode: fromNode?.parentNode!,
            })
          : 1;
      // 中间点
      const angle = Math.PI / 2 - Math.atan2(fromY - toY, toX - fromX);
      const dx = flag * Math.cos(angle) * ((toX - fromX) / 2);
      const dy = flag * Math.sin(angle) * ((toX - fromX) / 2 + 10);
      const middlePoint = {
        x: (fromX + toX + dx) / 2 + dx,
        y: (fromY + toY) / 2 + dy,
      };
      return `M ${fromX} ${fromY}, Q ${middlePoint.x} ${middlePoint.y}, ${toX} ${toY}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fromNode,
    toNode,
    type,
    fromNode?.position.x,
    toNode?.position.x,
    fromNode?.position.y,
    toNode?.position.y,
  ]);
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
            <g
              onClick={() => {
                setIsShow(true);
              }}
            >
              <circle r={10} fill={"transparent"} cx={8} cy={8} />
              <BsFillEyeSlashFill color="#cecece" style={{ opacity: 0.5 }} />
            </g>
          )}
        </motion.g>
      )}
      {isShow && (
        <motion.path
          d={d}
          stroke={"transparent"}
          fill={"transparent"}
          strokeWidth={20}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={() => {
            setIsShow(false);
          }}
        />
      )}
    </g>
  );
}

export default EdgeMenu;
