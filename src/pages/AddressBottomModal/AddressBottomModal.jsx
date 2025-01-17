import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import PropTypes from "prop-types";
import { ChevronDown, CircleCheckBig, House, MapPin } from "lucide-react";
import Swal from "sweetalert2";

export default function AddressBottomModal({ isOpen, onClose }) {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();
  const y = useMotionValue(0);
  const controls = useDragControls();
  const [addresses, setAddresses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [formData, setFormData] = useState({
    mode: "",
    room: "",
    postalCode: "",
    zone: "",
    country: "",
    mobile: "",
  });

  const handleAddressClick = (index) => {
    console.log("index", index);
    setSelectedIndex(index);
    const selectedAddress = addresses[index];
    if (selectedAddress) {
      localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
      window.dispatchEvent(new Event("storage"));
      Swal.fire({
        icon: "success",
        title: "Address Selected",
        text: "Address Selected Successfully",
      }).then(() => {
        handleClose();
      });
    }
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

  useEffect(() => {
    const storedAddresses = localStorage.getItem("addresses");
    if (storedAddresses) {
      console.log("storedAddresses raw data:", storedAddresses);
      const parsedAddresses = JSON.parse(storedAddresses);
      const addressArray = Object.values(parsedAddresses);
      console.log("Parsed Addresses:", addressArray);
      setAddresses(addressArray);
    }
  }, []);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSaveAddress = () => {
    const { mode, room, postalCode, zone, country, mobile } = formData;

    if (!mode || !room || !postalCode || !zone || !country || !mobile) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill all fields.",
      });
      return;
    }

    const address = `${room}, ${zone}, ${country}`;
    const newAddress = {
      mode,
      address,
      mobile,
    };

    const existingAddresses =
      JSON.parse(localStorage.getItem("addresses")) || {};
    const nextIndex = Object.keys(existingAddresses).length + 1;

    existingAddresses[nextIndex] = newAddress;
    localStorage.setItem("addresses", JSON.stringify(existingAddresses));

    setAddresses(Object.values(existingAddresses));

    Swal.fire({
      icon: "success",
      title: "Address Saved",
      text: "Your address has been saved successfully!",
    });

    setFormData({
      mode: "",
      room: "",
      postalCode: "",
      zone: "",
      country: "",
      mobile: "",
    });
  };

  const onClearAll = () => {
    setFormData({
      mode: "",
      room: "",
      postalCode: "",
      zone: "",
      country: "",
      mobile: "",
    });
    localStorage.removeItem("addresses");
    alert("All addresses cleared!");
  };

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
          <p className="pt-2 pb-2 text-[18px] font-bold">Select an Address</p>

          <div className="w-full md:w-8/12 mx-auto">
            <section className="w-full divide-slate-200 rounded">
              <details className="group p-4">
                <summary className="relative rounded flex items-center justify-between gap-3 mt-3 mb-3 border p-3 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <MapPin />
                    <p>Add New Address</p>
                  </div>
                  <ChevronDown />
                </summary>
                <div className="address flex flex-col w-full">
                  <fieldset className="flex gap-10">
                    <p>Location:</p>
                    <div className="relative inputBoxRadio flex items-center">
                      <input
                        type="radio"
                        value="home"
                        id="home"
                        name="mode"
                        onChange={handleChange}
                        checked={formData.mode === "home"}
                      />
                      <label className="pl-2 cursor-pointer text-slate-500">
                        Home
                      </label>
                    </div>
                    <div className="relative inputBoxRadio flex items-center">
                      <input
                        type="radio"
                        value="work"
                        id="work"
                        name="mode"
                        onChange={handleChange}
                        checked={formData.mode === "work"}
                      />
                      <label className="pl-2 cursor-pointer text-slate-500">
                        Work
                      </label>
                    </div>
                  </fieldset>
                  <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-4 mt-6 items-center w-full md:w-10/12 mx-auto">
                    <div className="relative address lg:mt-0 mt-3">
                      <input
                        id="id-l03"
                        type="text"
                        name="room"
                        placeholder="Room No, Street Name"
                        value={formData.room}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative lg:mt-0 mt-3">
                      <input
                        id="id-l04"
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative lg:mt-0 mt-3">
                      <input
                        id="id-l05"
                        type="text"
                        name="zone"
                        placeholder="Zone"
                        value={formData.zone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative lg:mt-0 mt-3">
                      <input
                        id="id-l06"
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative lg:mt-0 mt-3">
                      <input
                        id="id-l07"
                        type="text"
                        name="mobile"
                        placeholder="Mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="buttonSaveAddress flex items-center justify-between p-4">
                    <button
                      className="border-2 pt-1 pb-1 ps-5 pe-5 rounded-lg"
                      onClick={onClearAll}
                    >
                      Clear All
                    </button>
                    <button
                      className="border-2 pt-1 pb-1 ps-5 pe-5 rounded-lg"
                      onClick={onSaveAddress}
                    >
                      Save Address
                    </button>
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
            <div>
              {addresses.length > 0 ? (
                addresses.map((address, index) => (
                  <div
                    key={index}
                    className={`addAddressContents rounded-lg flex items-start justify-between gap-3 mt-3 mb-3 border p-3 cursor-pointer ${
                      selectedIndex === index ? "border-green-500" : ""
                    }`}
                    onClick={() => handleAddressClick(index)}
                  >
                    <div className="flex gap-3">
                      <House />
                      <div className="address">
                        <p>
                          {address.mode.charAt(0).toUpperCase() +
                            address.mode.slice(1)}
                        </p>
                        <p>Address: {address.address}</p>
                        <p>Phone Number: {address.mobile}</p>
                      </div>
                    </div>
                    {selectedIndex === index && (
                      <CircleCheckBig className="text-green-500" />
                    )}{" "}
                  </div>
                ))
              ) : (
                <p>No addresses found</p>
              )}
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
