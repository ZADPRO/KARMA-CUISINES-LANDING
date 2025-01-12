import "./Home.css";

import foodImg from "../../assets/home/thandoori.jpg";

export default function Home() {
  const foodItems = [
    {
      id: 1,
      name: "Tandoori Chicken",
      stars: "12.8 K",
      amount: "$12",
      img: foodImg,
    },
    { id: 2, name: "Butter Naan", stars: "100 K", amount: "$5", img: foodImg },
    {
      id: 3,
      name: "Paneer Tikka",
      stars: "15.4 K",
      amount: "$10",
      img: foodImg,
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
      <div className="flex flex-col pt-20 items-center justify-center ">
        <div className="foodHeader flex justify-between items-center w-full w-10/12 mx-auto">
          <p className="lg:text-5xl text-2xl font-bold">Our Regular Menu</p>
          <p>See All</p>
        </div>

        <div className="foodContentsCard pt-20 pb-20 flex lg:flex-row flex-col gap-20">
          {foodItems.map((food) => (
            <div
              key={food.id}
              className="foodCards relative p-6 bg-[#f8e5d9] rounded-2xl shadow-lg"
            >
              {/* Image */}
              <img
                src={food.img}
                alt={food.name}
                className="foodImage absolute -top-10 right-4 w-28 h-28 object-cover rounded-full border-4 border-[#e85557]"
              />

              {/* Text Content */}
              <div className="textContent mt-16 text-justify">
                <p className="text-xl font-semibold">{food.name}</p>
                <p className="text-yellow-500 mt-1">
                  ⭐⭐⭐⭐⭐ ({food.stars})
                </p>
              </div>

              {/* Amount and Button */}
              <div className="flex items-center gap-6 mt-4">
                <p className="font-medium">{food.amount}</p>
                <button className="text-white bg-[#f95005] px-4 py-1 rounded-md hover:bg-[#d84004] transition duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-screen">asdf</div>{" "}
    </div>
  );
}
