import PropTypes from "prop-types";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function BottomModal({ isOpen, onClose }) {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();
  const [cartItems, setCartItems] = useState([]);

  const y = useMotionValue(0);
  const controls = useDragControls();

  useEffect(() => {
    // Load cart items from local storage when modal opens
    if (isOpen) {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
      console.log("Cart Details: ", storedCart);
    }
  }, [isOpen]);

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

  const clearAllCartItems = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    console.log("All cart items have been cleared.");
    handleClose();
  };

  const updateCartItemCount = (id, delta) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === id) {
          const updatedCount = item.count + delta;
          return { ...item, count: updatedCount > 0 ? updatedCount : 0 }; // Prevent negative count
        }
        return item;
      })
      .filter((item) => item.count > 0); // Remove items with count 0

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

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
        <div className="w-full h-full overflow-auto p-4">
          <div className="flex items-center justify-between">
            <h2>Cart Items</h2>
            <div
              className="flex items-center clearAllBtn gap-2 cursor-pointer"
              onClick={clearAllCartItems}
            >
              <p>Clear All</p>
              <X size={15} />
            </div>
          </div>
          <div className="cartItemsDisplay flex flex-col">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between shadow-md p-3 m-2"
                >
                  <div className="flex gap-3">
                    <img
                      className="w-[100px] rounded"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="flex flex-col">
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                      <p>{item.rating}</p>
                    </div>
                  </div>
                  <div className="addItems flex items-center gap-2">
                    <button
                      onClick={() => updateCartItemCount(item.id, -1)}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <p>{item.count}</p>
                    <button
                      onClick={() => updateCartItemCount(item.id, 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center mt-4">No items in the cart</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

BottomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
