import { useLocation } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

export default function SubProducts() {
  const location = useLocation();
  const product = location.state?.product;

  const [selectedItems, setSelectedItems] = useState({});

  const isItemInCart = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.some((item) => item.id === id);
  };

  const handleSelectItem = (optionLabel, item, option) => {
    const selected = selectedItems[optionLabel] || [];

    const exists = selected.find((i) => i.id === item.id);
    let updated;

    if (exists) {
      updated = selected.filter((i) => i.id !== item.id);
    } else {
      if (selected.length >= option.max) return;
      updated = [...selected, item];
    }

    setSelectedItems((prev) => ({
      ...prev,
      [optionLabel]: updated,
    }));

    console.log(
      `Selected under "${optionLabel}":`,
      updated.map((i) => i.name)
    );
  };

  return (
    <div className="">
      <div className="restroMenuIntroCont flex lg:flex-row flex-col lg:p-7">
        <div className="flex-1 homePageCont p-4 mt-8">
          <p className="lg:text-7xl text-5xl text-[#FFF5E4] capitalize"></p>
        </div>
      </div>
      <div className="p-5">
        {/* Header Section */}
        <div className="bg-[#FFF5E4] p-6 rounded-lg mb-6 shadow-lg text-[#4f391d]">
          <h2 className="text-4xl font-bold mb-2">{product?.name}</h2>
          <p className="text-lg">
            Kategorie: <strong>{product?.category}</strong>
          </p>
          <p className="text-lg">
            Hauptkategorie: <strong>{product?.mainCategory}</strong>
          </p>
          <p className="text-md mt-4">{product?.description}</p>
          <p className="text-2xl font-bold mt-2 text-green-700">
            {product?.price}
          </p>
        </div>

        {/* Product Options */}
        {product?.options?.map((option, idx) => (
          <div key={idx} className="mb-10">
            <h2 className="text-xl font-semibold text-black mb-3 px-4">
              {option.label}{" "}
              <span className="text-sm text-grey ml-2">
                {option.type === "select"
                  ? `(Bitte wähle min ${option.min} - max ${option.max})`
                  : "(Inklusive)"}
              </span>
            </h2>

            {/* Select Items */}
            {option.type === "select" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                {option.items.map((item) => {
                  const isSelected = (selectedItems[option.label] || []).some(
                    (i) => i.id === item.id
                  );

                  return (
                    <div
                      key={item.id}
                      className={`cursor-pointer flex flex-col items-center text-center p-4 rounded-lg shadow-md transition border-2 ${
                        isSelected
                          ? "border-green-600 bg-green-100"
                          : "border-transparent hover:border-yellow-500 bg-[#e9e9e9]"
                      }`}
                      onClick={() =>
                        handleSelectItem(option.label, item, option)
                      }
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md mb-3"
                      />
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-sm text-gray-700">{item.price}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Info Items */}
            {option.type === "info" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                {option.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#e9e9e9] rounded-lg p-4 flex flex-col items-center text-center shadow-md"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md mb-3"
                    />
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-gray-700">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Debugging Selected Items */}
        {/* <div className="text-white px-4 mt-10">
          <h3 className="text-xl font-bold mb-2">Ausgewählte Artikel:</h3>
          <pre className="bg-black p-3 rounded-lg text-sm">
            {JSON.stringify(selectedItems, null, 2)}
          </pre>
        </div> */}
      </div>
    </div>
  );
}
