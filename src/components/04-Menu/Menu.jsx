import SplitText from "../../pages/SplitText/SplitText";

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
          text="Our Menu For You!!"
          className="text-7xl font-bold text-white text-center"
          delay={50}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        />{" "}
      </div>

      <div className="container py-14 px-10">
        {/* card section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {FoodData.map((item, index) => (
            <div
              key={index}
              className="bg-[#f8e5d9] rounded-xl hover:scale-110 transition duration-300 shadow-lg"
            >
              <img
                src={item.image}
                alt=""
                className="object-cover rounded-t-xl"
              />
              <div className="space-y-2 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-red-500">{item.rating}</p>
                </div>
                <p>{item.desc}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">{item.price}</p>
                  <button>Add To Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
