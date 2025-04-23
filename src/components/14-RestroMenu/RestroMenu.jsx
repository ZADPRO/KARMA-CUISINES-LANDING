import React, { useEffect, useRef, useState } from "react";
import kingskurryBanner from "../../images/restroMenu/img1.jpg";
import axios from "axios";
import decrypt from "../../helper";
import kingsKurryLogo from "../../assets/logoNew/kingsKurry.jpg";

export default function RestroMenu() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [categories, setCategories] = useState([]);

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
          console.log("data", data);
          const categories = data.foodItem;

          // 🛠 Initialize refs here safely
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

  return (
    <div ref={containerRef}>
      <div className="coverImg h-[60vh]">
        <img src={kingskurryBanner} alt="" />
      </div>

      <div className="restroIntro">
        <p>Kings Kurry </p>
        <p>Indian | Indian Curry | Asian</p>
        <p>Available at 11:30 AM</p>
      </div>

      <div className="">
        <div className="flex overflow-x-auto gap-2 mb-4 sticky top-[60px] bg-white z-50 p-2 shadow">
          {categories.map((cat, idx) => {
            const key = cat.refFoodCategoryName;
            if (!refsMap.current[key]) {
              refsMap.current[key] = useRef(null);
            }
            return (
              <button
                key={idx}
                className={`px-4 py-2 w-auto rounded transition-all ${
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
                    <div key={itemIdx} className="p-4 border rounded shadow">
                      <p className="font-semibold">
                        {item.refFoodName || item.refComboName}
                      </p>
                      <p
                        className="line-clamp-1"
                        dangerouslySetInnerHTML={{
                          __html:
                            item.refDescription ||
                            item.refComboDescription ||
                            "",
                        }}
                      />
                      <p className="text-[15px]">
                        CHF {item.refPrice || item.refComboPrice}
                      </p>
                      {item.profileFile ? (
                        <img
                          src={`data:${item.profileFile.contentType};base64,${item.profileFile.content}`}
                          alt=""
                          className="w-full h-40 object-cover mt-2 rounded"
                        />
                      ) : (
                        <img
                          src={kingsKurryLogo}
                          alt=""
                          className="w-full h-40 object-cover mt-2 rounded"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
