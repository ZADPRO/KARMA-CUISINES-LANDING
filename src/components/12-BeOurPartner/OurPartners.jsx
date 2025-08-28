import "./OurPartners.css";

import partner1 from "../../assets/beOurPartner/partner1.jpg";
// import partner2 from "../../assets/beOurPartner/partner2.jpg";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import Swal from "sweetalert2";

import { Helmet } from "react-helmet-async";

export default function OurPartners() {
  const { t } = useTranslation("global");

  const [state, setState] = useState({
    restaurantName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    cuisineType: "",
    message: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { restaurantName, ownerName, email, phone, address } = state;

    if (restaurantName && ownerName && email && phone && address) {
      console.log("Success: Data submitted successfully", state);
      Swal.fire(
        "Success",
        "Your restaurant has been submitted successfully",
        "success"
      );
    } else {
      Swal.fire("Error", "Please fill all required fields", "error");
    }
  };
  return (
    <div className="">
      <Helmet>
        <title>{t("partnerTags.helmet.title")}</title>
        <meta name="description" content={t("partnerTags.helmet.description")} />
      </Helmet>
      <div className="ourPartnersIntroCont flex lg:flex-row flex-col lg:p-7">
        <div className="flex-1 homePageCont p-4 mt-8">
          <p
            className="lg:text-7xl text-5xl text-[#FFF5E4] text-center"
            data-aos="fade-up"
          >
            {t("ourPartners.beOurPartner")}
          </p>
        </div>
        {/* <div className="flex-1 p-4"></div> */}
      </div>

      <div className="flex">
        <div className=" flex lg:flex-row flex-col lg:p-7">
          <div className="flex-1 homePageCont p-4 mt-8 flex justify-center">
            <img
              src={partner1}
              alt=""
              className="w-full lg:w-3/4 h-auto object-contain"
            />
          </div>
          <div className="flex-1 p-3">
            <p className="text-[22px] uppercase font-bold pl-10">
              {t("ourPartners.howItWorks")}
            </p>
            <ul
              aria-label="How It Works"
              role="feed"
              className="relative flex flex-col w-full mx-auto gap-12 my-10 py-4 pl-6 before:absolute before:top-0 before:left-6 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-6 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200 lg:pl-0 lg:before:left-[8.5rem] lg:after:left-[8.5rem]"
            >
              <li
                role="article"
                className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-[#cd5c08] before:ring-2 before:ring-white lg:flex lg:gap-12 lg:pl-0 lg:before:left-[8.5rem]"
              >
                <h4 className="hidden text-lg font-medium leading-7 text-slate-500 lg:block lg:w-28 lg:text-right">
                  {t("ourPartners.step1")}
                </h4>
                <div className="flex flex-col flex-1 gap-4">
                  <h3 className="text-lg font-medium leading-7 text-[#cd5c08]">
                    {t("ourPartners.step1Head")}
                  </h3>
                  <p className="text-slate-500">{t("ourPartners.step1Cont")}</p>
                </div>
              </li>

              <li
                role="article"
                className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-[#cd5c08] before:ring-2 before:ring-white lg:flex lg:gap-12 lg:pl-0 lg:before:left-[8.5rem]"
              >
                <h4 className="hidden text-lg font-medium leading-7 text-slate-500 lg:block lg:w-28 lg:text-right">
                  {t("ourPartners.step2")}
                </h4>
                <div className="flex flex-col flex-1 gap-4">
                  <h3 className="text-lg font-medium leading-7 text-[#cd5c08]">
                    {t("ourPartners.step2Head")}
                  </h3>
                  <p className="text-slate-500">{t("ourPartners.step2Cont")}</p>
                </div>
              </li>

              <li
                role="article"
                className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-[#cd5c08] before:ring-2 before:ring-white lg:flex lg:gap-12 lg:pl-0 lg:before:left-[8.5rem]"
              >
                <h4 className="hidden text-lg font-medium leading-7 text-slate-500 lg:block lg:w-28 lg:text-right">
                  {t("ourPartners.step3")}
                </h4>
                <div className="flex flex-col flex-1 gap-4">
                  <h3 className="text-lg font-medium leading-7 text-[#cd5c08]">
                    {t("ourPartners.step3Head")}
                  </h3>
                  <p className="text-slate-500">{t("ourPartners.step3Cont")}</p>
                </div>
              </li>

              <li
                role="article"
                className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-[#cd5c08] before:ring-2 before:ring-white lg:flex lg:gap-12 lg:pl-0 lg:before:left-[8.5rem]"
              >
                <h4 className="hidden text-lg font-medium leading-7 text-slate-500 lg:block lg:w-28 lg:text-right">
                  {t("ourPartners.step4")}
                </h4>
                <div className="flex flex-col flex-1 gap-4">
                  <h3 className="text-lg font-medium leading-7 text-[#cd5c08]">
                    {t("ourPartners.step4Head")}
                  </h3>
                  <p className="text-slate-500">{t("ourPartners.step4Cont")}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="flex-1 homePageCont p-3"
        data-aos="fade-right"
        data-aos-delay="100"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {t("beOurPartner.becomeOurPartner")}
        </h2>
        <div className="relative my-6 w-full md:w-7/12 mx-auto">
          <input
            id="restaurantName"
            type="text"
            name="restaurantName"
            value={state.restaurantName}
            placeholder="Restaurant Name"
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 pl-12 text-slate-500 placeholder-transparent outline-none transition-all focus:border-[#cd5c08]"
            onChange={handleChange}
            required
          />
          <label
            htmlFor="restaurantName"
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-[#cd5c08] peer-required:after:content-['\00a0*'] peer-invalid:text-[#cd5c08] peer-focus:-top-2 peer-focus:left-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#cd5c08] peer-invalid:peer-focus:text-[#cd5c08] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            {t("beOurPartner.restaurantName")}{" "}
          </label>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-3 left-4 h-6 w-6 stroke-slate-400 peer-disabled:cursor-not-allowed"
            fill="none"
            aria-hidden="true"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-labelledby="title-7 description-7"
            role="graphics-symbol"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
            />
          </svg>
        </div>
        <div className="relative my-6 w-full md:w-7/12 mx-auto">
          <input
            id="ownerName"
            type="text"
            name="ownerName"
            value={state.ownerName}
            placeholder="Owner Name"
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 pl-12 text-slate-500 placeholder-transparent outline-none transition-all focus:border-[#cd5c08]"
            onChange={handleChange}
            required
          />
          <label
            htmlFor="ownerName"
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-[#cd5c08] peer-required:after:content-['\00a0*'] peer-invalid:text-[#cd5c08] peer-focus:-top-2 peer-focus:left-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#cd5c08] peer-invalid:peer-focus:text-[#cd5c08] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            {t("beOurPartner.ownerName")}{" "}
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-3 left-4 h-6 w-6 stroke-slate-400 peer-disabled:cursor-not-allowed"
            fill="none"
            aria-hidden="true"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-labelledby="title-7 description-7"
            role="graphics-symbol"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <div className="relative my-6 w-full md:w-7/12 mx-auto">
          <input
            id="email"
            type="email"
            name="email"
            value={state.email}
            placeholder="Your Email"
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 pl-12 text-slate-500 placeholder-transparent outline-none transition-all focus:border-[#cd5c08]"
            onChange={handleChange}
            required
          />
          <label
            htmlFor="email"
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-[#cd5c08] peer-required:after:content-['\00a0*'] peer-invalid:text-[#cd5c08] peer-focus:-top-2 peer-focus:left-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#cd5c08] peer-invalid:peer-focus:text-[#cd5c08] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            {t("beOurPartner.yourEmail")}{" "}
          </label>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-3 left-4 h-6 w-6 stroke-slate-400 peer-disabled:cursor-not-allowed"
            fill="none"
            aria-hidden="true"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-labelledby="title-7 description-7"
            role="graphics-symbol"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <div className="relative my-6 w-full md:w-7/12 mx-auto">
          <input
            id="phone"
            type="tel"
            name="phone"
            value={state.phone}
            placeholder="Your Phone Number"
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 pl-12 text-slate-500 placeholder-transparent outline-none transition-all focus:border-[#cd5c08]"
            onChange={handleChange}
            required
          />
          <label
            htmlFor="phone"
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-[#cd5c08] peer-required:after:content-['\00a0*'] peer-invalid:text-[#cd5c08] peer-focus:-top-2 peer-focus:left-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#cd5c08] peer-invalid:peer-focus:text-[#cd5c08] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            {t("beOurPartner.yourPhoneNumber")}{" "}
          </label>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-3 left-4 h-6 w-6 stroke-slate-400 peer-disabled:cursor-not-allowed"
            fill="none"
            aria-hidden="true"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-labelledby="title-7 description-7"
            role="graphics-symbol"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
            />
          </svg>
        </div>
        <div className="relative my-6 w-full md:w-7/12 mx-auto">
          <input
            id="address"
            type="text"
            name="address"
            value={state.address}
            placeholder="Restaurant Address"
            className="peer relative h-12 w-full rounded border border-slate-200 px-4 pl-12 text-slate-500 placeholder-transparent outline-none transition-all focus:border-[#cd5c08]"
            onChange={handleChange}
            required
          />
          <label
            htmlFor="address"
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-[#cd5c08] peer-required:after:content-['\00a0*'] peer-invalid:text-[#cd5c08] peer-focus:-top-2 peer-focus:left-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#cd5c08] peer-invalid:peer-focus:text-[#cd5c08] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            {t("beOurPartner.restaurantAddress")}{" "}
          </label>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-3 left-4 h-6 w-6 stroke-slate-400 peer-disabled:cursor-not-allowed"
            fill="none"
            aria-hidden="true"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-labelledby="title-7 description-7"
            role="graphics-symbol"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        </div>

        <div className="relative my-6 w-full md:w-7/12 mx-auto">
          <textarea
            id="message"
            name="message"
            value={state.message}
            placeholder="Additional Information or Message"
            className="peer relative h-24 w-full rounded border border-slate-200 px-4 pl-12 text-slate-500 placeholder-transparent outline-none transition-all focus:border-[#cd5c08]"
            onChange={handleChange}
          />
          <label
            htmlFor="message"
            className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-invalid:text-[#cd5c08] peer-focus:-top-2 peer-focus:left-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#cd5c08] peer-invalid:peer-focus:text-[#cd5c08] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
          >
            {t("beOurPartner.additionalInfo")}{" "}
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-3 left-4 h-6 w-6 stroke-slate-400 peer-disabled:cursor-not-allowed"
            fill="none"
            aria-hidden="true"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-labelledby="title-7 description-7"
            role="graphics-symbol"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <button
          className="my-6 w-full md:w-7/12 mx-auto flex justify-center bg-[#cd5c08] p-3 rounded text-white font-semibold uppercase"
          onClick={handleSubmit}
        >
          {t("beOurPartner.submitApplication")}{" "}
        </button>
      </div>
    </div>
  );
}
