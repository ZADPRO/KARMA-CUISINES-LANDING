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
  const fixedRef = useRef(null);
  const mainRef = useRef(null);
  const drinksRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showLeftFixed, setShowLeftFixed] = useState(false);
  const [showLeftMain, setShowLeftMain] = useState(false);
  const [showLeftDrinks, setShowLeftDrinks] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [showRightFixed, setShowRightFixed] = useState(false);
  const [showRightMain, setShowRightMain] = useState(false);
  const [showRightDrinks, setShowRightDrinks] = useState(false);

  const [cartState, setCartState] = useState({});

  const handleAddToCart = (index, isFixedProduct = false) => {
    setCartState((prev) => {
      const newCartState = { ...prev };
      if (isFixedProduct) {
        // For fixed products, we can use the index directly
        newCartState[`fixed_${index}`] = { count: 1 };
      } else {
        // For add-ons, we use the index directly
        newCartState[index] = { count: 1 };
      }
      return newCartState;
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

  const [itemCount, setItemCount] = useState(1);

  const handleIncrease = () => {
    setItemCount(itemCount + 1);
  };

  const handleDecrease = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  const handleMainAddToCart = () => {
    const mainItem = {
      refFoodId: selectedItem.refFoodId,
      refFoodName: selectedItem.refFoodName,
      refFoodCategoryName: selectedItem.refFoodCategoryName,
      refMenuId: selectedItem.refMenuId,
      refPrice: selectedItem.refPrice,
      count: itemCount,
    };

    let addons = [];

    if (selectedItem.refAddOns && selectedItem.refAddOns.length > 0) {
      selectedItem.refAddOns.forEach((addon, index) => {
        if (cartState[index]) {
          addons.push({
            refFoodId: addon.refFoodId,
            refFoodName: addon.refFoodName,
            refFoodCategoryName: addon.refFoodCategoryName,
            refMenuId: addon.refMenuId,
            refPrice: addon.refPrice,
            count: cartState[index].count,
          });
        }
      });
    }

    const cartData = [mainItem];
    if (addons.length > 0) {
      cartData.push(...addons);
    }

    // Get existing cart data from localStorage
    let existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Append the new data
    existingCart.push(cartData);

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Optional: Close modal or give feedback
    closeModal();
  };

  useEffect(() => {
    const updateScrollButtons = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft + clientWidth < scrollWidth);
      }
      if (fixedRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = fixedRef.current;
        setShowLeftFixed(scrollLeft > 0);
        setShowRightFixed(scrollLeft + clientWidth < scrollWidth);
      }
      if (mainRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = mainRef.current;
        setShowLeftMain(scrollLeft > 0);
        setShowRightMain(scrollLeft + clientWidth < scrollWidth);
      }
      if (drinksRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = drinksRef.current;
        setShowLeftDrinks(scrollLeft > 0);
        setShowRightDrinks(scrollLeft + clientWidth < scrollWidth);
      }
    };

    updateScrollButtons();

    const scrollEls = [scrollRef, fixedRef, mainRef, drinksRef];
    scrollEls.forEach((ref) =>
      ref.current?.addEventListener("scroll", updateScrollButtons)
    );

    return () => {
      scrollEls.forEach((ref) =>
        ref.current?.removeEventListener("scroll", updateScrollButtons)
      );
    };
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

  useEffect(() => {
    const checkScrollPosition = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft + clientWidth < scrollWidth);
      }
      if (fixedRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = fixedRef.current;
        setShowLeftFixed(scrollLeft > 0);
        setShowRightFixed(scrollLeft + clientWidth < scrollWidth);
      }
      if (mainRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = mainRef.current;
        setShowLeftMain(scrollLeft > 0);
        setShowRightMain(scrollLeft + clientWidth < scrollWidth);
      }
      if (drinksRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = drinksRef.current;
        setShowLeftDrinks(scrollLeft > 0);
        setShowRightDrinks(scrollLeft + clientWidth < scrollWidth);
      }
    };

    checkScrollPosition();

    const scrollEls = [scrollRef, fixedRef, mainRef, drinksRef];
    scrollEls.forEach((ref) =>
      ref.current?.addEventListener("scroll", checkScrollPosition)
    );

    return () => {
      scrollEls.forEach((ref) =>
        ref.current?.removeEventListener("scroll", checkScrollPosition)
      );
    };
  }, [selectedItem]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  const scrollLeftFixedItem = () => {
    fixedRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRightFixedItem = () => {
    fixedRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  const scrollLeftMainItem = () => {
    mainRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRightMainItem = () => {
    mainRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  const scrollLeftDrinksItem = () => {
    drinksRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRightDrinksItem = () => {
    drinksRef.current?.scrollBy({ left: 200, behavior: "smooth" });
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
        console.log("data", data);
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
        const data = decrypt(
          res.data[1],
          res.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

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

  return (
    <div ref={containerRef}>
      <div className="coverImg">
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
                  ? "bg-[#cd5c08] text-white font-semibold"
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
      <div className="flex flex-col gap-6 pb-20">
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
                    <p className="text-[15px] text-[#cd5c08] font-medium">
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
          <div className="bg-white rounded-lg w-[90%] md:w-1/2 max-h-[80vh] overflow-y-auto shadow-xl flex flex-col my-2">
            <div className="p-5">
              {/* Left side: Image */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  {selectedItem.refFoodName
                    ? selectedItem.refFoodName
                    : selectedItem.refComboName}
                </h3>
                <button onClick={closeModal} className="text-gray-500 text-xl">
                  &times;
                </button>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left side: Image */}
                <div className="flex-shrink-0 w-full lg:w-1/2 mb-4 lg:mb-0">
                  <img
                    src={
                      selectedItem.profileFile
                        ? `data:${selectedItem.profileFile.contentType};base64,${selectedItem.profileFile.content}`
                        : kingsKurryLogo
                    }
                    alt={
                      selectedItem.refFoodName
                        ? selectedItem.refFoodName
                        : selectedItem.refComboName
                    }
                    className="w-full h-60 object-cover rounded"
                  />
                </div>

                {/* Right side: Details */}
                <div className="flex flex-col w-full lg:w-1/2 lg:pl-6">
                  <div
                    className="text-gray-700 mb-2"
                    dangerouslySetInnerHTML={{
                      __html: selectedItem.refDescription
                        ? selectedItem.refDescription
                        : selectedItem.refComboDescription,
                    }}
                  />

                  <p className="text-[#cd5c08] font-semibold text-lg">
                    CHF{" "}
                    {selectedItem.refPrice
                      ? selectedItem.refPrice
                      : selectedItem.refComboPrice}
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
                </div>
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
                                    className="flex-shrink-0 w-[350px] bg-white shadow-md rounded-lg p-4 flex gap-4 items-center"
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

              {/* FIXED FOOD ITEMS */}
              {selectedItem.refFixedProduct &&
                selectedItem.refFixedProduct.length > 0 && (
                  <div className="relative">
                    <div className="relative">
                      <div
                        ref={fixedRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide px-1"
                      >
                        {selectedItem.refFixedProduct.map((addon, index) => (
                          <div
                            key={index}
                            className="flex-shrink-0 w-[350px] bg-white shadow-md rounded-lg p-4 flex gap-4 items-center"
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

                              {!cartState[`fixed_${index}`] ? (
                                <button
                                  onClick={() => handleAddToCart(index, true)} // Pass true for fixed products
                                  className="bg-[#ff7209] text-white px-3 py-1 rounded hover:bg-[#cd5c08] text-sm"
                                >
                                  Add to Cart
                                </button>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() =>
                                      handleDecrement(`fixed_${index}`)
                                    } // Use the same key for decrement
                                    className="border px-2 py-1 rounded text-sm"
                                  >
                                    -
                                  </button>
                                  <span className="font-semibold">
                                    {cartState[`fixed_${index}`].count}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleIncrement(`fixed_${index}`)
                                    } // Use the same key for increment
                                    className="border px-2 py-1 rounded text-sm"
                                  >
                                    +
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              {/* MAIN DISH */}
              {selectedItem.refMainProduct &&
                selectedItem.refMainProduct.length > 0 && (
                  <div className="relative">
                    <div className="relative">
                      <div
                        ref={mainRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide px-1"
                      >
                        {selectedItem.refMainProduct &&
                          selectedItem.refMainProduct.length > 0 && (
                            <div className="mt-4 relative">
                              <h4 className="text-xl font-semibold mb-3">
                                Main Dish
                              </h4>

                              <div className="relative">
                                <div
                                  ref={mainRef}
                                  className="flex gap-4 overflow-x-auto scrollbar-hide px-1"
                                >
                                  {selectedItem.refMainProduct.map(
                                    (addon, index) => (
                                      <div
                                        key={index}
                                        className="flex-shrink-0 w-[350px] bg-white shadow-md rounded-lg p-4 flex gap-4 items-center"
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
                                              onClick={() =>
                                                handleAddToCart(index)
                                              }
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
                                    )
                                  )}
                                </div>

                                {showLeftMain && (
                                  <button
                                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
                                    onClick={scrollLeftMainItem}
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

                                {showRightMain && (
                                  <button
                                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
                                    onClick={scrollRightMainItem}
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

                      {showLeftMain && (
                        <button
                          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 mt-8"
                          onClick={scrollLeftMainItem}
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

                      {showRightMain && (
                        <button
                          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 mt-8"
                          onClick={scrollRightMainItem}
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

              {/* SIDE DISH */}
              {selectedItem.refSideDish &&
                selectedItem.refSideDish.length > 0 && (
                  <div className="relative">
                    <div className="relative">
                      <div
                        ref={drinksRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide px-1"
                      >
                        {selectedItem.refSideDish &&
                          selectedItem.refSideDish.length > 0 && (
                            <div className="mt-4 relative">
                              <h4 className="text-xl font-semibold mb-3">
                                Drinks
                              </h4>

                              <div className="relative">
                                <div
                                  ref={drinksRef}
                                  className="flex gap-4 overflow-x-auto scrollbar-hide px-1"
                                >
                                  {selectedItem.refSideDish.map(
                                    (addon, index) => (
                                      <div
                                        key={index}
                                        className="flex-shrink-0 w-[350px] bg-white shadow-md rounded-lg p-4 flex gap-4 items-center"
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
                                              onClick={() =>
                                                handleAddToCart(index)
                                              }
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
                                    )
                                  )}
                                </div>

                                {showLeftDrinks && (
                                  <button
                                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
                                    onClick={scrollLeftDrinksItem}
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

                                {showRightDrinks && (
                                  <button
                                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
                                    onClick={scrollRightDrinksItem}
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

                      {showLeftDrinks && (
                        <button
                          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 mt-8"
                          onClick={scrollLeftDrinksItem}
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

                      {showRightDrinks && (
                        <button
                          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 mt-8"
                          onClick={scrollRightDrinksItem}
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
            <div className="sticky bottom-0 left-0 bg-white border-t flex w-full z-10">
              <button
                onClick={handleMainAddToCart}
                className="bg-[#cd5c08] text-white px-6 py-2 w-full rounded-md text-lg font-semibold hover:bg-[#a64500]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 w-full bg-white p-1 shadow-lg">
        <button
          onClick={handleAddToCart}
          className="w-full py-2 bg-[#cd5c08] text-white font-semibold rounded"
        >
          View Cart
        </button>
      </div>
    </div>
  );
}
