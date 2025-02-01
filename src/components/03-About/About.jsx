import "./About.css";
import story1 from "../../assets/story/one.jpg";
import story2 from "../../assets/story/two.jpg";
import story3 from "../../assets/story/three.jpg";
import story4 from "../../assets/story/four.jpg";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function About() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  return (
    <div>
      <main ref={container} className="relative h-[200vh] bg-black">
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />
      </main>
    </div>
  );
}

const Section1 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  return (
    <motion.section
      style={{ scale, rotate }}
      className="sticky top-0 h-screen bg-gradient-to-t to-[#dadada] from-[#ebebeb] flex flex-col items-center justify-center text-black"
    >
      <div className="aboutUsIntroCont flex lg:flex-row flex-col lg:p-7">
        {/* Left Section */}
        <div className="flex-1 homePageCont p-4 mt-8">
          <p className="lg:text-7xl text-5xl text-[#FFF5E4]">
            Great food, good karma. Elevate your taste with Us{" "}
          </p>
          <h2 className="text-white text-[20px] mt-6">
            At Karma Cuisine, we believe that great food is more than <br />
            just a meal - it's an experience.
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

  return (
    <motion.section
      style={{ scale, rotate }}
      className="relative lg:h-screen bg-gradient-to-t to-[#fffdfa] from-[#fffdfa] text-white flex items-center justify-center"
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <article className="container mx-auto relative z-9 ">
        <h1 className="text-4xl leading-[100%] py-10 font-semibold text-black tracking-tight text-center">
          The Story of Karma Cuisines: Bringing Authentic Exotic Flavors to Your
          Doorstep{" "}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
  );
};
