import { Menu, Search, ShoppingCart } from "lucide-react";
import { NavMenu } from "./data";
import ResponsiveMenu from "./ResponsiveMenu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import english from "../../assets/language/english.svg";
import german from "../../assets/language/german.svg";
import french from "../../assets/language/french.svg";
import italian from "../../assets/language/italian.svg";

import logo from "../../assets/logo/logo4.png";

import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const languages = [
    { id: "en", label: "English", flag: english },
    { id: "de", label: "German", flag: german },
    { id: "fr", label: "French", flag: french },
    { id: "it", label: "Italian", flag: italian },
  ];

  const onSelectLanguage = (languageId) => {
    console.log(`Language selected: ${languageId}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <nav
        className={`fixed z-10 top-0 left-0 w-full shadow-sm duration-300 ${
          scrolled ? "bg-[#CD5C08] text-[white]" : "bg-transparent text-white"
        }`}
      >
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <div className="w-[50%] lg:w-[18%] flex justify-start ms-[30px]">
            <img src={logo} alt="Karma Cuisines" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6">
              {NavMenu.map((item) => (
                <li key={item.id}>
                  <a
                    onClick={() => navigate(item.link)}
                    className={`inline-block cursor-pointer text-[20px] py-1 px-3 font-semibold duration-200 ${
                      scrolled ? "hover:text-white" : "hover:text-gray-300"
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              ))}

              {/* Translation Dropdown */}
              <li
                onMouseEnter={() => setLanguageOpen(true)}
                onMouseLeave={() => setLanguageOpen(false)}
                className="relative"
              >
                <button
                  className={`inline-block text-[20px] py-1 px-3 font-semibold duration-200 ${
                    scrolled ? "hover:text-white" : "hover:text-gray-300"
                  }`}
                >
                  Translate
                </button>
                <AnimatePresence>
                  {languageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute top-10 w-48 bg-white text-black p-3 shadow-lg rounded-lg transform -translate-x-1/2"
                    >
                      {languages.map((lang) => (
                        <div
                          key={lang.id}
                          onClick={() => onSelectLanguage(lang.id)}
                          className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                        >
                          <img
                            src={lang.flag}
                            alt={lang.label}
                            className="w-6 h-6"
                          />
                          <span>{lang.label}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </div>

          {/* Cart and Login */}
          <div className="flex items-center gap-4">
            {/* <button
              className={`text-2xl rounded-full p-2 duration-200 ${
                scrolled
                  ? "hover:bg-gray-300 hover:text-black"
                  : "hover:bg-gray-300"
              }`}
            >
              <Search />
            </button> */}
            <button
              className={`text-2xl rounded-full p-2 duration-200 ${
                scrolled
                  ? "hover:bg-gray-300 hover:text-black"
                  : "hover:bg-gray-300"
              }`}
              onClick={() => navigate("/menu")}
            >
              <ShoppingCart />
            </button>
            {/* <button
              className={`font-semibold  bg-[#cd5c08] rounded-3xl px-6 py-2 duration-200 hidden md:block ${scrolled}`}
            >
              Login
            </button> */}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <Menu className="text-4xl" />
          </div>
        </div>
      </nav>

      <ResponsiveMenu open={open} setOpen={setOpen} />
    </div>
  );
}
