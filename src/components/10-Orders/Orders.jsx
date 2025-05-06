import { ChevronLeft, House } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useTranslation } from "react-i18next";

import "./Orders.css";
import AddressBottomModal from "../../pages/AddressBottomModal/AddressBottomModal";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import decrypt from "../../helper";

export default function Orders() {
  const { t } = useTranslation("global");

  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);
  const [isAddressAvailable, setIsAddressAvailable] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/ourBrand");
  };

  useEffect(() => {
    const address = localStorage.getItem("selectedAddress");
    if (address) {
      setSavedAddress(JSON.parse(address));
    }
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const mappedCartItems = savedCart.map((item) => {
      console.log("item", item);
      if (item.isCombo && item.subProducts) {
        const mainDishes = Object.values(item.subProducts.mainDishCounts || {});
        const subDishes = Object.values(item.subProducts.subDishCounts || {});
        const updatedProducts = Object.values(
          item.subProducts.updatedProducts || {}
        );

        return {
          id: item.refFoodId || item.refMenuId,
          name: item.refFoodName,
          price: item.refPrice,
          quantity: item.count,
          isCombo: true,
          subProducts: {
            mainDishes,
            subDishes,
            updatedProducts,
          },
        };
      } else {
        return {
          id: item.refFoodId || item.refMenuId,
          name: item.refFoodName || `Item ${item.refMenuId}`,
          price: item.refPrice || "0.00",
          quantity: item.count,
          isCombo: false,
        };
      }
    });

    setCartItems(mappedCartItems);
  }, []);

  const grandTotal = cartItems
    .reduce((total, item) => {
      if (item.isCombo && item.subProducts) {
        const sum = total + parseFloat(item.price);
        return sum;
      }

      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + price * quantity;
    }, 0)
    .toFixed(2);

  console.log("cartItems", cartItems);
  console.log("grandTotal", grandTotal);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const updateCartItemCount = (id, delta) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === id) {
          const updatedCount = item.quantity + delta;
          return { ...item, quantity: updatedCount > 0 ? updatedCount : 0 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    if (updatedCart.length === 0) {
      Swal.fire({
        title: "Remove all items?",
        text: "The cart will be empty if you remove this item. Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, clear the cart!",
      }).then((result) => {
        if (result.isConfirmed) {
          setCartItems([]);
          localStorage.removeItem("cart");
          Swal.fire(
            "Cart Cleared!",
            "All items have been removed from your cart.",
            "success"
          );
        }
      });
    } else {
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const validateFields = () => {
    if (
      !savedAddress ||
      !formData.firstName ||
      !formData.lastName ||
      !paymentMethod
    ) {
      Swal.fire("Error", "Please fill all the required fields.", "error");
      return false;
    }
    return true;
  };

  const [paymentLink, setPaymentLink] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePayment = async () => {
    if (!validateFields()) return;
    console.log("validateFields");

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/userProduct/paymentGateway",
        {
          amount: grandTotal,
          currency: "CHF",
          successRedirectUrl: "http://localhost:5173/orders",
          failedRedirectUrl: "http://localhost:5173",
          purpose: "Test Payment",
        },
        {
          headers: {
            Authorization: localStorage.getItem("JWTtoken"),
          },
        }
      );

      const decryptedData = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log("decryptedData", decryptedData);

      if (decryptedData.success) {
        const paymentLink = decryptedData.data[0]?.link;
        if (paymentLink) {
          window.location.href = paymentLink;
        } else {
          alert("Payment link not found.");
        }
      } else {
        alert("Payment creation failed: " + decryptedData.message);
      }
    } catch (error) {
      console.error("Error while tracking:", error);
      alert("Error while tracking. Please try again.");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log("params", params);
    const result = params.get("result");
    const encryptedData = params.get("DATA");

    if (result === "0" && encryptedData) {
      const decrypted = decrypt(
        encryptedData,
        "", // or use appropriate secret if needed
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log("Decrypted failed payment data:", decrypted);

      // Show user-friendly error if available
      if (decrypted?.status === "error" || decrypted?.message) {
        alert(`Payment failed: ${decrypted.message || "Unknown error"}`);
      }
    }
  }, []);

  useEffect(() => {
    const address = localStorage.getItem("selectedAddress");
    if (address) {
      setIsAddressAvailable(true);
      const parsedAddress = JSON.parse(address);
      setSavedAddress(parsedAddress);
    } else {
      setIsAddressAvailable(false);
    }
  }, [isModalOpen]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="relative">
      <div
        className="headerContents cursor-pointer flex items-center pt-2 pb-2"
        onClick={handleBackClick}
      >
        <ChevronLeft />
        <p>{t("ordersPage.back")}</p>
      </div>
      <div className="flex flex-col p-3 w-full md:w-10/12 mx-auto">
        <div className="flex flex-col border-2 border-dashed rounded-lg surface-ground flex-auto p-4 m-3">
          <div className="contents">
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div>
                      <strong>{item.name}</strong> CHF {item.price}
                    </div>

                    {item.isCombo && item.subProducts && (
                      <div className="pl-4 text-sm text-gray-600">
                        {item.subProducts.mainDishes.map((sub, i) => (
                          <div key={`main-${i}`}>
                            {sub.foodName} × {sub.quantity}
                          </div>
                        ))}
                        {item.subProducts.subDishes.map((sub, i) => (
                          <div key={`sub-${i}`}>
                            {sub.foodName} × {sub.quantity}
                          </div>
                        ))}
                        {item.subProducts.updatedProducts.map((product, i) => (
                          <div key={`updated-${i}`} className="">
                            {product.refFoodName} × {product.refQuantity} — CHF{" "}
                            {product.refPrice}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="quantity-control">
                      <button onClick={() => updateCartItemCount(item.id, -1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateCartItemCount(item.id, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <p>No orders available.</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col p-3 w-full md:w-10/12 mx-auto">
        <div className="p-3 ms-3 me-3 border-2 border-dashed rounded-lg surface-ground">
          <div className="flex items-center justify-between ps-2 pt-2 pe-2">
            <p className="text-lg font-semibold">{t("ordersPage.total")}:</p>
            <p className="text-lg font-semibold">CHF {grandTotal}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-3 w-full md:w-10/12 mx-auto">
        <div className="p-3 ms-3 me-3 border-2 border-dashed rounded-lg surface-ground">
          <div className="flex items-center justify-between ps-2 pt-2 pe-2">
            <p className="text-lg font-semibold">{t("ordersPage.billing")}</p>
          </div>
          <div className="flex lg:flex-row flex-col justify-center gap-3 mt-3">
            <div className="address flex justify-center lg:mt-0 mt-3">
              <input
                id="id-l03"
                type="text"
                name="firstName"
                placeholder={t("ordersPage.firstName")}
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="address flex justify-center lg:mt-0 mt-3">
              <input
                id="id-l03"
                type="text"
                name="lastName"
                placeholder={t("ordersPage.lastName")}
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col justify-center gap-3 mt-3">
            <div className="address flex justify-center lg:mt-0 mt-3">
              <input
                id="id-l03"
                type="text"
                name="mobile"
                placeholder={t("ordersPage.mobile")}
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="address flex justify-center lg:mt-0 mt-3">
              <input
                id="id-l03"
                type="text"
                name="email"
                placeholder={t("ordersPage.email")}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-3 w-full md:w-10/12 mx-auto">
        <div className="p-3 ms-3 me-3 border-2 border-dashed rounded-lg surface-ground">
          <h3 className="text-lg font-semibold mb-2">
            {t("ordersPage.paymentMethod")}
          </h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                className="accent-blue-500"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>{t("ordersPage.online")}</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="offline"
                className="accent-blue-500"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>{t("ordersPage.offline")}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="addAddressTabCall flex flex-col p-3 w-full md:w-10/12 mx-auto">
        <div className="p-4 ms-3 me-3 border-2 border-dashed rounded-lg surface-ground">
          {savedAddress ? (
            <>
              <div className="flex gap-3">
                <House />
                <div className="address">
                  <p>Address: {savedAddress.address}</p>
                  <p>Phone Number: {savedAddress.mobile}</p>
                </div>
              </div>
              <button
                onClick={toggleModal}
                className="useAnotherAddressButton mt-5"
              >
                {t("ordersPage.useAnotherAddress")}
              </button>
            </>
          ) : (
            <button onClick={toggleModal} className="addAddressButton">
              Add Address
            </button>
          )}
          <AddressBottomModal isOpen={isModalOpen} onClose={toggleModal} />
        </div>
      </div>
      <div className="addAddressTabCall flex pb-[15vh] flex-col p-3 w-full md:w-10/12 mx-auto"></div>

      <div
        className={`payButton ${!isAddressAvailable ? "disabled" : ""}`}
        onClick={isAddressAvailable ? handlePayment : null}
        style={{
          cursor: isAddressAvailable ? "pointer" : "not-allowed",
          opacity: isAddressAvailable ? 1 : 0.5,
        }}
      >
        {t("ordersPage.proceedToPay")}
      </div>
    </div>
  );
}
