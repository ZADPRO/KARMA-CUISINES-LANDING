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
      if (selected.length >= option.max) return; // Prevent over-selecting
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
    <div className="p-4">
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
          <h2 className="text-xl font-semibold text-white mb-3 px-4">
            {option.label}{" "}
            <span className="text-sm text-gray-300 ml-2">
              {option.type === "select"
                ? `(Bitte wähle ${option.min} - ${option.max})`
                : "(Inklusive)"}
            </span>
          </h2>

          {option.type === "select" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
              {option.items.map((item) => {
                const isSelected = (selectedItems[option.label] || []).some(
                  (i) => i.id === item.id
                );

                return (
                  <div
                    key={item.id}
                    className={`relative rounded-lg shadow-md overflow-hidden cursor-pointer border-2 ${
                      isSelected
                        ? "border-green-600 bg-green-100"
                        : "border-transparent hover:border-yellow-500"
                    }`}
                    onClick={() => handleSelectItem(option.label, item, option)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover"
                    />
                    {isItemInCart(item.id) && (
                      <div className="absolute top-2 right-2">
                        <ShoppingCart
                          size={28}
                          className="text-white bg-[#4f391d] rounded-full p-1"
                        />
                      </div>
                    )}
                    <div className="p-3 text-center">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Info Items - Display Only */}
          {option.type === "info" && (
            <div className="flex flex-wrap gap-4 px-4">
              {option.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#e9e9e9] rounded-lg p-4 flex items-center gap-4 shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Debugging Selected Items */}
      <div className="text-white px-4 mt-10">
        <h3 className="text-xl font-bold mb-2">Ausgewählte Artikel:</h3>
        <pre className="bg-black p-3 rounded-lg text-sm">
          {JSON.stringify(selectedItems, null, 2)}
        </pre>
      </div>
    </div>
  );
}
