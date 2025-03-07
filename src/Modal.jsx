import React from "react";
import { motion } from "framer-motion";

function Modal(props) {
  return (
    <div className=" z-10 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.4 }}
      >
        {props.children}
      </motion.div>
    </div>
  );
}

export default Modal;
