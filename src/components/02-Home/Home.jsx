import "./Home.css";

// import foodImg from "../../assets/home/thandoori.jpg";

import kingsKurry from "../../assets/logoNew/king01.png";
import banthai from "../../assets/logoNew/banThai01.png";
import fajitha from "../../assets/logoNew/fajitha01.png";
import sushiheaven from "../../assets/logoNew/sushi01.png";
import momos from "../../assets/logoNew/momos01.png";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

import h1 from "../../assets/home/homeBg02.jpg";
import h2 from "../../assets/homeBannerImages/h2.jpg";
import h3 from "../../assets/homeBannerImages/h3.jpg";
import h4 from "../../assets/homeBannerImages/h4.jpg";
import h5 from "../../assets/homeBannerImages/h5.jpg";

import s1 from "../../assets/bestSellingProducts/s1.jpg";
import s2 from "../../assets/bestSellingProducts/s2.jpg";
import s3 from "../../assets/bestSellingProducts/s3.jpg";
import s4 from "../../assets/bestSellingProducts/s4.jpg";
import s5 from "../../assets/bestSellingProducts/s5.jpg";

// import img1 from "../../assets/gallery/one.png";
// import img2 from "../../assets/gallery/two.png";
// import img3 from "../../assets/gallery/three.png";
// import img4 from "../../assets/gallery/four.png";
// import img5 from "../../assets/gallery/five.png";
// import img6 from "../../assets/gallery/six.png";
// import img7 from "../../assets/gallery/seven.png";
// import img8 from "../../assets/gallery/eight.png";
// import img9 from "../../assets/home/thandoori.jpg";
import ChooseMenuHome from "../../pages/ChooseMenuHome/ChooseMenuHome";
import { useEffect, useState } from "react";
import Glide from "@glidejs/glide";

import img1 from "../../assets/collage/1.jpg";
import img2 from "../../assets/collage/12.jpg";
import img3 from "../../assets/collage/3.jpg";
import img4 from "../../assets/collage/4.jpg";
import img5 from "../../assets/collage/5.jpg";
import img6 from "../../assets/collage/6.jpg";
import img7 from "../../assets/collage/7.jpg";
import img8 from "../../assets/collage/13.jpg";
import img9 from "../../assets/collage/9.jpg";

export default function Home() {
  const { t } = useTranslation("global");

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

  useEffect(() => {
    const slider = new Glide(".glide-04", {
      type: "slider",
      focusAt: "center",
      perView: 1,
      autoplay: 2000,
      animationDuration: 700,
      gap: 0,
      classes: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  useEffect(() => {
    const slider = new Glide(".glide-05", {
      type: "slider",
      focusAt: "center",
      perView: 1,
      autoplay: 2000,
      animationDuration: 700,
      gap: 0,
      classes: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

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
      image: momos,
      name: "O'Momos",
    },
  ];

  return (
    <ReactLenis root>
      <div className="relative w-full h-screen">
        {/* Background Slider */}
        <div className="absolute inset-0 w-full h-full glide-04">
          <div className="overflow-hidden h-full" data-glide-el="track">
            <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full h-full overflow-hidden p-0">
              <li className="w-full h-full">
                <img src={h1} className="w-full h-full object-cover" />
              </li>
              <li className="w-full h-full">
                <img src={h2} className="w-full h-full object-cover" />
              </li>
              <li className="w-full h-full">
                <img src={h3} className="w-full h-full object-cover" />
              </li>
              <li className="w-full h-full">
                <img src={h4} className="w-full h-full object-cover" />
              </li>
              <li className="w-full h-full">
                <img src={h5} className="w-full h-full object-cover" />
              </li>
            </ul>
          </div>
        </div>

        {/* Static Content */}
        <div className="relative flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-0 text-white">
          <div className="flex lg:flex-row flex-col lg:p-7 w-full max-w-screen-xl mx-auto">
            {/* Left Section */}
            <div className="flex-1 homePageCont p-4 mt-8">
              <p className="lg:text-7xl text-5xl text-[#FFF5E4]">
                {t("home.title")}
              </p>
              <button
                className="text-white text-[24px] rounded-3xl bg-[#cd5c08] border border-[#cd5c08] px-6 py-2 mt-6 transition duration-300"
                onClick={() => navigate("/ourBrand")}
              >
                {t("home.exploreNow")}
              </button>
            </div>
            {/* Right Section */}
            <div className="flex-1 p-4"></div>
          </div>
        </div>
      </div>
      <div className="bg-[#FFF5E4]">
        <div className="container lg:h-[70vh] flex flex-col items-center justify-center py-14">
          {/* header section */}
          <div className="flex mb-12 items-center justify-center headerSection">
            <p></p>
            <h1 className="lg:text-5xl text-4xl font-semibold">
              {t("home.ourBrands")}
            </h1>
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
                  className="object-cover cursor-pointer rounded-t-xl lg:py-4 lg:px-4 border-2 border-[#cd5c08]"
                />
                <p
                  className="bg-[#cd5c08] text-white w-full cursor-pointer text-center py-2 rounded-ee-xl rounded-es-xl"
                  // onClick={() => navigate("/menu")}
                >
                  {t("home.explore")}
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
            <div className="flex-1 homePageCont p-10 mt-8">
              <p className="lg:text-5xl text-3xl text-white">
                {t("home.welcomeKarma")}
              </p>
              <h4
                className="text-[20px] text-[#fff5e4] pt-3 font-semibold text-justify"
                style={{ textIndent: "2rem" }}
              >
                {t("home.karmaCuisineCont")}
              </h4>
              <h4
                className="text-[20px] text-[#fff5e4] pt-3 font-semibold text-justify"
                style={{ textIndent: "2rem" }}
              >
                {t("home.thatsKarma")}
              </h4>
            </div>
            <div className="flex-1 p-4 w-full md:w-4/12 mx-auto">
              <div className="relative w-full h-full glide-05">
                <div className="overflow-hidden h-full" data-glide-el="track">
                  <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full h-full overflow-hidden p-0">
                    <li className="w-full lg:h-[500px]">
                      <img src={s1} className="w-full h-full object-cover" />
                    </li>
                    <li className="w-full lg:h-[500px]">
                      <img src={s2} className="w-full h-full object-cover" />
                    </li>
                    <li className="w-full lg:h-[500px]">
                      <img src={s3} className="w-full h-full object-cover" />
                    </li>
                    <li className="w-full lg:h-[500px]">
                      <img src={s4} className="w-full h-full object-cover" />
                    </li>
                    <li className="w-full lg:h-[500px]">
                      <img src={s5} className="w-full h-full object-cover" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="text-white w-full md:w-9/12 mx-auto">
          <div className="flex lg:flex-row flex-col justify-between px-16">
            <div className="sticky top-0 h-screen grid place-content-center">
              <h1 className="text-4xl text-[#000000] lg:px-8 font-medium text-center tracking-tight leading-[120%]">
                {t("home.whyChooseKarma")}
              </h1>
              <h1 className="text-4xl text-[#000000] lg:px-8 font-medium text-center tracking-tight leading-[120%]">
                Karma Cuisine?
              </h1>
            </div>
            <div className="grid gap-2">
              <figure className="sticky top-0 h-screen grid place-content-center">
                <article className="bg-[#ff5a00] h-72 lg:w-[30rem] w-[18rem] rounded-lg rotate-6 p-4 grid place-content-center gap-4">
                  <h1 className="text-2xl font-semibold w-full md:w-10/12 mx-auto text-center">
                    {t("home.whyChooseHead1")}
                  </h1>
                  <p className="w-full md:w-10/12 mx-auto text-center">
                    {t("home.whyChooseCont1")}
                  </p>
                </article>
              </figure>
              <figure className="sticky top-0 h-screen grid place-content-center">
                <article className="bg-[#cc3f02] h-72 lg:w-[30rem] w-[18rem] rounded-lg p-4 grid place-content-center gap-4">
                  <h1 className="text-2xl font-semibold w-full md:w-10/12 mx-auto text-center">
                    {t("home.whyChooseHead2")}
                  </h1>
                  <p className="w-full md:w-10/12 mx-auto text-center">
                    {t("home.whyChooseCont2")}
                  </p>
                </article>
              </figure>
              <figure className="sticky top-0 h-screen grid place-content-center">
                <article className="bg-orange-400 h-72 lg:w-[30rem] w-[18rem] p-4 rounded-lg -rotate-6 grid place-content-center gap-4">
                  <h1 className="text-2xl font-semibold w-full md:w-10/12 mx-auto text-center">
                    {t("home.whyChooseHead3")}
                  </h1>
                  <p className="w-full md:w-10/12 mx-auto text-center">
                    {t("home.whyChooseCont3")}
                  </p>
                </article>
              </figure>
            </div>
          </div>
        </section>
      </main>
      <section className="text-white w-full">
        <div className="grid grid-cols-12 gap-2">
          <div className="grid gap-2 col-span-12 md:col-span-4">
            <figure className="w-full">
              <img
                src={img1}
                alt=""
                className="transition-all duration-300 w-full h-auto sm:h-64 md:h-80 lg:h-96 object-cover rounded-md"
              />
            </figure>
            <figure className="w-full">
              <img
                src={img2}
                alt=""
                className="transition-all duration-300 w-full h-auto sm:h-64 md:h-80 lg:h-96 object-cover rounded-md"
              />
            </figure>
            <figure className="w-full">
              <img
                src={img3}
                alt=""
                className="transition-all duration-300 w-full h-auto sm:h-64 md:h-80 lg:h-96 object-cover rounded-md"
              />
            </figure>
          </div>
          {/* Sticky Section - Only Sticky on Larger Screens */}
          <div className="md:sticky top-0 md:h-screen w-full col-span-12 md:col-span-4 gap-2 grid grid-rows-3">
            <figure className="w-full">
              <img
                src={img4}
                alt=""
                className="transition-all duration-300 w-full h-auto sm:h-64 md:h-full object-cover rounded-md"
              />
            </figure>
            <figure className="w-full">
              <img
                src={img5}
                alt=""
                className="transition-all duration-300 w-full h-auto sm:h-64 md:h-full object-cover rounded-md"
              />
            </figure>
            <figure className="w-full">
              <img
                src={img6}
                alt=""
                className="transition-all duration-300 w-full h-auto sm:h-64 md:h-full object-cover rounded-md"
              />
            </figure>
          </div>
          <div className="grid gap-2 col-span-12 md:col-span-4">
            <figure className="w-full">
              <img
                src={img7}
                alt=""
                className="transition-all duration-300 w-full h-auto sm:h-64 md:h-80 lg:h-96 object-cover rounded-md"
              />
            </figure>
            <figure className="w-full">
              <img
                src={img8}
                alt=""
                className="transition-all duration-300 w-full h-auto sm:h-64 md:h-80 lg:h-96 object-cover rounded-md"
              />
            </figure>
            <figure className="w-full">
              <img
                src={img9}
                alt=""
                className="transition-all duration-300 w-full h-auto sm:h-64 md:h-80 lg:h-96 object-cover rounded-md"
              />
            </figure>
          </div>
        </div>
      </section>
    </ReactLenis>
  );
}
