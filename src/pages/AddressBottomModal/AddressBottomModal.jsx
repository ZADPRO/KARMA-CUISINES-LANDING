import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import PropTypes from "prop-types";
import { ChevronDown, House, MapPin } from "lucide-react";

export default function AddressBottomModal({ isOpen, onClose }) {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();
  const y = useMotionValue(0);
  const controls = useDragControls();
  const [selectedOption, setSelectedOption] = useState(null);
  console.log("selectedOption", selectedOption);

  const onValueChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      console.log("isOpen", isOpen);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={scope}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-neutral-950/70"
    >
      <motion.div
        id="drawer"
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ ease: "easeInOut" }}
        className="absolute bottom-0 h-[75vh] w-full overflow-hidden rounded-t-3xl bg-white"
        style={{ y }}
        drag="y"
        dragControls={controls}
        onDragEnd={() => {
          if (y.get() >= 100) {
            handleClose();
          }
        }}
        dragListener={false}
        dragConstraints={{ top: -100, bottom: 0 }}
      >
        <div className="w-full h-full overflow-auto pt-3 ps-4 pe-4 pb-[70px]">
          <p>Select an Address</p>

          <section className="w-full divide-slate-200 rounded">
            <details className="group p-4">
              <summary className="relative flex items-center justify-between cursor-pointer list-none gap-4 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                <div className="flex items-center gap-2">
                  <MapPin />
                  <p>Add New Address</p>
                </div>
                <ChevronDown />
              </summary>
              <div className="addAddressContents flex gap-3 mt-3 mb-3 border p-3">
                <div className="address flex flex-col w-full">
                  <fieldset className="flex gap-10">
                    <p>Location:</p>
                    <div className="relative inputBoxRadio flex items-center">
                      <input
                        className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer peer border-slate-500 checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600 checked:hover:bg-emerald-600 focus:outline-none checked:focus:border-emerald-700 checked:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                        type="radio"
                        value="home"
                        id="home"
                        name="drone"
                        onChange={onValueChange}
                      />
                      <label className="pl-2 cursor-pointer text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400">
                        Home
                      </label>
                      <svg
                        className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-labelledby="title-1 description-1"
                        role="graphics-symbol"
                      >
                        <circle cx="8" cy="8" r="4" />
                      </svg>
                    </div>
                    <div className="relative inputBoxRadio flex items-center">
                      <input
                        className="w-4 h-4 transition-colors bg-white border-2 rounded-full appearance-none cursor-pointer peer border-slate-500 checked:border-emerald-500 checked:bg-emerald-500 checked:hover:border-emerald-600 checked:hover:bg-emerald-600 focus:outline-none checked:focus:border-emerald-700 checked:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                        type="radio"
                        value="work"
                        id="work"
                        name="drone"
                        onChange={onValueChange}
                      />
                      <label className="pl-2 cursor-pointer text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400">
                        Work
                      </label>
                      <svg
                        className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-labelledby="title-2 description-2"
                        role="graphics-symbol"
                      >
                        <circle cx="8" cy="8" r="4" />
                      </svg>
                    </div>
                  </fieldset>
                  <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-4 mt-6 items-center">
                    <div className="relative lg:mt-0 mt-3">
                      <input
                        id="id-l03"
                        type="text"
                        name="id-l03"
                        placeholder="your name"
                        className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <label
                        htmlFor="id-l03"
                        className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Room No, Street Name
                      </label>
                    </div>
                    <div className="relative lg:mt-0 mt-3">
                      <input
                        id="id-l04"
                        type="text"
                        name="id-l04"
                        placeholder="your name"
                        className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <label
                        htmlFor="id-l04"
                        className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Postal Code
                      </label>
                    </div>
                    <div className="relative lg:mt-0 mt-3">
                      <input
                        id="id-l05"
                        type="text"
                        name="id-l05"
                        placeholder="your name"
                        className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <label
                        htmlFor="id-l05"
                        className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Zone
                      </label>
                    </div>
                    <div className="relative lg:mt-0 mt-3">
                      <input
                        id="id-l06"
                        type="text"
                        name="id-l06"
                        placeholder="your name"
                        className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <label
                        htmlFor="id-l06"
                        className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Country
                      </label>
                    </div>
                    <div className="relative lg:mt-0 mt-3">
                      <input
                        id="id-l07"
                        type="text"
                        name="id-l07"
                        placeholder="your name"
                        className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <label
                        htmlFor="id-l07"
                        className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Mobile
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </section>
          <div className="flex items-center justify-center">
            <hr className="flex-1 border-t-2 border-slate-300" />
            <h1 className="mx-3 text-md font-semibold text-gray-700">
              Saved Addresses
            </h1>
            <hr className="flex-1 border-t-2 border-slate-300" />
          </div>
          <div className="addAddressContents flex gap-3 mt-3 mb-3 border p-3">
            <House />
            <div className="address">
              <p>Home</p>
              <p>No 1, Logi street, Gugai, Salem</p>
              <p>Phone Number: +91 9393939393</p>
            </div>
          </div>
          <div className="addAddressContents flex gap-3 mt-3 mb-3 border p-3">
            <House />
            <div className="address">
              <p>Home</p>
              <p>No 1, Logi street, Gugai, Salem</p>
              <p>Phone Number: +91 9393939393</p>
            </div>
          </div>
          <div className="addAddressContents flex items-start gap-3 mt-3 mb-3 border p-3">
            <House />
            <div className="address">
              <p>Home</p>
              <p>No 1, Logi street, Gugai, Salem</p>
              <p>Phone Number: +91 9393939393</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

AddressBottomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
