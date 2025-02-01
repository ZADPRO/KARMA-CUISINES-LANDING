import "./About.css";
import story1 from "../../assets/story/5.jpg";
import story2 from "../../assets/story/2.jpg";
import story3 from "../../assets/story/3.jpg";
import story4 from "../../assets/story/4.jpg";

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
      className="relative lg:h-screen bg-gradient-to-t to-[#1a1919] from-[#06060e] text-white "
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <article className="container mx-auto relative z-9 ">
        <h1 className="text-6xl leading-[100%] py-10 font-semibold  tracking-tight ">
          Images That doesn't Make any sense <br /> but still in this section
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <img
            src="https://images.unsplash.com/photo-1717893777838-4e222311630b?w=1200&auto=format&fit=crop"
            alt="img"
            className=" object-cover w-full rounded-md h-full"
          />
          <img
            src="https://images.unsplash.com/photo-1717618389115-88db6d7d8f77?w=500&auto=format&fit=crop"
            alt="img"
            className=" object-cover w-full rounded-md"
          />
          <img
            src="https://images.unsplash.com/photo-1717588604557-55b2888f59a6?w=500&auto=format&fit=crop"
            alt="img"
            className=" object-cover w-full rounded-md h-full"
          />
          <img
            src="https://images.unsplash.com/photo-1713417338603-1b6b72fcade2?w=500&auto=format&fit=crop"
            alt="img"
            className=" object-cover w-full rounded-md h-full"
          />
        </div>
      </article>
    </motion.section>
  );
};
