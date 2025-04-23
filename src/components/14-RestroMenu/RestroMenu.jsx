import React, { useEffect, useRef, useState } from "react";
import kingskurryBanner from "../../images/restroMenu/img1.jpg";
import axios from "axios";
import decrypt from "../../helper";
import kingsKurryLogo from "../../assets/logoNew/kingsKurry.jpg";

export default function RestroMenu() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const containerRef = useRef(null);
  const refsMap = useRef({});

  const getCategory = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/userProduct/FoodList", {
        headers: {
          Authorization: localStorage.getItem("JWTtoken"),
        },
      })
      .then((res) => {
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        if (data.success) {
          const categories = data.foodItem;
          const refs = {};
          categories.forEach((cat) => {
            refs[cat.refFoodCategoryName] = React.createRef();
          });
          refsMap.current = refs;
          setCategories(categories);
        }
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleTabClick = (refKey, index) => {
    const ref = refsMap.current[refKey];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      setActiveTabIndex(index);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const offsets = categories.map((cat) => {
        const el = refsMap.current[cat.refFoodCategoryName]?.current;
        return el ? Math.abs(el.getBoundingClientRect().top - 100) : Infinity;
      });
      const closestIndex = offsets.indexOf(Math.min(...offsets));
      setActiveTabIndex(closestIndex);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  const openModal = (item) => {
    console.log("item", item);
    axios
      .post(
        import.meta.env.VITE_API_URL + "/userProduct/foodInfo",
        {
          foodId: item.refFoodId,
          foodCategory: item.refCategoryId,
        },
        {
          headers: {
            Authorization: localStorage.getItem("JWTtoken"),
          },
        }
      )
      .then((res) => {
        console.log("res", res);
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data without encrypt", data);

        if (data.success) {
          console.log("data", data);
        }
      });
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <div ref={containerRef}>
      <div className="coverImg h-[60vh]">
        <img src={kingskurryBanner} alt="" />
      </div>

      <div className="restroIntro text-center my-4">
        <p className="text-xl font-bold">Kings Kurry</p>
        <p className="text-sm text-gray-500">Indian | Indian Curry | Asian</p>
        <p className="text-sm text-gray-600">Available at 11:30 AM</p>
      </div>

      {/* Tabs */}
      <div
        className="flex overflow-x-auto gap-2 mb-4 sticky top-[60px] bg-white z-50 p-2 shadow whitespace-nowrap"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((cat, idx) => {
          const key = cat.refFoodCategoryName;
          return (
            <button
              key={idx}
              className={`px-4 py-2 min-w-max rounded transition-all ${
                activeTabIndex === idx
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-blue-100 text-blue-800"
              }`}
              onClick={() => handleTabClick(key, idx)}
            >
              {key}
            </button>
          );
        })}
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-6">
        {categories.map((cat, idx) => {
          const key = cat.refFoodCategoryName;
          return (
            <div
              key={idx}
              ref={refsMap.current[key]}
              className="p-6 rounded w-full md:w-9/12 mx-auto"
              style={{ minHeight: "300px" }}
            >
              <h2 className="text-xl font-bold mb-2">{key}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(cat.items || []).map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-4 border rounded shadow cursor-pointer hover:shadow-md transition-all"
                    onClick={() => openModal(item)}
                  >
                    <p className="font-semibold">
                      {item.refFoodName || item.refComboName}
                    </p>
                    <p
                      className="line-clamp-1"
                      dangerouslySetInnerHTML={{
                        __html:
                          item.refDescription || item.refComboDescription || "",
                      }}
                    />
                    <p className="text-[15px] text-blue-600 font-medium">
                      CHF {item.refPrice || item.refComboPrice}
                    </p>
                    <img
                      src={
                        item.profileFile
                          ? `data:${item.profileFile.contentType};base64,${item.profileFile.content}`
                          : kingsKurryLogo
                      }
                      alt=""
                      className="w-full h-40 object-cover mt-2 rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-1/2 max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {selectedItem.refFoodName || selectedItem.refComboName}
              </h3>
              <button onClick={closeModal} className="text-gray-500 text-xl">
                &times;
              </button>
            </div>
            <img
              src={
                selectedItem.profileFile
                  ? `data:${selectedItem.profileFile.contentType};base64,${selectedItem.profileFile.content}`
                  : kingsKurryLogo
              }
              alt=""
              className="w-full h-60 object-cover rounded mb-4"
            />
            <p
              className="text-gray-700 mb-2"
              dangerouslySetInnerHTML={{
                __html:
                  selectedItem.refDescription ||
                  selectedItem.refComboDescription ||
                  "",
              }}
            />
            <p className="text-blue-600 font-semibold text-lg">
              CHF {selectedItem.refPrice || selectedItem.refComboPrice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
