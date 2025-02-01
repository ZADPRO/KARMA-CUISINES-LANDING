import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";

import english from "../../assets/language/english.svg";
import german from "../../assets/language/german.svg";
import french from "../../assets/language/french.svg";
import italian from "../../assets/language/italian.svg";

export default function ResponsiveMenu({ open }) {
  const [languageOpen, setLanguageOpen] = useState(false);

  const languages = [
    { id: "en", label: "English", flag: english },
    { id: "de", label: "German", flag: german },
    { id: "fr", label: "French", flag: french },
    { id: "it", label: "Italian", flag: italian },
  ];

  const onSelectLanguage = (languageId) => {
    console.log(`Language selected: ${languageId}`);
    // Implement language switching logic here (e.g., i18next.changeLanguage(languageId))
    setLanguageOpen(false); // Close the dropdown after selection
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
          <div className="text-xl font-semibold uppercase bg-[#db5b2d] text-white py-6 m-2 rounded-xl">
            <ul className="flex flex-col justify-start items-start gap-5 px-8">
              <li>Home</li>
              <li>About</li>
              <li>Menu</li>
              <li>Contact</li>

              <li onClick={() => setLanguageOpen(!languageOpen)} className="">
                Translate
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
};
