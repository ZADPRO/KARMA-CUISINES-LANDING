import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import spicyChicken from "../../assets/kingsKurry/spicyChicken.png";
import garlicNaan from "../../assets/kingsKurry/garlicNaan.png";
import chickenTikka from "../../assets/kingsKurry/chickenTikka.png";
import butterChicken from "../../assets/kingsKurry/butterChicken.png";
import chickenCurry from "../../assets/kingsKurry/chickenCurry.png";

import ProductDetailsModal from "../../pages/ProductDetailsModal/ProductDetailsModal";

import "./restroMenu.css";
import { ShoppingCart } from "lucide-react";
import ProductsModalLatest from "../../pages/ProductsModalLatest/ProductsModalLatest";

export default function RestroMenu() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const routePath = params.get("routePath");

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [searchTerm, setSearchTerm] = useState("");
  const [postalCodeSearch, setPostalCodeSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productModalOpen, setProductsModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      id: 1,
      name: "Spicy Chicken",
      price: "120 CHF",
      image: spicyChicken,
      postalCode: "8052",
      category: "Fast Food",
      description:
        "A fiery and flavorful chicken dish marinated with spices and grilled to perfection.",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Garlic Naan",
      price: "50 CHF",
      image: garlicNaan,
      postalCode: "8052",
      category: "Dining",
      description:
        "Soft and fluffy naan infused with fresh garlic and butter, perfect for pairing with curries.",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Chicken Tikka",
      price: "140 CHF",
      image: chickenTikka,
      postalCode: "8052",
      category: "Grill",
      description:
        "Tender, juicy chicken pieces marinated in yogurt and spices, then grilled to perfection.",
      rating: 4.6,
    },
    {
      id: 4,
      name: "Butter Chicken",
      price: "130 CHF",
      image: butterChicken,
      postalCode: "8052",
      category: "Dining",
      description:
        "A rich and creamy tomato-based curry with succulent pieces of chicken.",
      rating: 4.8,
    },
    {
      id: 5,
      name: "Chicken Curry",
      price: "125 CHF",
      image: chickenCurry,
      postalCode: "8052",
      category: "Homestyle",
      description:
        "A traditional Indian chicken curry made with aromatic spices and slow-cooked to perfection.",
      rating: 4.4,
    },
  ];

  const filteredItems = menuItems.filter(
    (item) =>
      (postalCodeSearch === "" || item.postalCode.includes(postalCodeSearch)) &&
      (searchTerm === "" ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rating.toString().includes(searchTerm))
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleModal = (product = null) => {
    if (isModalOpen) {
      // Check cart items when closing the modal
      const savedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      console.log("Cart items count:", savedCartItems.length);
    }
    setSelectedProduct(product);
    setIsModalOpen((prev) => !prev);
  };

  const productToggle = (product = null) => {
    if (productModalOpen) {
      // Check cart items when closing the modal
      const savedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      console.log("Cart items count:", savedCartItems.length);
    }
    setSelectedProduct(product);
    setProductsModalOpen((prev) => !prev);
  };

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCartItems);
  }, []);

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((acc, item) => {
        const price = parseFloat(item.price.replace(" CHF", "")); // Remove " CHF" and convert to float
        return acc + (price * item.quantity || 0);
      }, 0)
      .toFixed(2);
  };

  const isItemInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };

  const [cartItemCount, setCartItemCount] = useState(0);

  const handleCartUpdate = (count) => {
    setCartItemCount(count);
    const savedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCartItems);
  };

  return (
    <div>
      <div className="restroMenuIntroCont flex lg:flex-row flex-col lg:p-7">
        <div className="flex-1 homePageCont p-4 mt-8">
          <p className="lg:text-7xl text-5xl text-[#FFF5E4] capitalize">
            {routePath}...
          </p>
        </div>
      </div>
      {routePath === "kingsKurry" ? (
        <>
          <ProductDetailsModal
            isOpen={isModalOpen}
            onClose={toggleModal}
            product={selectedProduct}
            onCartUpdate={handleCartUpdate}
          />

          <div className="menuItems py-10 w-full md:w-11/12 mx-auto">
            <p className="text-2xl font-bold">Our excellent cuisine</p>
            <div className="flex lg:flex-row flex-col justify-center items-center w-full md:w-10/12 mx-auto">
              <div className="relative lg:my-6 my-3 mx-3 lg:w-4/12 ">
                <input
                  type="text"
                  placeholder="Search by name, category, description, or rating"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 w-full rounded border px-4 text-slate-500 outline-none focus:border-[#cd5c08]"
                />
              </div>
              <div className="relative lg:my-6 my-3 mx-3 lg:w-4/12 ">
                <input
                  type="text"
                  placeholder="Enter Postal Code To Filter"
                  value={postalCodeSearch}
                  onChange={(e) => setPostalCodeSearch(e.target.value)}
                  className="h-12 w-full rounded border px-4 text-slate-500 outline-none focus:border-[#cd5c08]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 lg:mx-24 my-5">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <div key={index} className="cartItemContents relative group">
                    <div
                      className="relative overflow-hidden rounded-lg shadow-md cursor-pointer"
                      onClick={() => toggleModal(item)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full rounded-lg"
                      />
                      {isItemInCart(item.id) && (
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
                      onClick={() => toggleModal(item)}
                    >
                      <p className="text-sm font-semibold line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-gray-600">{item.price}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No items match your search.
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen text-2xl font-bold text-gray-600">
          Products Coming Soon.
        </div>
      )}

      <div className="footerBuyProducts cursor-pointer" onClick={productToggle}>
        {cartItems.length > 0 ? (
          <>
            <p className="text-lg font-semibold md:hidden">
              {cartItems.length} items in cart - CHF {calculateTotalPrice()} to
              continue
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
          <>
            <p className="text-lg font-semibold text-gray-500 md:hidden">
              No items in the cart
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
        )}
      </div>

      <ProductsModalLatest
        isOpen={productModalOpen}
        onClose={productToggle}
        cartItems={cartItems}
      />
    </div>
  );
}
