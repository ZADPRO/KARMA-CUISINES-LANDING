import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./career.css";

import career01 from "../../assets/career/career01.jpg";
import career02 from "../../assets/career/career02.jpg";
import career03 from "../../assets/career/career03.jpg";
import career04 from "../../assets/career/career04.jpg";
import { Helmet } from "react-helmet-async";

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
      title: t("career.card1Title"),
      image: career01,
      description: t("career.card1Desc"),
    },
    {
      title: t("career.card2Title"),
      image: career02,
      description: t("career.card2Desc"),
    },
    {
      title: t("career.card3Title"),
      image: career03,
      description: t("career.card3Desc"),
    },
    {
      title: t("career.card4Title"),
      image: career04,
      description: t("career.card4Desc"),
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t("careerTags.helmet.title")}</title>
        <meta name="description" content={t("careerTags.helmet.description")} />
      </Helmet>
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
        {/* **There is No current openings are available.**{" "} */}
      </p>
    </>
  );
}
