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

import karmaCuisineLogo from "../../assets/logo/logo6.png";
import justEats from "../../assets/logo/justEat.png";
import uberEats from "../../assets/logo/uberEats.png";
import { useNavigate } from "react-router-dom";

export default function ChooseMenuHome({ isOpen, onClose, foodItem }) {
  console.log("foodItem", foodItem);
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();
  const y = useMotionValue(0);
  const controls = useDragControls();
  const navigate = useNavigate();

  const handleNavigation = (type) => {
    if (type === "karma") {
      navigate("/menu");
    } else if (type === "justEats") {
      window.open("https://www.justeats.com", "_blank");
    } else if (type === "uberEats") {
      window.open("https://www.ubereats.com", "_blank");
    }
  };

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setTimeout(() => {
      onClose();
    }, 100);
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
            <div
              className="chooseContents w-full flex items-center justify-center gap-1 border p-3 rounded-xl cursor-pointer"
              onClick={() => handleNavigation("karma")}
            >
              <p>Continue with </p>
              <img className="w-[130px]" src={karmaCuisineLogo} alt="" />
            </div>
            <div
              className="chooseContents w-full flex items-center justify-center gap-1 border p-3 rounded-xl cursor-pointer"
              onClick={() => handleNavigation("uberEats")}
            >
              <p>Continue with </p>
              <img className="w-[80px]" src={uberEats} alt="" />
            </div>
            <div
              className="chooseContents w-full flex items-center justify-center gap-1 border p-3 rounded-xl cursor-pointer"
              onClick={() => handleNavigation("justEats")}
            >
              <p>Continue with </p>
              <img className="w-[80px]" src={justEats} alt="" />
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
