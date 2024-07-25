// src/components/CustomModal.js

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="mx-4 w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg"
            initial={{ y: "-100vh" }}
            animate={{ y: "0" }}
            exit={{ y: "-100vh" }}
          >
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
