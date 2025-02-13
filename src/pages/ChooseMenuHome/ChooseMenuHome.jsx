import { useEffect } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

import karmaCuisineLogo from "../../assets/logo/logo.png";
import justEats from "../../assets/logo/justEat.png";
import uberEats from "../../assets/logo/uberEats.png";

export default function ChooseMenuHome({ isOpen, onClose, foodItem }) {
  console.log("foodItem", foodItem);
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();
  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      console.log("isOpen", isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    // asdf
  }, [foodItem]);

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
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ ease: "easeInOut" }}
        className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-white"
        style={{ y }}
        drag="y"
        dragControls={controls}
        onDragEnd={() => {
          if (y.get() >= 100) {
            handleClose();
          }
        }}
        dragListener={false}
        dragConstraints={{ top: -100, bottom: 0 }}
      >
        <div className="w-full h-full overflow-auto pt-3 ps-4 pe-4 pb-[70px]">
          {foodItem && (
            <p className="pt-2 pb-2 text-[18px] text-center font-bold">
              {foodItem.name}
            </p>
          )}
          <div className="flex flex-col gap-5">
            <div className="chooseContents w-full flex items-center justify-center gap-3 border p-3 rounded-xl">
              <img className="w-[30px]" src={karmaCuisineLogo} alt="" />
              <p>Continue with Karma Cuisines</p>
            </div>
            <div className="chooseContents w-full flex items-center justify-center gap-3 border p-3 rounded-xl">
              <img className="w-[80px]" src={uberEats} alt="" />
              <p>Continue with Uber Eats</p>
            </div>
            <div className="chooseContents w-full flex items-center justify-center gap-3 border p-3 rounded-xl">
              <img className="w-[80px]" src={justEats} alt="" />
              <p>Continue with Just Eats</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

ChooseMenuHome.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  foodItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};
