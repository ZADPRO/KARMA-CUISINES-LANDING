import "./Contact.css";
import { useState } from "react";
import Swal from "sweetalert2";

import location from "../../assets/contact/location.png";
import email from "../../assets/contact/email.png";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const [state, setState] = useState({
    "id-l11": "",
    "id-l12": "",
    "id-l13": "",
  });
  const { t } = useTranslation("global");

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (state["id-l11"] && state["id-l12"] && state["id-l13"]) {
      console.log("Success: Data submitted successfully");
      Swal.fire("Success", "Data submitted successfully", "success");
      setState({
        "id-l11": "",
        "id-l12": "",
        "id-l13": "",
      });
    } else {
      Swal.fire("Error", "Please fill all fields", "error");
    }
  };

  return (
    <div>
      <div className="contactPageCont flex lg:flex-row flex-col lg:p-7">
        {/* Left Section */}
        <div className="flex-1 homePageCont p-4 mt-8">
          <p
            className="lg:text-7xl text-5xl text-[#FFF5E4]"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            {t("contact.welcomeCont")}
          </p>
          <h4
            className="text-white text-[22px] mt-6"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            {t("contact.contactUsCont")}
          </h4>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-4"></div>
      </div>

      <div className="contactIconImages flex lg:flex-row flex-col w-full md:w-8/12 mx-auto py-14 gap-6 items-center justify-around">
        <div className="flex flex-col items-center text-center justify-center gap-2">
          <img
            src={location}
            alt=""
            className="w-[100px] h-[100px] object-contain"
          />
          <p>Schaffhausserstrasse 56,</p>
          <p>8152 Glattbrugg, Zürich, Switzerland</p>
        </div>
        <div className="flex flex-col items-center text-center justify-center gap-2">
          <img
            src={email}
            alt=""
            className="w-[100px] h-[100px] object-contain"
          />
          <p>Email</p>
          <p>info@karmacuisine.ch</p>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col lg:p-7 overflow-hidden">
        {/* Left Section */}
        <div
          className="flex-1 homePageCont p-3"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <div className="relative my-6 w-full md:w-7/12 mx-auto">
            <input
              id="id-l11"
              type="text"
              name="id-l11"
              value={state["id-l11"]}
              placeholder="Your Name"
              className="peer relative h-12 w-full rounded border border-slate-200 px-4 pl-12 text-slate-500 placeholder-transparent outline-none transition-all focus:border-[#cd5c08]"
              onChange={handleChange}
            />
            <label
              htmlFor="id-l11"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:left-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#cd5c08] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              {t("contact.name")}
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
              id="id-l12"
              type="text"
              name="id-l12"
              value={state["id-l12"]}
              placeholder="Your Email"
              className="peer relative h-12 w-full rounded border border-slate-200 px-4 pl-12 text-slate-500 placeholder-transparent outline-none transition-all focus:border-[#cd5c08]"
              onChange={handleChange}
            />
            <label
              htmlFor="id-l12"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:left-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#cd5c08] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              {t("contact.email")}
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
              id="id-l13"
              type="text"
              name="id-l13"
              value={state["id-l13"]}
              placeholder="Your Message"
              className="peer relative h-12 w-full rounded border border-slate-200 px-4 pl-12 text-slate-500 placeholder-transparent outline-none transition-all focus:border-[#cd5c08]"
              onChange={handleChange}
            />
            <label
              htmlFor="id-l13"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-10 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:left-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#cd5c08] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              {t("contact.message")}
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
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </div>
          <button
            className="my-6 w-full md:w-7/12 mx-auto flex justify-center bg-[#cd5c08] p-3 rounded text-white font-semibold uppercase"
            onClick={handleSubmit}
          >
            {" "}
            {t("contact.submitForm")}
          </button>
        </div>

        {/* Right Section */}
        <div className="flex-1 p-4" data-aos="fade-left" data-aos-delay="100">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2755.291166356684!2d8.558529576446725!3d47.43025907117414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479aa009eb4c02d5%3A0x733e539db9ff57ca!2sSchaffhauserstrasse%2056%2C%208152%20Opfikon%2C%20Switzerland!5e1!3m2!1sen!2sin!4v1741676206584!5m2!1sen!2sin"
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
