"use client";
import React, { ReactNode, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  descTitle?: string;
  children?: ReactNode;
}

export default function DescriptionMenu({
  descTitle = "Descrição",
  children = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam nobis
            asperiores animi. Non eos magnam nobis doloribus debitis officia
            similique a eligendi inventore sed libero vitae tempore minima, cum
            fuga.`,
}: Props) {
  const [visibleDescription, setVisibleDescription] = useState(false);

  return (
    <div className="w-96">
      <button
        className="p-3 border border-slate-800 w-full cursor-pointer flex items-center justify-between"
        onClick={() => setVisibleDescription((prev) => !prev)}
      >
        <h2>{descTitle}</h2>
        <IoMdArrowDropdown size={32} />
      </button>

      <AnimatePresence initial={false}>
        {visibleDescription && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
            className="bg-slate-950 border border-slate-800 p-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
