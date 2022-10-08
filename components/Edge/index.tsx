/*
 * @Author: tohsaka888
 * @Date: 2022-09-30 16:14:10
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-10-08 10:59:52
 * @Description: 边
 */

import React, { useCallback, useContext, useMemo, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { ConfigContext, HoveredNodeContext } from "components/context";
import { defaultEdgeConfig } from "components/config/edgeConfig";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

function Edge({
  id,
  fromNode,
  toNode,
  type,
  description,
  fromId,
  toId,
}: Edge.EdgeFrontProps) {
  const { hoveredNode } = useContext(HoveredNodeContext)!;
  const { config } = useContext(ConfigContext)!;
  const { edgeConfig } = config;
  const needHighlight = useMemo(() => {
    return hoveredNode
      ? hoveredNode.id === fromId || hoveredNode.id === toId
      : false;
  }, [fromId, hoveredNode, toId]);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(true);

  const calcQuadrant: Utils.CalcQuadrantFunc = ({ node, parentNode }) => {
    // 为入边-二三象限
    if (node.position.x - parentNode.position.x < 0) {
      // 第二象限
      if (node.position.y - parentNode.position.y < 0) {
        return "第二象限";
      }
      // 第三象限
      else {
        return "第三象限";
      }
    }
    // 为出边-一四象限
    else {
      if (node.position.y - parentNode.position.y < 0) {
        return "第一象限";
      } else {
        return "第四象限";
      }
    }
  };

  const calcFlag: Utils.CalcFlagFunc = useCallback(
    ({ fromNode, toNode, parentNode }) => {
      const fromNodePosition = calcQuadrant({ node: fromNode, parentNode });
      const toNodePosition = calcQuadrant({ node: toNode, parentNode });

      if (fromNodePosition === "第一象限") {
        if (toNodePosition === "第一象限") return 1;
        else if (toNodePosition === "第二象限") return 1;
        else if (toNodePosition === "第三象限") return 1;
        else return -1;
      } else if (fromNodePosition === "第二象限") {
        if (toNodePosition === "第一象限") return -1;
        else if (toNodePosition === "第二象限") return -1;
        else if (toNodePosition === "第三象限") return -1;
        else return -1;
      } else if (fromNodePosition === "第三象限") {
        if (toNodePosition === "第一象限") return 1;
        else if (toNodePosition === "第二象限") return -1;
        else if (toNodePosition === "第三象限") return 1;
        else return 1;
      } else {
        if (toNodePosition === "第一象限") return 1;
        else if (toNodePosition === "第二象限") return -1;
        else if (toNodePosition === "第三象限") return 1;
        else return 1;
      }
    },
    []
  );

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

  const {
    descriptionColor,
    descriptionSize,
    hoveredColor,
    stroke,
    strokeWidth,
  } = defaultEdgeConfig;

  return (
    <MotionConfig reducedMotion="never">
      {fromNode && toNode && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
          }}
        >
          {isShow && (
            <motion.path
              id={id as string}
              fill={"transparent"}
              width={20}
              initial={{ opacity: 0 }}
              animate={{
                d,
                stroke: edgeConfig?.stroke || stroke,
                strokeWidth: edgeConfig?.strokeWidth || strokeWidth,
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
              }}
            />
          )}

          {/* {needHighlight && (
            <motion.path
              id={(id + "active") as string}
              fill={"transparent"}
              animate={{
                d,
                stroke: "#2890ff",
                // opacity: needHighlight ? [0.5, 1] : 1,
                strokeWidth: 3,
                pathSpacing: 1,
                pathLength: [0, 0.5],
                pathOffset: [0, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0,
                delay: 0,
              }}
            />
          )} */}

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
                  <BsFillEyeSlashFill color="#cecece" />
                </g>
              )}
            </motion.g>
          )}

          {!isHovered && isShow && (
            <motion.text
              textAnchor={"middle"}
              dominantBaseline={"central"}
              dy={-2}
            >
              <motion.textPath
                href={`#${id}`}
                fontSize={24}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  fill: needHighlight
                    ? edgeConfig?.hoveredColor || hoveredColor
                    : edgeConfig?.stroke || stroke,
                  opacity: needHighlight ? [0.5, 1] : 1,
                }}
                startOffset={"50%"}
              >
                ▸
              </motion.textPath>
            </motion.text>
          )}

          {isShow && (
            <motion.text
              textAnchor={"middle"}
              dominantBaseline={"central"}
              dy={-10}
            >
              <motion.textPath
                href={`#${id}`}
                animate={{
                  fill: needHighlight
                    ? edgeConfig?.descriptionColor || hoveredColor
                    : edgeConfig?.descriptionColor || descriptionColor,
                  fontSize: edgeConfig?.descriptionSize || descriptionSize,
                  opacity: needHighlight ? [0.5, 1] : 1,
                }}
                startOffset={"50%"}
              >
                {description}
              </motion.textPath>
            </motion.text>
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
        </motion.g>
      )}
    </MotionConfig>
  );
}

export default Edge;
