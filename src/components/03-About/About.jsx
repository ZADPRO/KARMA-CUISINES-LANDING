import "./About.css";

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
            just a meal—it's an experience.
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-4"></div>
      </div>{" "}
    </div>
  );
}
