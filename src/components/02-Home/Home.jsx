import "./Home.css";

import foodImg from "../../assets/home/thandoori.jpg";

import { ReactLenis } from "@studio-freight/react-lenis";

import image from "../../assets/home/home2.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const FoodData = [
    {
      id: 1,
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "€ 14.99",
      name: "Food Name 1",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 2,
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "€ 12.99",
      name: "Food Name 2",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 3,
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "€ 20.99",
      name: "Food Name 3",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 4,
      image: foodImg,
      rating: "⭐⭐⭐⭐⭐",
      price: "€ 16.99",
      name: "Food Name 4",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];

  return (
    <ReactLenis root>
      <div className="homePageIntroCont flex lg:flex-row flex-col lg:p-7">
        {/* Left Section */}
        <div className="flex-1 homePageCont p-4 mt-8">
          <p className="lg:text-7xl text-5xl text-[#FFF5E4]">
            The Taste That Makes You Feel Awesome
          </p>
          <button className="text-white text-[24px] rounded-3xl bg-[#cd5c08] border border-[#cd5c08] px-6 py-2 mt-6 transition duration-300">
            Explore Now
          </button>{" "}
        </div>

        {/* Right Section */}
        <div className="flex-1 p-4"></div>
      </div>
      <div className="bg-[#FFF5E4]">
        <div className="container py-14">
          {/* header section */}
          <div className="flex mb-12 items-center justify-between headerSection">
            <p></p>
            <h1 className="text-4xl font-semibold">Top List</h1>
            <p
              className="text-[17px] bg-[#cd5c08] text-white p-2 rounded-xl cursor-pointer"
              onClick={() => navigate("/menu")}
            >
              Our Menu
            </p>
          </div>
          {/* card section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {FoodData.map((item, index) => (
              <div
                key={index}
                className="bg-[#deac80] ms-2 me-2 rounded-xl hover:scale-110 transition duration-300 shadow-lg"
              >
                <img
                  src={item.image}
                  alt=""
                  className="object-cover rounded-t-xl"
                />
                <div className="space-y-2 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-white">
                      {item.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-red-500">{item.rating}</p>
                    <p className="text-lg font-semibold text-white">
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
      <main className="">
        <div className="wrapper">
          <div className="aboutMeCont lg:h-[75vh] items-center bg-[#cd5c08] justify-center flex lg:flex-row flex-col lg:p-7">
            {/* Left Section */}
            <div className="flex-1 homePageCont p-10 mt-8">
              <p className="lg:text-5xl text-3xl text-white">
                Welcome to Karma Cuisine - A Fusion of Exotic Flavors{" "}
              </p>
              <h4
                className="text-[20px] text-[#fff5e4] pt-3 font-semibold text-justify"
                style={{ textIndent: "2rem" }}
              >
                Welcome to Karma Cuisine, where exotic culinary traditions come
                together to create an unforgettable dining experience. Located
                in the heart of Switzerland, we bring you a diverse menu brand
                that blends the finest flavors of exotic cuisine all under one
                roof.
              </h4>
            </div>

            {/* Right Section */}
            <div
              className="flex-1 p-4"
              data-aos="zoom-in-right"
              data-aos-delay="200"
            >
              <img src={image} alt="" className="rotate-image" />
            </div>
          </div>{" "}
        </div>

        <section className="text-white w-full md:w-9/12 mx-auto">
          <div className="flex lg:flex-row flex-col justify-between px-16">
            <div className="sticky top-0 h-screen grid place-content-center">
              <h1 className="text-4xl text-[#000000] lg:px-8 font-medium text-center tracking-tight leading-[120%]">
                Why Choose <br /> Karma Cuisines?
              </h1>
            </div>
            <div className="grid gap-2">
              <figure className="sticky top-0 h-screen grid place-content-center">
                <article className="bg-[#ff5a00] h-72 lg:w-[30rem] w-[18rem] rounded-lg rotate-6 p-4 grid place-content-center gap-4">
                  <h1 className="text-2xl font-semibold w-full md:w-10/12 mx-auto text-center">
                    Diverse Global Cuisine:
                  </h1>
                  <p className="w-full md:w-10/12 mx-auto text-center">
                    Savor the best of exotic cuisine, all crafted with authentic
                    ingredients and traditional cooking techniques.
                  </p>
                </article>
              </figure>
              <figure className="sticky top-0 h-screen grid place-content-center">
                <article className="bg-[#cc3f02] h-72 lg:w-[30rem] w-[18rem] rounded-lg p-4 grid place-content-center gap-4">
                  <h1 className="text-2xl font-semibold w-full md:w-10/12 mx-auto text-center">
                    Fresh, Locally Sourced Ingredients:{" "}
                  </h1>
                  <p className="w-full md:w-10/12 mx-auto text-center">
                    We use only the freshest ingredients to ensure every dish
                    bursts with flavor.
                  </p>
                </article>
              </figure>
              <figure className="sticky top-0 h-screen grid place-content-center">
                <article className="bg-orange-400 h-72 lg:w-[30rem] w-[18rem] p-4 rounded-lg -rotate-6 grid place-content-center gap-4">
                  <h1 className="text-2xl font-semibold w-full md:w-10/12 mx-auto text-center">
                    Vegetarian, Vegan, and Gluten-Free Options:{" "}
                  </h1>
                  <p className="w-full md:w-10/12 mx-auto text-center">
                    We offer a variety of vegetarian, vegan, and gluten-free
                    options to cater to all dietary preferences.
                  </p>
                </article>
              </figure>
              <figure className="sticky top-0 h-screen grid place-content-center">
                <article className="bg-[#ff740a] h-72 lg:w-[30rem] w-[18rem] p-4 rounded-lg grid place-content-center gap-4">
                  <h1 className="text-2xl font-semibold w-full md:w-10/12 mx-auto text-center">
                    Friendly & Inviting Atmosphere:{" "}
                  </h1>
                  <p className="w-full md:w-10/12 mx-auto text-center">
                    Whether you're dining with family and friends or hosting an
                    event, we create an environment where everyone feels at home
                  </p>
                </article>
              </figure>
            </div>
          </div>
        </section>
      </main>
    </ReactLenis>
  );
}
