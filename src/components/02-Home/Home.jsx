import "./Home.css";

// import foodImg from "../../assets/home/thandoori.jpg";

import kingsKurry from "../../assets/partners/kingsKurry1.png";
import banthai from "../../assets/partners/banthai1.png";
import fajitha from "../../assets/partners/fajithafriends1.png";
import sushiheaven from "../../assets/partners/sushiheaven1.png";

import { ReactLenis } from "@studio-freight/react-lenis";

import image from "../../assets/home/home2.png";
import { useNavigate } from "react-router-dom";

import img1 from "../../assets/gallery/one.png";
import img2 from "../../assets/gallery/two.png";
import img3 from "../../assets/gallery/three.png";
import img4 from "../../assets/gallery/four.png";
import img5 from "../../assets/gallery/five.png";
import img6 from "../../assets/gallery/six.png";
import img7 from "../../assets/gallery/seven.png";
import img8 from "../../assets/gallery/eight.png";
import img9 from "../../assets/home/thandoori.jpg";
import ChooseMenuHome from "../../pages/ChooseMenuHome/ChooseMenuHome";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const toggleModal = (foodItem = null) => {
    if (foodItem) {
      console.log("Opening modal with foodItem:", foodItem);
      setSelectedFood(foodItem);
      setIsModalOpen(true);
    } else {
      console.log("Closing modal");
      setIsModalOpen(false);
    }
  };

  const FoodData = [
    {
      id: 1,
      image: kingsKurry,
      name: "King's Kurry",
    },
    {
      id: 2,
      image: banthai,
      name: "Ban Thai",
    },
    {
      id: 3,
      image: fajitha,
      name: "Fajitha Friends",
    },
    {
      id: 4,
      image: sushiheaven,
      name: "Sushi Heaven",
    },
    {
      id: 5,
      image: sushiheaven,
      name: "O'Momos",
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
        <div className="container lg:h-[70vh] flex flex-col items-center justify-center py-14">
          {/* header section */}
          <div className="flex mb-12 items-center justify-center headerSection">
            <p></p>
            <h1 className="lg:text-5xl text-4xl font-semibold">Our Brands</h1>
            {/* <p
              className="text-[17px] bg-[#cd5c08] text-white p-2 rounded-xl cursor-pointer"
              onClick={() => navigate("/menu")}
            >
              Our Menu
            </p> */}
          </div>
          {/* card section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
            {FoodData.map((item, index) => (
              <div
                key={index}
                className="lg:ms-2 lg:me-2 ms-6 me-9 rounded-xl hover:scale-110 transition duration-300 flex flex-col items-center"
                onClick={() => toggleModal(item)}
              >
                <img
                  src={item.image}
                  alt=""
                  className="object-cover cursor-pointer rounded-t-xl lg:py-2 lg:px-2 border-2 border-[#cd5c08]"
                />
                <p className="bg-[#cd5c08] text-white w-full cursor-pointer text-center py-2 rounded-ee-xl rounded-es-xl">
                  Keep Explore
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
      {isModalOpen && (
        <ChooseMenuHome
          isOpen={isModalOpen}
          onClose={toggleModal}
          foodItem={selectedFood}
        />
      )}
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
      <section className="text-white w-full">
        <div className="grid grid-cols-12 gap-2">
          <div className="grid gap-2 col-span-4">
            <figure className=" w-full">
              <img
                src={img1}
                alt=""
                className="transition-all duration-300 w-full lg:h-96  align-bottom object-cover rounded-md "
              />
            </figure>
            <figure className=" w-full">
              <img
                src={img2}
                alt=""
                className="transition-all duration-300 w-full lg:h-96  align-bottom object-cover rounded-md "
              />
            </figure>
            <figure className=" w-full">
              <img
                src={img3}
                alt=""
                className="transition-all duration-300 w-full lg:h-96  align-bottom object-cover rounded-md "
              />
            </figure>
          </div>
          <div className="sticky top-0 lg:h-screen w-full col-span-4 gap-2  grid grid-rows-3">
            <figure className="w-full h-full">
              <img
                src={img4}
                alt=""
                className="transition-all duration-300 lg:h-full w-full  align-bottom object-cover rounded-md "
              />
            </figure>
            <figure className="w-full lg:h-full">
              <img
                src={img5}
                alt=""
                className="transition-all duration-300 lg:h-full w-full align-bottom object-cover rounded-md "
              />
            </figure>
            <figure className="w-full lg:h-full">
              <img
                src={img6}
                alt=""
                className="transition-all duration-300 lg:h-full w-full  align-bottom object-cover rounded-md "
              />
            </figure>
          </div>
          <div className="grid gap-2 col-span-4">
            <figure className="w-full">
              <img
                src={img7}
                alt=""
                className="transition-all duration-300 w-full lg:h-96  align-bottom object-cover rounded-md "
              />
            </figure>
            <figure className="w-full">
              <img
                src={img8}
                alt=""
                className="transition-all duration-300 w-full lg:h-96  align-bottom object-cover rounded-md "
              />
            </figure>
            <figure className="w-full">
              <img
                src={img9}
                alt=""
                className="transition-all duration-300 w-full lg:h-96  align-bottom object-cover rounded-md "
              />
            </figure>
          </div>
        </div>
      </section>
    </ReactLenis>
  );
}
