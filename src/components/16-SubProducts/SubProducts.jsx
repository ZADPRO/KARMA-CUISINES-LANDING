import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

export default function SubProducts() {
  const location = useLocation();
  const product = location.state?.product;

  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCartItems);
  }, []);

  const isItemInCart = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.some((item) => item.id === id);
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((acc, item) => {
        const price = parseFloat(item.price.replace(" CHF", ""));
        return acc + (price * item.quantity || 0);
      }, 0)
      .toFixed(2);
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
  };

  const allRequiredOptionsSelected = () => {
    if (!product?.options) return false;

    return product.options.every((option) => {
      if (option.type !== "select") return true;
      const selected = selectedItems[option.label] || [];
      return selected.length >= option.min;
    });
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Build final selected options by combining selected and inclusive
    let finalOptions = [];

    product.options.forEach((option) => {
      if (option.type === "select") {
        const selected = selectedItems[option.label] || [];
        finalOptions.push(...selected);
      } else {
        // Add all inclusive items by default
        finalOptions.push(...option.items);
      }
    });

    const newProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      mainCategory: product.mainCategory,
      description: product.description,
      postalCode: product.postalCode,
      quantity: 1,
      selectedItems: finalOptions,
    };

    const newCart = [...cart, newProduct];
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);

    // Reset selections
    setSelectedItems({});
  };

  const toggleModal = (item) => {
    console.log("Clicked item:", item);
  };

  return (
    <div>
      <div className="subProductsMenuItem flex lg:flex-row flex-col lg:p-7">
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
              {option.label}
              <span className="text-sm text-grey ml-2">
                {option.type === "select"
                  ? `(Bitte wähle min ${option.min} - max ${option.max})`
                  : "(Inklusive)"}
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
              {option.items.length > 0 ? (
                option.items.map((item) => {
                  const isSelected =
                    (selectedItems[option.label] || []).some(
                      (i) => i.id === item.id
                    ) && option.type === "select";

                  const showCartIcon = isSelected || isItemInCart(item.id);

                  return (
                    <div
                      key={item.id}
                      className="cartItemContents relative group"
                    >
                      <div
                        className={`relative overflow-hidden rounded-lg shadow-md cursor-pointer border-2 ${
                          isSelected
                            ? "border-green-600 bg-green-100 border-4"
                            : "border-transparent"
                        }`}
                        onClick={() =>
                          option.type === "select"
                            ? handleSelectItem(option.label, item, option)
                            : toggleModal(item)
                        }
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-[160px] object-cover rounded-lg"
                        />
                        {showCartIcon && (
                          <div className="absolute top-2 right-2">
                            <ShoppingCart
                              size={32}
                              className="text-white bg-[#4f391d] rounded-full p-2"
                            />
                          </div>
                        )}
                      </div>
                      <div
                        className="foodContents text-center mt-2 cursor-pointer"
                        onClick={() =>
                          option.type === "select"
                            ? handleSelectItem(option.label, item, option)
                            : toggleModal(item)
                        }
                      >
                        <p className="text-sm font-semibold line-clamp-1">
                          {item.name}
                        </p>
                        {option.type === "info" ? (
                          <p className="text-gray-600 text-xs">
                            {item.description}
                          </p>
                        ) : (
                          <p className="text-gray-600">{item.price}</p>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No items match your search.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Add to Cart or Cart View */}
      <div className="footerBuyProducts cursor-pointer">
        {allRequiredOptionsSelected() && !isItemInCart(product?.id) ? (
          <div
            className="text-white text-center rounded-lg text-lg font-semibold"
            onClick={handleAddToCart}
          >
            Add to Cart
          </div>
        ) : (
          <div onClick={() => {}} className="text-center py-3">
            {cartItems.length > 0 ? (
              <>
                <p className="text-lg font-semibold md:hidden">
                  {cartItems.length} items in cart - CHF {calculateTotalPrice()}{" "}
                  to continue
                </p>
                <p className="hidden md:block relative">
                  <a
                    href="#"
                    className="relative inline-flex h-12 w-12 items-center justify-center text-lg text-white"
                  >
                    <ShoppingCart />
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-white px-1.5 text-sm text-black">
                      {cartItems.length}
                    </span>
                  </a>
                </p>
              </>
            ) : (
              <p className="text-lg font-semibold text-gray-500">
                No items in the cart
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
