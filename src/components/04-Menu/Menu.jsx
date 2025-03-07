import { useEffect, useState } from "react";
// import SplitText from "../../pages/SplitText/SplitText";
import { Heart, ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";
import "./Menu.css";
// import foodImg from "../../assets/home/thandoori.jpg";
import BottomModal from "../../pages/BottomModal/BottomModal";
import axios from "axios";

import decrypt from "../../helper";
import { useTranslation } from "react-i18next";

export default function Menu() {
  const { t } = useTranslation("global");

  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [foodData, setFoodData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredFoodData = foodData.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="flex-1 homePageCont p-4 mt-8">
          <p className="lg:text-7xl text-5xl text-[#FFF5E4] text-center">
            {t("menu.menu")} !!
          </p>
        </div>
        {/* <SplitText
          text="Our Menu!!"
          className="lg:text-7xl text-4xl font-semibold text-white text-center"
          delay={50}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        /> */}
      </div>
      <div className="flex lg:flex-row flex-col gap-3 w-full md:w-6/12 mx-auto">
        <div className="relative lg:my-6 my-3 mx-3 lg:w-full md:w-7/12 lg:mx-auto">
          <input
            id="id-l11"
            type="text"
            name="id-l11"
            placeholder="Your Name"
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 pl-12 text-slate-500 placeholder-transparent outline-none transition-all focus:border-[#cd5c08]"
          />
          <label
            htmlFor="id-l11"
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:left-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#cd5c08] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            Enter Postal Code To Filter
          </label>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-3 left-4 h-6 w-6 stroke-slate-400 peer-disabled:cursor-not-allowed"
            fill="none"
            aria-hidden="true"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-labelledby="title-7 description-7"
            role="graphics-symbol"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        </div>
        <div className="relative lg:my-6 my-3 mx-3 lg:w-full md:w-7/12 lg:mx-auto">
          <input
            id="id-l12"
            type="text"
            name="id-l12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Your Name"
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 pl-12 text-slate-500 placeholder-transparent outline-none transition-all focus:border-[#cd5c08]"
          />
          <label
            htmlFor="id-l12"
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:left-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#cd5c08] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            Search Food
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-3 left-4 h-6 w-6 stroke-slate-400 peer-disabled:cursor-not-allowed"
            fill="none"
            aria-hidden="true"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-labelledby="title-7 description-7"
            role="graphics-symbol"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>

      <div className="container py-14 px-10 mb-[80px]">
        {/* card section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {filteredFoodData.length > 0 ? (
            filteredFoodData.map((item) => (
              <FoodCard
                key={item.productId}
                item={item}
                setCartItems={setCartItems}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-4">
              No matching food found.
            </p>
          )}
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

    const isInCart = savedCartItems.some(
      (cartItem) => cartItem.productId === item.productId
    );
    const isInWishlist = savedWishlistItems.some(
      (wishlistItem) => wishlistItem.productId === item.productId
    );

    setIsAddedToCart(isInCart);
    setIsWishlisted(isInWishlist);
  }, [item.productId]);

  const handleToggleCart = () => {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (isAddedToCart) {
      cartItems = cartItems.filter(
        (cartItem) => cartItem.productId !== item.productId
      );
      setIsAddedToCart(false);
    } else {
      cartItems.push({ ...item, count: 1 });
      setIsAddedToCart(true);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    setCartItems(cartItems);
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
        <p className="line-clamp-2 text-justify">{item.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">CHF {item.productPrice}</p>
          <button
            className={`border-2 rounded-md px-3 py-1 transition duration-300 ${
              isAddedToCart
                ? "bg-red-500 text-white border-red-500"
                : "border-[#6b463a] hover:bg-[#6b463a] hover:text-white"
            }`}
            onClick={handleToggleCart}
          >
            {isAddedToCart ? "Remove" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

FoodCard.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    foodPic: PropTypes.shape({
      contentType: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }).isRequired,
    productName: PropTypes.string.isRequired,
    ratings: PropTypes.string.isRequired,
    productPrice: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  setCartItems: PropTypes.func.isRequired,
};
