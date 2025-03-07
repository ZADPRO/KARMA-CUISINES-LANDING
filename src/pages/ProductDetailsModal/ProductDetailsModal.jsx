import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import PropTypes from "prop-types";

export default function ProductSidebar({
  isOpen,
  onClose,
  product,
  onCartUpdate,
}) {
  const [scope, animate] = useAnimate();
  const [drawerRef, { width }] = useMeasure();
  const x = useMotionValue(0);
  const controls = useDragControls();

  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleClose = async () => {
    const xStart = typeof x.get() === "number" ? x.get() : 0;

    await animate(scope.current, { x: [xStart, -width] });

    document.body.style.overflow = "";
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);

      // Check if the product is already in the cart
      const existingProduct = parsedCart.find(
        (item) => item.id === product?.id
      );
      if (existingProduct) {
        // If it exists, set the current product without the image
        setCurrentProduct({ ...existingProduct, image: product.image });
        setQuantity(existingProduct.quantity); // Set the quantity from the cart
      } else {
        // If it doesn't exist, set the current product to the incoming product
        setCurrentProduct(product);
      }
    } else {
      // If no cart exists, set the current product to the incoming product
      setCurrentProduct(product);
    }
  }, [product, isOpen]);

  const isInCart = cart.some((item) => item.id === currentProduct?.id);

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    onCartUpdate(updatedCart.length);
  };

  const toggleCart = () => {
    let updatedCart;
    if (isInCart) {
      updatedCart = cart.filter((item) => item.id !== currentProduct.id);
    } else {
      updatedCart = [...cart, { ...currentProduct, quantity }];
    }
    updateLocalStorage(updatedCart);
    handleClose();
  };

  const calculateTotalPrice = () => {
    const price = parseFloat(
      currentProduct.price.replace(" CHF", "").replace(",", ".")
    );
    return (price * quantity).toFixed(2);
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    const updatedCart = cart.map((item) =>
      item.id === currentProduct.id ? { ...item, quantity: newQuantity } : item
    );
    updateLocalStorage(updatedCart);
  };

  const decrementQuantity = () => {
    const newQuantity = quantity - 1;
    if (newQuantity < 1) {
      // Remove item from cart if quantity is less than 1
      const updatedCart = cart.filter((item) => item.id !== currentProduct.id);
      updateLocalStorage(updatedCart);
      handleClose(); // Close the sidebar if the item is removed
    } else {
      setQuantity(newQuantity);
      const updatedCart = cart.map((item) =>
        item.id === currentProduct.id
          ? { ...item, quantity: newQuantity }
          : item
      );
      updateLocalStorage(updatedCart);
    }
  };

  if (!isOpen || !currentProduct) return null;

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
        className="absolute left-0 top-0 h-full w-[80vw] sm:w-[50vw] md:w-[40vw] lg:w-[40vw] bg-white shadow-lg rounded-r-3xl overflow-y-auto"
        style={{ x, scrollbarWidth: "none" }}
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
        <div className="p-5">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-lg color-black"
          >
            ✖
          </button>

          <h2 className="text-xl font-semibold mb-4">Product Details</h2>

          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className="w-full h-60 object-cover rounded-lg"
          />

          <h2 className="text-xl font-semibold mt-2">{currentProduct.name}</h2>

          <p className="text-gray-600">{currentProduct.description}</p>

          <div className="flex justify-start mt-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                style={{ fontSize: "22px" }}
                key={index}
                className={
                  index < currentProduct.rating
                    ? "text-yellow-500"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
          </div>

          <div className="flex items-center justify-around gap-10 w-full">
            <p className="text-lg font-bold mt-1">{currentProduct.price}</p>

            <div className="flex items-center gap-3 mt-1">
              <button
                className="px-3 py-1 bg-gray-200 rounded-md"
                onClick={decrementQuantity}
              >
                -
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                className="px-3 py-1 bg-gray-200 rounded-md"
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>
            <button
              onClick={toggleCart}
              className="bg-[#4f391d] px-4 mt-1 lg:block hidden text-white py-2 rounded-lg hover:bg-[#4f391d]"
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>

          <div className="flex flex-col text-center mt-3">
            <p className="text-lg font-bold mt-1">
              Total: {calculateTotalPrice()} CHF
            </p>
          </div>
          <button
            onClick={toggleCart}
            className="bg-[#4f391d] px-4 mt-3 lg:hidden block text-center w-full items-center justify-center text-white py-2 rounded-lg hover:bg-[#4f391d]"
          >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>

          <div className="flex flex-col">
            <p className=" mt-4">
              <b>Available Zone: </b>
              {currentProduct.postalCode}
            </p>
            <p className=" mt-3">
              <b>Category: </b>
              {currentProduct.category}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

ProductSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }),
};
