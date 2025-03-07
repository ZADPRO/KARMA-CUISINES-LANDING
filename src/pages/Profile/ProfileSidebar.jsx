import { useEffect } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import PropTypes from "prop-types";

import profileImage from "../../assets/userProfile/profile.jpg";

export default function ProfileSidebar({ isOpen, onClose }) {
  const [scope, animate] = useAnimate();
  const [drawerRef, { width }] = useMeasure();
  const x = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, { opacity: [1, 0] });

    const xStart = typeof x.get() === "number" ? x.get() : 0;

    await animate("#drawer", {
      x: [xStart, -width], // Slide back to the left
    });

    document.body.style.overflow = ""; // Restore scrolling

    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling when sidebar is open
    } else {
      document.body.style.overflow = ""; // Restore scrolling when closed
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup when component unmounts
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={scope}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-neutral-950/70"
    >
      <motion.div
        id="drawer"
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ ease: "easeInOut" }}
        className="absolute left-0 top-0 h-full w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-[25vw] bg-white text-black shadow-lg rounded-r-3xl overflow-y-auto"
        style={{ x }}
        drag="x"
        dragControls={controls}
        onDragEnd={() => {
          if (x.get() <= -100) {
            handleClose();
          }
        }}
        dragListener={false}
        dragConstraints={{ left: -width, right: 0 }}
      >
        <div className="w-full h-full overflow-auto pt-3 ps-4 pe-4 pb-[70px]">
          <h2 className="text-lg font-semibold">Profile</h2>
          <button onClick={handleClose} className="absolute top-3 right-3">
            ✖
          </button>
          <div className="flex flex-col items-center justify-center gap-3">
            <img src={profileImage} alt="" />
            <button className="border-[2px] border-black px-10 py-1 rounded">
              Login
            </button>
            <p>OR</p>
            <button className="border-[2px] border-black px-10 py-1 rounded">
              Signup
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

ProfileSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
