import "./About.css";
import story1 from "../../assets/story/onee.jpg";
import story2 from "../../assets/story/two.jpg";
import story3 from "../../assets/story/three.jpg";
import story4 from "../../assets/story/four.jpg";

import { useTranslation } from "react-i18next";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const container = useRef();
  const { t } = useTranslation("global");

  const { scrollYProgress } = useScroll({
    target: container,
    // offset: ["start start", "end end"],
  });
  return (
    <div>
      <div ref={container} className="relative bg-black">
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />
      </div>
      <div className="pb-[40px] lg:h-screen flex items-center justify-center">
        <section className="divide-y w-full md:w-10/12 mx-auto divide-slate-200 rounded border border-slate-200 bg-white">
          <details className="group p-4" open>
            <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
              {t("about.faq1Qn")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-ac21 desc-ac21"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 text-slate-500">{t("about.faq1Ans")}</p>
          </details>
          <details className="group p-4">
            <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
              {t("about.faq2Qn")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-ac22 desc-ac22"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 text-slate-500">{t("about.faq2Ans")}</p>
          </details>
          <details className="group p-4">
            <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
              {t("about.faq3Qn")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-labelledby="title-ac24 desc-ac24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </summary>
            <p className="mt-4 text-slate-500">{t("about.faq3Ans")}</p>
          </details>
        </section>
      </div>
    </div>
  );
}

const Section1 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const { t } = useTranslation("global");

  return (
    <motion.section
      style={{ scale, rotate }}
      className="sticky top-0 h-screen bg-gradient-to-t to-[#dadada] from-[#ebebeb] flex flex-col items-center justify-center text-black"
    >
      <div className="aboutUsIntroCont flex lg:flex-row flex-col lg:p-7">
        {/* Left Section */}
        <div className="flex-1 homePageCont p-4 mt-8">
          <p className="lg:text-6xl text-5xl text-[#FFF5E4]">
            {t("about.aboutCont")}
          </p>
          <h2 className="text-white text-[20px] mt-6">
            {t("about.aboutUsCont")}
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-4"></div>
      </div>{" "}
    </motion.section>
  );
};

const Section2 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const { t } = useTranslation("global");

  return (
    <>
      <motion.section
        style={{ scale, rotate }}
        className="relative text-white flex flex-col items-center bg-white justify-center"
        // className="h-screen w-full bg-cover bg-center bg-fixed hidden lg:block"
      >
        <div className="absolute bottom-0 left-0 right-0 top-0"></div>
        <article className="container mx-auto relative z-9 pb-10">
          <h1 className="text-4xl leading-[100%] w-full md:w-10/12 mx-auto py-14 font-semibold text-black tracking-tight text-center">
            {t("about.storyHead")}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2">
            <img
              src={story1}
              alt="img"
              data-aos="fade-right"
              data-aos-delay="100"
              className=" object-cover w-full rounded-md h-full"
            />
            <img
              src={story2}
              alt="img"
              data-aos="fade-right"
              data-aos-delay="200"
              className=" object-cover w-full rounded-md"
            />
            <img
              src={story3}
              alt="img"
              data-aos="fade-right"
              data-aos-delay="300"
              className=" object-cover w-full rounded-md h-full"
            />
            <img
              src={story4}
              alt="img"
              data-aos="fade-right"
              data-aos-delay="400"
              className=" object-cover w-full rounded-md h-full"
            />
          </div>
        </article>
      </motion.section>
    </>
  );
};
