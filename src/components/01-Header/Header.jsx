import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import english from "../../assets/language/english.svg";
import german from "../../assets/language/german.svg";
import french from "../../assets/language/french.svg";
import italian from "../../assets/language/italian.svg";

import logo from "../../assets/logoNew/kcWhite1.png";

import { AnimatePresence, motion } from "framer-motion";
import ResponsiveMenu from "./ResponsiveMenu";
import ProfileSidebar from "../../pages/Profile/ProfileSidebar";

export default function Header() {
  const { t, i18n } = useTranslation("global");
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const languages = [
    { id: "de", label: "German", flag: german },
    { id: "en", label: "English", flag: english },
    { id: "fr", label: "French", flag: french },
    { id: "it", label: "Italian", flag: italian },
  ];

  const currentLang =
    languages.find((lang) => lang.id === i18n.language) || languages[1];

  const handleChangeLang = (lang) => {
    setTimeout(() => {
      i18n.changeLanguage(lang);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    console.log("prev", isModalOpen);
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <nav
        className={`fixed z-10 top-0 left-0 w-full shadow-sm duration-300 ${
          scrolled ? "bg-[#CD5C08] text-[white]" : "bg-transparent text-white"
        }`}
      >
        <div className="container flex justify-between items-center mx-auto py-3">
          {/* <button
            className={`text-2xl rounded-full p-2 duration-200 ${
              scrolled
                ? "hover:bg-gray-300 hover:text-black"
                : "hover:bg-gray-300"
            }`}
            onClick={toggleModal}
          >
            <UserRound />
          </button> */}
          <ProfileSidebar isOpen={isModalOpen} onClose={toggleModal} />
          <div className="hidden md:flex flex-1 justify-end items-center gap-10">
            {NavMenu.slice(0, 3).map((item) => (
              <a
                key={item.id}
                onClick={() => {
                  navigate(item.link);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`cursor-pointer text-[16px] font-semibold duration-200 ${
                  scrolled ? "hover:text-white" : "hover:text-gray-300"
                }`}
              >
                {t(`nav.${item.id}`)}
              </a>
            ))}
          </div>

          <div className="lg:w-[25%] flex justify-center">
            <img src={logo} alt="Karma Cuisine" className="w-[200px]" />
          </div>

          <div className="hidden md:flex flex-1 justify-start items-center gap-10">
            {NavMenu.slice(3, 6).map((item) => (
              <a
                key={item.id}
                onClick={() => {
                  navigate(item.link);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`cursor-pointer text-[16px] font-semibold duration-200 ${
                  scrolled ? "hover:text-white" : "hover:text-gray-300"
                }`}
              >
                {t(`nav.${item.id}`)}
              </a>
            ))}
            <li
              onMouseEnter={() => setLanguageOpen(true)}
              onMouseLeave={() => setLanguageOpen(false)}
              className="relative list-none"
            >
              <button className="inline-block w-6 h-6 mt-2">
                <img
                  src={currentLang.flag}
                  alt={currentLang.label}
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
              <AnimatePresence>
                {languageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute top-12 w-48 bg-white text-black p-3 shadow-lg rounded-lg transform -translate-x-1/2"
                  >
                    {languages.map((lang) => (
                      <div
                        key={lang.id}
                        onClick={() => handleChangeLang(lang.id)}
                        className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                      >
                        <img
                          src={lang.flag}
                          alt={lang.label}
                          className="w-6 h-6 rounded-full"
                        />
                        <span>{lang.label}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </div>

          <li
            onMouseEnter={() => setLanguageOpen(true)}
            onMouseLeave={() => setLanguageOpen(false)}
            className="relative list-none lg:hidden block"
          >
            <button className="inline-block w-6 h-6 mt-2">
              <img
                src={currentLang.flag}
                alt={currentLang.label}
                className="w-full h-full object-cover rounded-full"
              />
            </button>
            <AnimatePresence>
              {languageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute top-12 w-48 bg-white text-black p-3 shadow-lg rounded-lg transform -translate-x-1/2"
                >
                  {languages.map((lang) => (
                    <div
                      key={lang.id}
                      onClick={() => handleChangeLang(lang.id)}
                      className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                    >
                      <img
                        src={lang.flag}
                        alt={lang.label}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{lang.label}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <Menu className="text-4xl" />
          </div>
        </div>
      </nav>

      <ResponsiveMenu open={open} setOpen={setOpen} />
    </div>
  );
}

export const NavMenu = [
  { id: "home", link: "/" },
  { id: "about", link: "/about" },
  { id: "ourBrand", link: "/ourBrand" },
  { id: "beOurPartner", link: "/beOurPartner" },
  { id: "career", link: "/career" },
  { id: "contact", link: "/contact" },
];
