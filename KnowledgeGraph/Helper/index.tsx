import React, { useContext, useState } from "react";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { ConfigContext } from "../Controller/ConfigController";

function Helper() {
  const { config } = useContext(ConfigContext)!;
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      {config.showHelper && (
        <motion.div
          initial={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "transparent",
            cursor: "pointer",
            userSelect: "none",
            zIndex: 10,
          }}
          onClick={() => setVisible(!visible)}
          whileHover={{
            opacity: 0.5,
          }}
        >
          <BsFillQuestionCircleFill
            size={config.helperConfig!.size}
            color={config.helperConfig!.color}
          />
        </motion.div>
      )}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{
              position: "absolute",
              right: "16px",
              padding: "8px 16px",
              opacity: 0,
              fontSize: "0px",
              border: "1px solid #cecece",
              background: "#fff",
              width: "max-content",
              overflow: "hidden",
              top: "64px",
            }}
            animate={{
              borderRadius: "4px",
              opacity: 1,
              fontSize: "12px",
            }}
            exit={{
              opacity: 0,
              position: "absolute",
              right: "0px",
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <motion.ul
              initial={{
                margin: "0px 0px 0px 16px",
                padding: "0px",
              }}
            >
              <motion.li>双击节点-探索/取消探索</motion.li>
              <motion.li>悬停节点-高亮节点并且高亮与其有关系的边</motion.li>
              <motion.li>拖拽空白画布-移动画布</motion.li>
              <motion.li>滑动滚轮-缩放画布</motion.li>
              <motion.li>拖拽节点-移动节点</motion.li>
              <motion.li>点击边-隐藏/显示边</motion.li>
              <motion.li>右键空白画布-画布选项菜单</motion.li>
              <motion.li>复位画布-将画布移动缩放恢复</motion.li>
              <motion.li>全屏-当前图谱全屏显示</motion.li>
              <motion.li>
                下载当前图谱-下载当前图谱为选中格式(jpg,jpeg,png,bmp)
              </motion.li>
              <motion.li>右键节点-节点选项菜单</motion.li>
              <motion.li>
                当前实体居中-在原缩放比例下将当前节点放置画布中央
              </motion.li>
              <motion.li>
                显示当前节点关系-仅显示当前节点及其子节点和当前节点和子节点的关系
              </motion.li>
              <motion.li>显示所有节点-显示所有隐藏的节点</motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Helper;
