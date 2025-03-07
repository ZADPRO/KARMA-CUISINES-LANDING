import { useState } from "react";
import { useTranslation } from "react-i18next";
import careerImage from "../../assets/career/careerImg.jpg";
import "./career.css";

import career01 from "../../assets/career/career01.jpg";
import career02 from "../../assets/career/career02.jpg";
import career03 from "../../assets/career/career03.jpg";
import career04 from "../../assets/career/career04.jpg";

export default function Career() {
  const { t } = useTranslation("global");
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const cards = [
    {
      title: "Exciting Career Growth",
      image: career01,
      description:
        "Whether you're a fresher or an experienced professional, we offer a platform to learn, grow, and lead.",
    },
    {
      title: "Work with Experts",
      image: career02,
      description:
        "Get the chance to collaborate with industry leaders and gain hands-on experience in a dynamic environment.",
    },
    {
      title: "Innovative Work Culture",
      image: career03,
      description:
        "We value creativity and encourage out-of-the-box thinking to drive meaningful impact.",
    },
    {
      title: "Flexible & Inclusive Culture",
      image: career04,
      description:
        "A vibrant workplace where diversity, innovation, and flexibility fuel success.",
    },
  ];

  return (
    <>
      <div className="homePageIntroCont flex lg:flex-row flex-col lg:p-7">
        <div className="flex-1 homePageCont p-4 mt-8">
          <p
            className="lg:text-7xl text-5xl text-[#FFF5E4]"
            data-aos="fade-right"
          >
            {t("career.careerIntro")}
          </p>
        </div>
        <div className="flex-1 p-4"></div>
      </div>

      <div className="careerPageContents flex lg:flex-row flex-col items-center justify-evenly py-10 px-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${activeIndex === index ? "active" : ""} m-3`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="image">
              <img
                src={card.image}
                alt="Career Growth"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="content">
              <div className="title">{card.title}</div>
              <div className="bottom">
                <p>{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center py-20">
        **There is No current openings are available.**{" "}
      </p>
    </>
  );
}
