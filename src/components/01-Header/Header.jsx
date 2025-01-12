import { Menu, Search, ShoppingCart } from "lucide-react";
import { NavMenu } from "./data";
import ResponsiveMenu from "./ResponsiveMenu";
import { useState } from "react";

import PropTypes from "prop-types";

import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <nav>
        <div className="container flex justify-between items-center ">
          <div className="flex text-2xl items-center gap-2 font-bold py-8">
            <p>Karma Cuisines</p>
          </div>
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-500">
              {NavMenu.map((item) => {
                return (
                  <li key={item.id}>
                    <a
                      href={item.link}
                      className="inline-block py-1 px-3 hover:text-[#f95005] font-semibold"
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
              <FlyoutLink href="#" FlyoutContent={PricingContent}>
                Pricing
              </FlyoutLink>
            </ul>
          </div>
          {/* CART */}
          <div className="flex items-center gap-4">
            <button className="text-2xl hover:bg-[#f95005] hover:text-white rounded-full p-2 duration-200">
              <Search />
            </button>
            <button className="text-2xl ">
              <ShoppingCart />
            </button>
            <button className="hover:bg-[#f95005] text-[#f95005] font-semibold hover:text-white rounded-md border-2 border-[#f95005] px-6 py-2 duration-200 hidden md:block">
              Login
            </button>
          </div>
          {/* MOBILE */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <Menu className="text-4xl" />
          </div>
        </div>
      </nav>
      <ResponsiveMenu open={open} />
    </div>
  );
}

const FlyoutLink = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <a href={href} className="relative text-black">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingContent = () => {
  return (
    <div className="w-64 bg-white p-6 shadow-xl">
      <p>English</p>
      <p>German</p>
      <p>French</p>
      <p>Italian</p>
    </div>
  );
};

FlyoutLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  FlyoutContent: PropTypes.func.isRequired,
};
