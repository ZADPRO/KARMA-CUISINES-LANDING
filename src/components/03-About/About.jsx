import "./About.css";
import story1 from "../../assets/story/5.jpg";
import story2 from "../../assets/story/2.jpg";
import story3 from "../../assets/story/3.jpg";
import story4 from "../../assets/story/4.jpg";

export default function About() {
  return (
    <div>
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
      <div className="p-0 flex lg:flex-row flex-col">
        {/* Left Section */}
        <div className="flex-1 homePageCont">
          <p className="lg:text-7xl text-5xl text-[#FFF5E4]">
            Great food, good karma. Elevate your taste with Us{" "}
          </p>
          <h2 className="text-white text-[20px] mt-6">
            At Karma Cuisine, we believe that great food is more than <br />
            just a meal - it's an experience.
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <img src={story1} alt="" />
        </div>
      </div>{" "}
      <div className="p-0 flex lg:flex-row flex-col">
        {/* Right Section */}
        <div className="flex-1">
          <img src={story2} alt="" />
        </div>
        {/* Left Section */}
        <div className="flex-1 homePageCont">
          <p className="lg:text-7xl text-5xl text-[#FFF5E4]">
            Great food, good karma. Elevate your taste with Us{" "}
          </p>
          <h2 className="text-white text-[20px] mt-6">
            At Karma Cuisine, we believe that great food is more than <br />
            just a meal - it's an experience.
          </h2>
        </div>
      </div>{" "}
      <div className="p-0 flex lg:flex-row flex-col">
        {/* Left Section */}
        <div className="flex-1 homePageCont">
          <p className="lg:text-7xl text-5xl text-[#FFF5E4]">
            Great food, good karma. Elevate your taste with Us{" "}
          </p>
          <h2 className="text-white text-[20px] mt-6">
            At Karma Cuisine, we believe that great food is more than <br />
            just a meal - it's an experience.
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <img src={story3} alt="" />
        </div>
      </div>{" "}
      <div className="p-0 flex lg:flex-row flex-col">
        {/* Right Section */}
        <div className="flex-1">
          <img src={story4} alt="" />
        </div>
        {/* Left Section */}
        <div className="flex-1 homePageCont">
          <p className="lg:text-7xl text-5xl text-[#FFF5E4]">
            Great food, good karma. Elevate your taste with Us{" "}
          </p>
          <h2 className="text-white text-[20px] mt-6">
            At Karma Cuisine, we believe that great food is more than <br />
            just a meal - it's an experience.
          </h2>
        </div>
      </div>{" "}
    </div>
  );
}
