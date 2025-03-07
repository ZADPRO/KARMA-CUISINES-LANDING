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

import "./ourBrands.css";

export default function OurBrands() {
  const { t } = useTranslation("global");
  const navigate = useNavigate();

  return (
    <div className="bg-[#f9edde]">
      <div className="ourBrandsIntroCont flex lg:flex-row flex-col lg:p-7">
        <div className="flex-1 ourBrandsCont p-4 mt-8">
          <p
            className="lg:text-7xl text-5xl text-[#FFF5E4] text-center"
            data-aos="fade-up"
          >
            Our Brands !!!
          </p>
        </div>
        <div className="flex-1 p-4"></div>
      </div>

      {[
        {
          name: "Kings Kurry",
          description:
            "Indian cuisine, Kings Kurry - where we bring the royal flavors of India to your table! Our menu features authentic Indian dishes, from sizzling tandoori to rich curries made with the finest spices and ingredients.",
          tagline: "Savor the royal taste of India in every bite.",
          routePath: "kingsKurry",
          mainImage: kingsKurry01,
          subImage: kingsKurry02,
        },
        {
          name: "Ban Thai",
          description:
            "Thai cuisine, Ban Thai - Our menu celebrates the vibrant and bold tastes of Thailand, from spicy curries to fresh, zesty salads, all prepared with the finest ingredients and aromatic spices.",
          tagline:
            "Indulge in Thailand's rich, authentic flavors, right at your table.",
          routePath: "banThai",
          mainImage: banThai01,
          subImage: banThai02,
        },
        {
          name: "Sushi Heaven",
          description:
            "The Art of Japanese Cuisine - Sushi Haven Our chefs craft each sushi roll with the freshest ingredients, honoring centuries of Japanese culinary artistry.",
          tagline: "Sushi is not just food; it's an art form. – Sushi Haven",
          routePath: "sushiHeaven",
          mainImage: sushi01,
          subImage: sushi02,
        },
        {
          name: "Fajita Friends",
          description:
            "Mexican Cuisine! Fajita Friends Enjoy sizzling, fresh tacos, and refreshing margaritas in a vibrant, we bring the bold tastes of Mexico to your table!",
          tagline: "Spice up your life with the flavors of Mexico!",
          routePath: "fajithaFriends",
          mainImage: fajithaFriends01,
          subImage: fajithaFriends02,
        },
        {
          name: "O! Momos",
          description:
            "The Art of Japanese Cuisine - Sushi Haven Our chefs craft each sushi roll with the freshest ingredients, honoring centuries of Japanese culinary artistry.",
          tagline: "Sushi is not just food; it's an art form. – Sushi Haven",
          routePath: "oMomos",
          mainImage: momos01,
          subImage: momos02,
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
            <p className="text-2xl font-bold">{brand.name}</p>
            <p className="mt-2">{brand.description}</p>
            <p className="mt-2 font-semibold italic">{brand.tagline}</p>
            <button
              className="border-2 border-black px-[20px] py-[10px] rounded-md my-5"
              onClick={() => {
                navigate(`/restroMenu?routePath=${brand.routePath}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              View Menu
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
