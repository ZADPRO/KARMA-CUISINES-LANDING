import { useEffect, useState } from "react";
import SplitText from "../../pages/SplitText/SplitText";
import { Heart, ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";
import "./Menu.css";
import foodImg from "../../assets/home/thandoori.jpg";
import BottomModal from "../../pages/BottomModal/BottomModal";
import axios from "axios";

import decrypt from "../../helper";

export default function Menu() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCartItems);
  }, []);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/userRoutes/viewProducts", {
        headers: {
          Authorization: localStorage.getItem("JWTtoken"),
        },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data", data);
        setFoodData(data.Restroproducts);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
  }, []);

  return (
    <div>
      <div className="menuPageIntro">
        <SplitText
          text="Our Menu!!"
          className="lg:text-7xl text-4xl font-semibold text-white text-center"
          delay={50}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </div>
      <div className="container py-14 px-10 mb-[80px]">
        {/* card section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {foodData.map((item) => (
            <FoodCard key={item.id} item={item} setCartItems={setCartItems} />
          ))}
        </div>
      </div>
      <div className="footerBuyProducts cursor-pointer" onClick={toggleModal}>
        {cartItems.length > 0 ? (
          <>
            <p className="text-lg font-semibold md:hidden">
              {cartItems.length} items in cart -{" "}
              {cartItems
                .reduce(
                  (acc, item) =>
                    acc + (parseFloat(item.productPrice) * item.count || 0),
                  0
                )
                .toFixed(2)}{" "}
              to continue
            </p>

            <p className="hidden md:block relative">
              <a
                href="#"
                className="relative inline-flex h-12 w-12 items-center justify-center text-lg text-white"
              >
                <ShoppingCart />
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-white px-1.5 text-sm text-black">
                  {cartItems.length}
                </span>
              </a>
            </p>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold text-gray-500 md:hidden">
              No items in the cart
            </p>
            <p className="hidden md:block relative">
              <a
                href="#"
                className="relative inline-flex h-12 w-12 items-center justify-center text-lg text-white"
              >
                <ShoppingCart />
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-white px-1.5 text-sm text-black">
                  {cartItems.length}
                </span>
              </a>
            </p>
          </>
        )}
      </div>
      <BottomModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        cartItems={cartItems}
      />
    </div>
  );
}

function FoodCard({ item, setCartItems }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const savedWishlistItems =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    // Compare using productId (not item.id)
    const isInCart = savedCartItems.some(
      (cartItem) => cartItem.productId === item.productId
    );
    const isInWishlist = savedWishlistItems.some(
      (wishlistItem) => wishlistItem.productId === item.productId
    );

    setIsAddedToCart(isInCart);
    setIsWishlisted(isInWishlist);
  }, [item.productId]);

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      setIsAddedToCart(true);

      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.productId === item.productId
      );

      if (existingItemIndex === -1) {
        const itemWithQuantity = { ...item, count: 1 };
        cartItems.push(itemWithQuantity);
      } else {
        cartItems[existingItemIndex].count += 1;
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));

      setCartItems(cartItems);
    }
  };

  return (
    <div className="relative bg-[#f8e5d9] rounded-xl hover:scale-110 transition duration-300 shadow-lg">
      {/* Wishlist heart icon */}
      <div
        className="absolute top-3 right-3 cursor-pointer bg-white p-2 rounded-full"
        onClick={() => setIsWishlisted(!isWishlisted)}
      >
        <Heart
          className={`${
            isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"
          } hover:text-red-500`}
          size={24}
          fill={isWishlisted ? "red" : "none"}
        />
      </div>

      <img
        src={`data:${item.foodPic.contentType};base64,${item.foodPic.content}`}
        alt={item.productName}
        className="object-cover rounded-t-xl w-full h-[200px] bg-white"
      />
      <div className="space-y-2 p-5">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">{item.productName}</p>
          <p className="text-red-500">{item.ratings}</p>
        </div>
        <p>{item.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">€ {item.productPrice}</p>
          <button
            className={`border-2 rounded-md px-3 py-1 transition duration-300 ${
              isAddedToCart
                ? "bg-green-500 text-white border-green-500"
                : "border-[#6b463a] hover:bg-[#6b463a] hover:text-white"
            }`}
            onClick={handleAddToCart}
            disabled={isAddedToCart}
          >
            {isAddedToCart ? "Added" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

FoodCard.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    foodPic: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    ratings: PropTypes.string.isRequired,
    productPrice: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  setCartItems: PropTypes.func.isRequired,
};
