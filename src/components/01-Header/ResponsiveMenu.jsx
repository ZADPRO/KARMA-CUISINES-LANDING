import { motion, AnimatePresence } from "framer-motion";

import PropTypes from "prop-types";

export default function ResponsiveMenu({ open }) {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.1 }}
          className="absolute top-20 left-0 w-full h-full h-screen z-20"
        >
          <div className="text-xl font-semibold uppercase bg-[#f95005] text-white py-10 m-6 rounded-3xl">
            <ul className="flex flex-col justify-center items-center gap-10">
              <li>Home</li>
              <li>About</li>
              <li>Menu</li>
              <li>Contact</li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

ResponsiveMenu.propTypes = {
  open: PropTypes.bool.isRequired,
};
