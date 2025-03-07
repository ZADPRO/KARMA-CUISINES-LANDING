{
  /* <div className="container flex justify-between items-center">
          <div className="w-[50%] lg:w-[15%] flex justify-start ms-[30px] py-3">
            <img src={logo} alt="Karma Cuisine" />
          </div>

          <div className="hidden md:block">
            <ul className="flex items-center gap-6">
              {NavMenu.map((item) => (
                <li key={item.id}>
                  <a
                    onClick={() => {
                      navigate(item.link);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`inline-block cursor-pointer text-[18px] py-1 px-3 font-semibold duration-200 ${
                      scrolled ? "hover:text-white" : "hover:text-gray-300"
                    }`}
                  >
                    {t(`nav.${item.id}`)}
                  </a>
                </li>
              ))}

              <li
                onMouseEnter={() => setLanguageOpen(true)}
                onMouseLeave={() => setLanguageOpen(false)}
                className="relative"
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
            </ul>
          </div>

          <div className="flex items-center gap-4">
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
          </div>
          <div className="flex items-center gap-4">
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
          </div>

          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <Menu className="text-4xl" />
          </div>
        </div> */
}
