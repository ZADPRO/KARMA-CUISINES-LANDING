import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./Header.css";

import { useTranslation } from "react-i18next";

import english from "../../assets/language/english.svg";
import french from "../../assets/language/french.svg";
import german from "../../assets/language/german.svg";
import italian from "../../assets/language/italian.svg";

import svgIcon from "../../assets/logo/logo.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation("global");

  const handleChangeLang = (lang) => {
    setTimeout(() => {
      i18n.changeLanguage(lang);
    });
  };

  const [menuStatus, setMenuStatus] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
    setMenuStatus(false);
  };

  const isActive = (path) =>
    location.pathname === path ? "#fca001" : "#ffffff";

  return (
    <div>
      <div className="w-full fixed top-0 left-0 z-50 bg-white">
        <div
          className={`w-full flex ${
            menuStatus ? "fixed z-50" : ""
          } justify-center items-center h-[70px] bg-[#1f1b66]`}
        >
          <div className="w-[80%] h-[10vh] lg:w-[95%] flex justify-evenly items-center">
            <div className="w-[50%] lg:w-[30%] flex justify-start">
              <h2 className="companyName mt-1 text-[#fcb026]">JP </h2>{" "}
              <h2 className="companyName mt-1 text-[#fff] ms-2"> Couriers</h2>
            </div>
            <div className="hidden lg:flex w-[90%] justify-center gap-x-10">
              <div
                className="text-[20px] text-[#ffffff] cursor-pointer font-semibold underline-animation"
                style={{ color: isActive("/") }}
                onClick={() => {
                  handleNavigation("/");
                }}
              >
                {t("nav.home")}
              </div>
              <div
                className="text-[20px] text-[#ffffff] cursor-pointer font-semibold underline-animation"
                style={{ color: isActive("/about") }}
                onClick={() => {
                  handleNavigation("/about");
                }}
              >
                {t("nav.about")}
              </div>
              <div
                className="text-[20px] text-[#ffffff] cursor-pointer font-semibold underline-animation"
                style={{ color: isActive("/menu") }}
                onClick={() => {
                  handleNavigation("/menu");
                }}
              >
                {t("nav.menu")}
              </div>
              <div
                className="text-[20px] text-[#ffffff] cursor-pointer font-semibold underline-animation"
                style={{ color: isActive("/about") }}
                onClick={() => {
                  handleNavigation("/about");
                }}
              >
                {t("nav.about")}
              </div>
              <div
                className="text-[20px] text-[#ffffff] cursor-pointer font-semibold underline-animation"
                style={{ color: isActive("/contact") }}
                onClick={() => {
                  handleNavigation("/contact");
                }}
              >
                {t("nav.contact")}
              </div>
            </div>

            <div className="w-[0%] ml-14 flex lg:hidden justify-center items-center">
              <button
                className={`relative order-10 block self-center lg:hidden ${
                  menuStatus
                    ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                    : ""
                }`}
                onClick={() => setMenuStatus(!menuStatus)}
                aria-expanded={menuStatus ? true : false}
                aria-label="Toggle navigation"
              >
                <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                  <span
                    aria-hidden="true"
                    className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-white transition-all duration-300"
                  ></span>
                  <span
                    aria-hidden="true"
                    className="absolute block h-0.5 w-6 transform rounded-full bg-white transition duration-300"
                  ></span>
                  <span
                    aria-hidden="true"
                    className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-white transition-all duration-300"
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Fullscreen Menu for Mobile */}
        <div
          className={`w-full h-[90vh] overflow-y-auto z-50 mt-[70px] fixed top-0 left-0 transition-all duration-500 ease-in-out bg-[#1f1b66] transform ${
            menuStatus
              ? "translate-x-0 opacity-100 visible"
              : "-translate-x-full opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col items-center justify-start h-full">
            <div className="w-[80%] mt-10">
              <div
                className="text-[20px] cursor-pointer py-3 font-semibold"
                style={{ color: isActive("/") }}
                onClick={() => {
                  handleNavigation("/");
                }}
              >
                Home{" "}
              </div>
              <div
                className="text-[20px] cursor-pointer  py-3 font-semibold"
                style={{ color: isActive("/about") }}
                onClick={() => {
                  handleNavigation("/about");
                }}
              >
                About
              </div>

              <div
                className="text-[20px] cursor-pointer  py-3 font-semibold"
                style={{ color: isActive("/contact") }}
                onClick={() => {
                  handleNavigation("/contact");
                }}
              >
                Customer Care
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
