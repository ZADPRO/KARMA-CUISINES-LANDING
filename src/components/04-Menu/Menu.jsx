import { useEffect, useState } from "react";
import SplitText from "../../pages/SplitText/SplitText";
import { Heart } from "lucide-react";
import PropTypes from "prop-types";
import "./Menu.css";
import foodImg from "../../assets/home/thandoori.jpg";
import BottomModal from "../../pages/BottomModal/BottomModal";

export default function Menu() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCartItems);
  }, []);

  const FoodData = [
    {
      id: 1,
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "10.99",
      name: "Food Name 1",
      count: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 2,
      image: foodImg,
      rating: "⭐⭐⭐⭐",
      price: "10.99",
      name: "Food Name 2",
      count: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 3,
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "10.99",
      name: "Food Name 3",
      count: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 4,
      image: foodImg,
      rating: "⭐⭐⭐",
      price: "10.99",
      name: "Food Name 1",
      count: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 5,
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "10.99",
      name: "Food Name 2",
      count: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 6,
      image: foodImg,
      rating: "⭐⭐⭐⭐",
      price: "10.99",
      name: "Food Name 3",
      count: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 7,
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "10.99",
      name: "Food Name 1",
      count: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 8,
      image: foodImg,
      rating: "⭐⭐⭐⭐",
      price: "10.99",
      name: "Food Name 2",
      count: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 9,
      image: foodImg,
      rating: "⭐⭐⭐⭐",
      price: "10.99",
      name: "Food Name 3",
      count: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

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
          {FoodData.map((item) => (
            <FoodCard key={item.id} item={item} setCartItems={setCartItems} />
          ))}
        </div>
      </div>
      <div className="footerBuyProducts cursor-pointer" onClick={toggleModal}>
        {cartItems.length > 0 ? (
          <p className="text-lg font-semibold">
            {cartItems.length} items in cart -{" "}
            {cartItems
              .reduce(
                (acc, item) => acc + parseFloat(item.price.replace("$", "")),
                0
              )
              .toFixed(2)}{" "}
            to continue
          </p>
        ) : (
          <p className="text-lg font-semibold text-gray-500">
            No items in the cart
          </p>
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

    const isInCart = savedCartItems.some((cartItem) => cartItem.id === item.id);
    const isInWishlist = savedWishlistItems.some(
      (wishlistItem) => wishlistItem.id === item.id
    );

    setIsAddedToCart(isInCart);
    setIsWishlisted(isInWishlist);
  }, [item.id]);

  const toggleWishlist = () => {
    setIsWishlisted((prev) => {
      const updatedWishlisted = !prev;
      const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (updatedWishlisted) {
        wishlistItems.push(item);
      } else {
        const index = wishlistItems.findIndex((i) => i.id === item.id);
        if (index !== -1) wishlistItems.splice(index, 1);
      }
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));

      console.log("Wishlist Items:", wishlistItems);
      return updatedWishlisted;
    });
  };

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      setIsAddedToCart(true);
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      cartItems.push(item);
      localStorage.setItem("cart", JSON.stringify(cartItems));

      setCartItems(cartItems); // Update the cartItems state with the new cart
    }
  };

  return (
    <div className="relative bg-[#f8e5d9] rounded-xl hover:scale-110 transition duration-300 shadow-lg">
      {/* Wishlist heart icon */}
      <div
        className="absolute top-3 right-3 cursor-pointer bg-white p-2 rounded-full"
        onClick={toggleWishlist}
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
        src={item.image}
        alt=""
        className="object-cover rounded-t-xl w-full h-[200px]"
      />
      <div className="space-y-2 p-5">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">{item.name}</p>
          <p className="text-red-500">{item.rating}</p>
        </div>
        <p>{item.desc}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">$ {item.price}</p>
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
    id: PropTypes.string.isRequired, // Ensure that item has a unique 'id'
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
  setCartItems: PropTypes.func.isRequired, // This will be used to update the cartItems
};
