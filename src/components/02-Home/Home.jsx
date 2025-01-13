import "./Home.css";

import foodImg from "../../assets/home/thandoori.jpg";

export default function Home() {
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
  ];

  return (
    <div>
      <div className="homePageIntroCont flex lg:flex-row flex-col lg:p-7">
        {/* Left Section */}
        <div className="flex-1 homePageCont p-4">
          <p className="lg:text-8xl text-5xl text-[#ddd9a5]">
            The Taste That Makes You Feel Awesome
          </p>
          <button className="text-[#ddd9a5] text-[24px] border border-[#ddd9a5] px-6 py-2 mt-6 rounded-md hover:bg-[#ddd9a5] hover:text-black transition duration-300">
            Explore Now
          </button>{" "}
        </div>

        {/* Right Section */}
        <div className="flex-1 p-4"></div>
      </div>
      <div className="h-screen">
        <div className="container py-14">
          {/* header section */}
          <div className="flex mb-12 items-center justify-between headerSection">
            <h1 className="text-5xl font-semibold">Top List</h1>
            <p className="text-xl">Our Menu</p>
          </div>
          {/* card section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {FoodData.map((item, index) => (
              <div
                key={index}
                className="bg-[#f8e5d9] ms-8 me-8 rounded-xl hover:scale-110 transition duration-300 shadow-lg"
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
      </div>{" "}
    </div>
  );
}
