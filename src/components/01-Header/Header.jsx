import { Menu, Search, ShoppingCart } from "lucide-react";
import { NavMenu } from "./data";
import ResponsiveMenu from "./ResponsiveMenu";
import { useState } from "react";

import english from "../../assets/language/english.svg";
import german from "../../assets/language/german.svg";
import french from "../../assets/language/french.svg";
import italian from "../../assets/language/italian.svg";

import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const languages = [
    { id: "en", label: "English", flag: english },
    { id: "de", label: "German", flag: german },
    { id: "fr", label: "French", flag: french },
    { id: "it", label: "Italian", flag: italian },
  ];

  const onSelectLanguage = (languageId) => {
    console.log(`Language selected: ${languageId}`);
  };

  return (
    <div>
      <nav className="fixed bg-white z-10 top-0 left-0 w-full shadow-sm">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <div className="flex text-2xl items-center gap-2 font-bold py-5">
            <p>Karma Cuisines</p>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-black">
              {NavMenu.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.link}
                    className="inline-block text-[20px] py-1 px-3 hover:text-[#db5b2d] font-semibold"
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
                <button className="inline-block text-[20px] py-1 px-3 hover:text-[#db5b2d] font-semibold">
                  Translate
                </button>
                <AnimatePresence>
                  {languageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute top-10 w-48 bg-white p-3 shadow-lg rounded-lg transform -translate-x-1/2"
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
            <button className="text-2xl hover:bg-[#db5b2d] hover:text-white rounded-full p-2 duration-200">
              <Search />
            </button>
            <button className="text-2xl hover:bg-[#db5b2d] hover:text-white rounded-full p-2 duration-200">
              <ShoppingCart />
            </button>
            <button className="hover:bg-[#db5b2d] text-[#db5b2d] font-semibold hover:text-white rounded-md border-2 border-[#db5b2d] px-6 py-2 duration-200 hidden md:block">
              Login
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <Menu className="text-4xl" />
          </div>
        </div>
      </nav>

      <ResponsiveMenu open={open} />
    </div>
  );
}
