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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function BottomModal({ isOpen, onClose }) {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

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
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to clear all items from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("cart");
        setCartItems([]);
        console.log("All cart items have been cleared.");
        handleClose();

        Swal.fire(
          "Cart Cleared!",
          "All items have been removed from your cart.",
          "success"
        );
      } else {
        handleClose();
      }
    });
  };

  const updateCartItemCount = (id, delta) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.productId === id) {
          const updatedCount = item.count + delta;
          return { ...item, count: updatedCount > 0 ? updatedCount : 0 };
        }
        return item;
      })
      .filter((item) => item.count > 0);

    if (updatedCart.length === 0) {
      Swal.fire({
        title: "Remove all items?",
        text: "The cart will be empty if you remove this item. Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, clear the cart!",
      }).then((result) => {
        if (result.isConfirmed) {
          setCartItems([]);
          localStorage.removeItem("cart");
          Swal.fire(
            "Cart Cleared!",
            "All items have been removed from your cart.",
            "success"
          );
        }
      });
    } else {
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  if (!isOpen) return null;

  const removeCartItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this item from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cartItems.filter((item) => item.productId !== id);

        // Update state and local storage
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        Swal.fire(
          "Removed!",
          "The item has been removed from your cart.",
          "success"
        );
      }
    });
  };

  // New check before navigating to orders
  const handlePlaceOrder = () => {
    const jwtToken = localStorage.getItem("jwtToken");
    const loginType = localStorage.getItem("loginType");

    // Check if the user is logged in
    if (!jwtToken || loginType !== "true") {
      // Store the cart items and source flag in localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("fromPlaceOrder", "true");

      // Redirect to the login page
      navigate("/login");
    } else {
      // If logged in, navigate to the orders page
      navigate("/orders", { state: { orders: cartItems } });
    }
  };

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
        className="absolute bottom-0 h-[85vh] w-full overflow-hidden rounded-t-3xl bg-white"
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
        <div className="w-full h-full overflow-auto ps-4 pe-4 pb-[70px]">
          <div className="flex items-center justify-between sticky top-0 pt-4 bg-white z-10">
            <h2>Cart Items</h2>
            <div
              className="flex items-center clearAllBtn gap-2 cursor-pointer"
              onClick={clearAllCartItems}
            >
              <p>Clear All</p>
              <X size={15} />
            </div>
          </div>
          <div className="cartItemsDisplay grid grid-cols-1 md:grid-cols-3 gap-4">
            {cartItems.map((item) => {
              const unitPrice = parseFloat(item.productPrice);
              const totalPrice = (unitPrice * item.count).toFixed(2);

              return (
                <div
                  key={item.productId}
                  className="relative flex items-center rounded-lg justify-between shadow-md p-3 m-2"
                >
                  <button
                    onClick={() => removeCartItem(item.productId)}
                    className="absolute top-1 text-[22px] right-1 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>

                  <div className="flex flex-col items-center">
                    <div className="flex gap-3">
                      <img
                        className="w-[100px] rounded"
                        src={`data:${item.foodPic.contentType};base64,${item.foodPic.content}`}
                        alt={item.name}
                      />
                      <div className="flex flex-col">
                        <p>{item.name}</p>
                        <p>Unit Price: € {unitPrice.toFixed(2)}</p>
                        <p>Total: € {totalPrice}</p>
                        <p>Rating: {item.ratings}</p>
                      </div>
                    </div>
                    <div className="addItems items-center justify-end flex gap-2">
                      <button
                        onClick={() => updateCartItemCount(item.productId, -1)}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <p>{item.count}</p>
                      <button
                        onClick={() => updateCartItemCount(item.productId, 1)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="placeOrderBtn shadow-lg fixed bottom-[10px] left-[1rem] right-[1rem] bg-[#cd5c08] text-white text-center py-3 rounded-lg cursor-pointer"
          onClick={handlePlaceOrder}
        >
          Place Order
        </div>
      </motion.div>
    </motion.div>
  );
}

BottomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
