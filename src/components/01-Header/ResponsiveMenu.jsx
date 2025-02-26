import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import english from "../../assets/language/english.svg";
import german from "../../assets/language/german.svg";
import french from "../../assets/language/french.svg";
import italian from "../../assets/language/italian.svg";

export default function ResponsiveMenu({ open, setOpen }) {
  const [languageOpen, setLanguageOpen] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("global");

  const languages = [
    { id: "en", label: "English", flag: english },
    { id: "de", label: "German", flag: german },
    { id: "fr", label: "French", flag: french },
    { id: "it", label: "Italian", flag: italian },
  ];

  useEffect(() => {
    const storedLang = localStorage.getItem("selectedLanguage");
    if (storedLang) {
      i18n.changeLanguage(storedLang);
    }
  }, [i18n]);

  const onSelectLanguage = (languageId) => {
    i18n.changeLanguage(languageId);
    localStorage.setItem("selectedLanguage", languageId);
    setLanguageOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.1 }}
          className="fixed top-20 left-0 w-full h-screen z-20"
        >
          <div className="text-xl font-semibold uppercase bg-[#cd5c08] text-white py-6 m-2 rounded-xl">
            <ul className="flex flex-col justify-start items-start gap-5 px-8">
              <li onClick={() => handleNavigation("/")}>{t("nav.home")}</li>
              <li onClick={() => handleNavigation("/about")}>
                {t("nav.about")}
              </li>
              <li onClick={() => handleNavigation("/menu")}>{t("nav.menu")}</li>
              <li onClick={() => handleNavigation("/contact")}>
                {t("nav.contact")}
              </li>

              <li onClick={() => setLanguageOpen(!languageOpen)}>
                Language
                <AnimatePresence>
                  {languageOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="mt-4 w-60 bg-white text-black rounded-lg p-3 shadow-lg"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}

ResponsiveMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
