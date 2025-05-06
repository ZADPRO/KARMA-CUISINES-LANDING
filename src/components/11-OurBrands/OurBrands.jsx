import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// import mainImage from "../../assets/brands/kingKurry01.jpg";
// import subImage from "../../assets/brands/kingKurry02.jpg";

import kingsKurry01 from "../../assets/brands/kingsKurry02.jpg";
import kingsKurry02 from "../../assets/brands/kingsKurry01.jpg";

import banThai01 from "../../assets/brands/banThai01.jpg";
import banThai02 from "../../assets/brands/banThai02.jpg";

import sushi01 from "../../assets/brands/sushi03.jpg";
import sushi02 from "../../assets/brands/sushi04.jpg";

import fajithaFriends01 from "../../assets/brands/fajitha01.jpg";
import fajithaFriends02 from "../../assets/brands/fajitha02.jpg";

import momos01 from "../../assets/brands/momo01.jpg";
import momos02 from "../../assets/brands/momo02.jpg";

import b1 from "../../assets/partners/ourBrands.jpg";
import b2 from "../../assets/brandsBannerImages/b2.jpg";
import b3 from "../../assets/brandsBannerImages/b3.jpg";
import b4 from "../../assets/brandsBannerImages/b4.jpg";
import b5 from "../../assets/brandsBannerImages/b5.jpg";

import kingsKurry from "../../assets/logoNew/king01.png";
import banthai from "../../assets/logoNew/banThai01.png";
import fajitha from "../../assets/logoNew/fajitha01.png";
import sushiheaven from "../../assets/logoNew/sushi01.png";
import momos from "../../assets/logoNew/momos01.png";

import "./ourBrands.css";
import { useEffect } from "react";
import Glide from "@glidejs/glide";

export default function OurBrands() {
  const { t } = useTranslation("global");
  const navigate = useNavigate();

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

  return (
    <div className="bg-[#f9edde]">
      <div className="relative w-full h-screen">
        {/* Background Slider */}
        <div className="absolute inset-0 w-full h-full glide-04">
          <div className="overflow-hidden h-full" data-glide-el="track">
            <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full h-full overflow-hidden p-0">
              <li className="w-full h-full">
                <img src={b1} className="w-full h-full object-cover" />
              </li>
              <li className="w-full h-full">
                <img src={b2} className="w-full h-full object-cover" />
              </li>
              <li className="w-full h-full">
                <img src={b3} className="w-full h-full object-cover" />
              </li>
              <li className="w-full h-full">
                <img src={b4} className="w-full h-full object-cover" />
              </li>
              <li className="w-full h-full">
                <img src={b5} className="w-full h-full object-cover" />
              </li>
            </ul>
          </div>
        </div>

        {/* Static Content */}
        <div className="relative flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-0 text-white">
          <div className="flex lg:flex-row flex-col lg:p-7 w-full max-w-screen-xl mx-auto">
            {/* Left Section */}
            <div className="flex-1 homePageCont p-4 mt-8">
              <p className="lg:text-7xl text-4xl text-[#FFF5E4]">
                {t("ourBrands.ourBrandsHeader")}
              </p>
            </div>
            {/* Right Section */}
            <div className="flex-1 p-4"></div>
          </div>
        </div>
      </div>

      {[
        {
          name: "Kings Kurry",
          description: t("ourBrands.kingsKurry"),
          tagline: t("ourBrands.kingsKurryTagLine"),
          routePath: "kingsKurry",
          mainImage: kingsKurry01,
          subImage: kingsKurry02,
          logoImage: kingsKurry,
        },
        {
          name: "Ban Thai",
          description: t("ourBrands.banThai"),
          tagline: t("ourBrands.banThaiTagLine"),
          routePath: "banThai",
          mainImage: banThai01,
          subImage: banThai02,
          logoImage: banthai,
        },
        {
          name: "Sushi Heaven",
          description: t("ourBrands.sushiHeaven"),
          tagline: t("ourBrands.sushiHeavenTagLine"),
          routePath: "sushiHeaven",
          mainImage: sushi01,
          subImage: sushi02,
          logoImage: sushiheaven,
        },
        {
          name: "Fajita Friends",
          description: t("ourBrands.fajithaFriends"),
          tagline: t("ourBrands.fajithaFriendsTagLine"),
          routePath: "fajithaFriends",
          mainImage: fajithaFriends01,
          subImage: fajithaFriends02,
          logoImage: fajitha,
        },
        {
          name: "O! Momos",
          description: t("ourBrands.omomos"),
          tagline: t("ourBrands.omomosTagLine"),
          routePath: "oMomos",
          mainImage: momos01,
          subImage: momos02,
          logoImage: momos,
        },
      ].map((brand, index) => (
        <div
          key={index}
          data-aos="fade-right"
          data-aos-duration="1000"
          className={`brandContentsScreen w-full md:w-10/12 mx-auto flex lg:flex-row flex-col-reverse ${
            index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
          } py-10 items-center justify-center`}
        >
          <div className="flex-1 py-10">
            <div className="flex-1 relative flex justify-center items-center">
              <div className="relative w-[100%] left-[10%] lg:left-[0] lg:w-[60%]">
                <img
                  src={brand.mainImage}
                  alt="Main"
                  className="lg:w-[400px] w-[280px] h-auto rounded-lg shadow-lg rounded-ss-lg rounded-se-[60%]"
                />
              </div>

              <div className="absolute top-[55%] left-[30%] w-3/5 lg:w-[60%] transform -translate-x-1/2 -translate-y-1/2">
                <img
                  src={brand.subImage}
                  alt="Sub"
                  className="w-[200px] h-auto rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 text-center lg:text-left px-5">
            <img className="w-[300px]" src={brand.logoImage} alt="" />
            <p className="mt-2">{brand.description}</p>
            <p className="mt-2 font-semibold italic">{brand.tagline}</p>
            <button
              className="border-2 border-black px-[20px] py-[10px] rounded-md my-5"
              onClick={() => {
                if (brand.routePath === "kingsKurry") {
                  navigate(`/restroMenu?routePath=${brand.routePath}`);
                } else {
                  navigate("/comingSoon");
                }
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {t("restroMenu.orderNow")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
