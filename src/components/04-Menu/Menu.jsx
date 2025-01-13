import { useState } from "react";
import SplitText from "../../pages/SplitText/SplitText";
import { Heart } from "lucide-react";

import PropTypes from "prop-types";

import "./Menu.css";
import foodImg from "../../assets/home/thandoori.jpg";

export default function Menu() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const FoodData = [
    {
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "$10.99",
      name: "Food Name 1",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "$10.99",
      name: "Food Name 2",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "$10.99",
      name: "Food Name 3",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "$10.99",
      name: "Food Name 1",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "$10.99",
      name: "Food Name 2",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "$10.99",
      name: "Food Name 3",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "$10.99",
      name: "Food Name 1",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "$10.99",
      name: "Food Name 2",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "$10.99",
      name: "Food Name 3",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];

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

      <div className="container py-14 px-10">
        {/* card section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {FoodData.map((item, index) => (
            <FoodCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FoodCard({ item }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    console.log(
      `${item.name} has been ${
        !isWishlisted ? "added to" : "removed from"
      } the wishlist.`
    );
  };

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      setIsAddedToCart(true);
      console.log(`${item.name} added to cart successfully!`);
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

      <img src={item.image} alt="" className="object-cover rounded-t-xl" />
      <div className="space-y-2 p-5">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">{item.name}</p>
          <p className="text-red-500">{item.rating}</p>
        </div>
        <p>{item.desc}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">{item.price}</p>
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
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};
