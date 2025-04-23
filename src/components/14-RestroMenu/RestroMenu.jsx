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

  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const [cartState, setCartState] = useState({});

  const handleAddToCart = (index) => {
    setCartState({
      ...cartState,
      [index]: { count: 1 },
    });
  };

  const handleIncrement = (index) => {
    setCartState((prev) => ({
      ...prev,
      [index]: { count: prev[index].count + 1 },
    }));
  };

  const handleDecrement = (index) => {
    const currentCount = cartState[index]?.count || 0;
    if (currentCount <= 1) {
      // Remove from cart
      const updatedState = { ...cartState };
      delete updatedState[index];
      setCartState(updatedState);
    } else {
      setCartState((prev) => ({
        ...prev,
        [index]: { count: prev[index].count - 1 },
      }));
    }
  };

  useEffect(() => {
    const updateScrollButtons = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft + clientWidth < scrollWidth);
      }
    };

    updateScrollButtons();
    scrollRef.current?.addEventListener("scroll", updateScrollButtons);
    return () =>
      scrollRef.current?.removeEventListener("scroll", updateScrollButtons);
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const checkScrollPosition = () => {
    const el = scrollRef.current;
    if (el) {
      setShowLeft(el.scrollLeft > 0);
      setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollPosition);
      return () => el.removeEventListener("scroll", checkScrollPosition);
    }
  }, [selectedItem]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

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
          console.log("data", data);
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
      const key = categories[closestIndex]?.refFoodCategoryName;
      const activeButton = document.querySelector(`[data-tab-key="${key}"]`);
      activeButton?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
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
          foodId: item.refFoodId ? item.refFoodId : item.refComboId,
          foodCategory: item.refCategoryId ? item.refCategoryId : 0,
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
          setSelectedItem(data.food[0]);
        }
      });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const [itemCount, setItemCount] = useState(1);

  const handleIncrease = () => {
    setItemCount(itemCount + 1);
  };

  const handleDecrease = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
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
              data-tab-key={key}
              className={`px-4 py-2 min-w-max rounded transition-all ${
                activeTabIndex === idx
                  ? "bg-[#ff7209] text-white font-semibold"
                  : "text-black"
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
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-1/2 max-h-[80vh] overflow-y-auto shadow-xl flex flex-col lg:flex-row my-2">
            {/* Left side: Image */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{selectedItem.refFoodName}</h3>
              <button onClick={closeModal} className="text-gray-500 text-xl">
                &times;
              </button>
            </div>
            <div className="flex-shrink-0 w-full lg:w-1/2 mb-4 lg:mb-0">
              <img
                src={
                  selectedItem.profileFile
                    ? `data:${selectedItem.profileFile.contentType};base64,${selectedItem.profileFile.content}`
                    : kingsKurryLogo
                }
                alt={selectedItem.refFoodName}
                className="w-full h-60 object-cover rounded"
              />
            </div>

            {/* Right side: Details */}
            <div className="flex flex-col w-full lg:w-1/2 lg:pl-6">
              <div
                className="text-gray-700 mb-2"
                dangerouslySetInnerHTML={{
                  __html: selectedItem.refDescription,
                }}
              />

              <p className="text-[#cd5c08] font-semibold text-lg">
                CHF {selectedItem.refPrice}
              </p>

              {/* Item Count Controls */}
              <div className="flex items-center mt-4 mb-4">
                <button
                  onClick={handleDecrease}
                  className="px-4 py-2 border rounded-full text-lg font-semibold"
                >
                  -
                </button>
                <input
                  type="text"
                  value={itemCount}
                  readOnly
                  className="mx-4 w-3 text-center rounded-full"
                />
                <button
                  onClick={handleIncrease}
                  className="px-4 py-2 border rounded-full text-lg font-semibold"
                >
                  +
                </button>
              </div>

              {/* Add-Ons (if any) */}
              {selectedItem.refAddOns && selectedItem.refAddOns.length > 0 && (
                <div className="relative">
                  <div className="relative">
                    <div
                      ref={scrollRef}
                      className="flex gap-4 overflow-x-auto scrollbar-hide px-1"
                    >
                      {selectedItem.refAddOns &&
                        selectedItem.refAddOns.length > 0 && (
                          <div className="mt-4 relative">
                            <h4 className="text-xl font-semibold mb-3">
                              Add Ons
                            </h4>

                            <div className="relative">
                              <div
                                ref={scrollRef}
                                className="flex gap-4 overflow-x-auto scrollbar-hide px-1"
                              >
                                {selectedItem.refAddOns.map((addon, index) => (
                                  <div
                                    key={index}
                                    className="flex-shrink-0 w-70 bg-white shadow-md rounded-lg p-4 flex gap-4 items-center"
                                  >
                                    <img
                                      src={
                                        addon.profileFile
                                          ? `data:${addon.profileFile.contentType};base64,${addon.profileFile.content}`
                                          : kingsKurryLogo
                                      }
                                      alt={addon.refFoodName}
                                      className="w-20 h-full object-cover rounded"
                                    />
                                    <div className="flex flex-col justify-between flex-grow">
                                      <p className="font-semibold text-gray-800">
                                        {addon.refFoodName}
                                      </p>
                                      <p
                                        className="text-sm text-gray-500"
                                        dangerouslySetInnerHTML={{
                                          __html: addon.refDescription,
                                        }}
                                      />
                                      <p className="text-[#cd5c08] font-medium mb-2">
                                        CHF {addon.refPrice}
                                      </p>

                                      {!cartState[index] ? (
                                        <button
                                          onClick={() => handleAddToCart(index)}
                                          className="bg-[#ff7209] text-white px-3 py-1 rounded hover:bg-[#cd5c08] text-sm"
                                        >
                                          Add to Cart
                                        </button>
                                      ) : (
                                        <div className="flex items-center gap-2">
                                          <button
                                            onClick={() =>
                                              handleDecrement(index)
                                            }
                                            className="border px-2 py-1 rounded text-sm"
                                          >
                                            -
                                          </button>
                                          <span className="font-semibold">
                                            {cartState[index].count}
                                          </span>
                                          <button
                                            onClick={() =>
                                              handleIncrement(index)
                                            }
                                            className=" border px-2 py-1 rounded text-sm"
                                          >
                                            +
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {showLeft && (
                                <button
                                  className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
                                  onClick={scrollLeft}
                                >
                                  <svg
                                    className="w-5 h-5 text-gray-700"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 19l-7-7 7-7"
                                    />
                                  </svg>
                                </button>
                              )}

                              {showRight && (
                                <button
                                  className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
                                  onClick={scrollRight}
                                >
                                  <svg
                                    className="w-5 h-5 text-gray-700"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                    </div>

                    {showLeft && (
                      <button
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 mt-8"
                        onClick={scrollLeft}
                      >
                        <svg
                          className="w-5 h-5 text-gray-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                    )}

                    {showRight && (
                      <button
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 mt-8"
                        onClick={scrollRight}
                      >
                        <svg
                          className="w-5 h-5 text-gray-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="fixed bottom-0 left-0 w-full bg-white p-1 shadow-lg">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-2 bg-[#cd5c08] text-white font-semibold rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
