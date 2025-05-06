import { ChevronLeft, House } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useTranslation } from "react-i18next";

import "./Orders.css";
import AddressBottomModal from "../../pages/AddressBottomModal/AddressBottomModal";
import { useNavigate } from "react-router-dom";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
    console.log("savedCart", savedCart);
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

    console.log("mappedCartItems", mappedCartItems);
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
    const missingFields = [];

    if (!savedAddress) missingFields.push("Address");
    if (!formData.firstName) missingFields.push("First Name");
    if (!formData.lastName) missingFields.push("Last Name");
    if (!formData.mobile) missingFields.push("Mobile Number");
    if (!formData.email) missingFields.push("Email");
    if (!paymentMethod) missingFields.push("Payment Method");

    if (missingFields.length > 0) {
      Swal.fire(
        "Missing Fields",
        `Please fill the following required fields:\n\n• ${missingFields.join(
          "\n• "
        )}`,
        "error"
      );
      return false;
    }

    return true;
  };

  const handlePayment = async () => {
    if (!validateFields()) return;
    console.log("validateFields");

    console.log("paymentMethod", paymentMethod);
    if (paymentMethod === "online") {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API_URL + "/userProduct/paymentGateway",
          {
            amount: grandTotal,
            currency: "CHF",
            successRedirectUrl:
              "https://karmacuisine.ch/orders?status=success&message=Payment+Successful",
            failedRedirectUrl: "https://karmacuisine.ch/orders?status=failure",
            purpose: "Test Payment",
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
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
    } else {
      PaymentPayloadToBackend("offline");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    const message = params.get("message");

    console.log("Status:", status);
    console.log("Message:", message);

    if (status === "failure") {
      alert(`Payment failed: ${message || "Unknown error"}`);
    } else if (status === "success") {
      PaymentPayloadToBackend("online");
    }
  }, []);

  const PaymentPayloadToBackend = (paymentStatus) => {
    console.log("Sending payment status to backend:", paymentStatus);
    const selectedAddress = JSON.parse(localStorage.getItem("selectedAddress"));
    console.log("selectedAddress", selectedAddress);
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    console.log("cart", cartItems);

    let payload = {
      userFName: formData.firstName,
      userLName: formData.lastName,
      userMobile: formData.mobile,
      userEmail: formData.email,
      userStreet: selectedAddress.room,
      userPostalCode: selectedAddress.postalCode,
      userZone: selectedAddress.zone,
      userCountry: selectedAddress.country,
      storeId: 1,
      transactionId: "Testing",
      paymentType: paymentStatus,
      totalAmtPaid: grandTotal,
      order: [],
    };

    cartItems.forEach((item) => {
      if (item.isCombo) {
        let comboOrder = {
          FoodId: item.refFoodId,
          FoodName: item.refFoodName,
          foodCategory: item.refFoodCategoryName,
          foodPrice: item.refPrice,
          ifCambo: true,
          subProduct: [],
        };

        // Extract subProducts from mainDishCounts and subDishCounts
        const { mainDishCounts, subDishCounts, updatedProducts } =
          item.subProducts;

        if (mainDishCounts) {
          Object.values(mainDishCounts).forEach((sub) => {
            comboOrder.subProduct.push({
              FoodName: sub.foodName,
              FoodId: sub.foodId,
              foodQuantity: sub.quantity,
              foodType: "Main Product",
            });
          });
        }

        if (subDishCounts) {
          Object.values(subDishCounts).forEach((sub) => {
            comboOrder.subProduct.push({
              FoodName: sub.foodName,
              FoodId: sub.foodId,
              foodQuantity: sub.quantity,
              foodType: "Fixed Product",
            });
          });
        }

        if (updatedProducts) {
          updatedProducts.forEach((prod) => {
            comboOrder.subProduct.push({
              FoodName: prod.refFoodName,
              FoodId: prod.refFoodId,
              foodQuantity: prod.refQuantity,
              foodType: "Fixed Product",
            });
          });
        }

        payload.order.push(comboOrder);
      } else {
        payload.order.push({
          FoodId: item.refFoodId,
          FoodName: item.refFoodName,
          foodCategory: item.refFoodCategoryName,
          foodPrice: item.refPrice,
          foodQuantity: item.count,
          ifCambo: false,
        });
      }
    });

    console.log("Payload:", payload);

    axios
      .post(
        import.meta.env.VITE_API_URL + "/userProduct/orderFood",
        {
          payload,
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
          console.log("response data =========== ", data);
          localStorage.removeItem("cart");

          // Show success Swal
          Swal.fire({
            icon: "success",
            title: "Order placed successfully!",
            showConfirmButton: false,
            timer: 2500,
          });

          // After 2500ms, navigate
          setTimeout(() => {
            navigate("/ourBrand");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 2500);
        }
      });
  };

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
    guestName: "",
    guestMobile: "",
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
              <ul className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white shadow rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-2 line">
                      <div className="text-base font-semibold line">
                        {item.name}
                      </div>
                      <div className="text-red-600 font-medium">
                        CHF {item.price}
                      </div>
                    </div>

                    {item.isCombo && item.subProducts && (
                      <div className="pl-2 text-sm text-gray-600 mb-2 space-y-1">
                        {item.subProducts.mainDishes.map((sub, i) => (
                          <div key={`main-${i}`}>
                            🍛 {sub.foodName} × {sub.quantity}
                          </div>
                        ))}
                        {item.subProducts.subDishes.map((sub, i) => (
                          <div key={`sub-${i}`}>
                            🥗 {sub.foodName} × {sub.quantity}
                          </div>
                        ))}
                        {item.subProducts.updatedProducts.map((product, i) => (
                          <div key={`updated-${i}`}>
                            🛠 {product.refFoodName} × {product.refQuantity}{" "}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">Quantity</div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="bg-red-500 text-white rounded-full w-8 h-8"
                          onClick={() => updateCartItemCount(item.id, -1)}
                        >
                          -
                        </button>
                        <span className="px-2 text-lg">{item.quantity}</span>
                        <button
                          className="bg-green-500 text-white rounded-full w-8 h-8"
                          onClick={() => updateCartItemCount(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
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
          <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between ps-2 pe-2">
              <p className="text-lg font-semibold">{t("ordersPage.total")}:</p>
              <p className="text-lg font-semibold">CHF {grandTotal}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-3 w-full md:w-10/12 mx-auto">
        <div className="p-3 ms-3 me-3 border-2 border-dashed rounded-lg surface-ground">
          <div className="flex items-center justify-between ps-2 pt-2 pe-2">
            <p className="text-lg font-semibold">{t("ordersPage.billing")}</p>
          </div>

          {/* First & Last Name */}
          <div className="flex lg:flex-row flex-col justify-center gap-3 mt-3">
            <div className="address flex justify-center lg:mt-0 mt-3 w-full">
              <input
                type="text"
                name="firstName"
                placeholder={t("ordersPage.firstName")}
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="address flex justify-center lg:mt-0 mt-3 w-full">
              <input
                type="text"
                name="lastName"
                placeholder={t("ordersPage.lastName")}
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>

          {/* Mobile & Email */}
          <div className="flex lg:flex-row flex-col justify-center gap-3 mt-3">
            <div className="address newAddress flex justify-center lg:mt-0 mt-3 w-full">
              <div className="newPhoneDiv">
                <PhoneInput
                  country={"ch"}
                  value={formData.mobile}
                  onChange={(phone) =>
                    setFormData({ ...formData, mobile: phone })
                  }
                  className="phoneInput"
                />
              </div>
            </div>
            <div className="address flex justify-center lg:mt-0 mt-3 w-full">
              <input
                type="text"
                name="email"
                placeholder={t("ordersPage.email")}
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-3 w-full md:w-10/12 mx-auto mt-5">
        <div className="p-3 ms-3 me-3 border-2 border-dashed rounded-lg surface-ground">
          <div className="flex items-center justify-between ps-2 pt-2 pe-2">
            <p className="text-lg font-semibold">
              {t("ordersPage.guestLogin")}
            </p>
          </div>

          {/* Guest Name & Mobile Number */}
          <div className="flex lg:flex-row flex-col justify-center gap-3 mt-3">
            <div className="address flex justify-center lg:mt-0 mt-3 w-full">
              <input
                type="text"
                name="guestName"
                placeholder={t("ordersPage.guestName")}
                value={formData.guestName}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="address flex justify-center lg:mt-0 mt-3 w-full">
              <div className="newPhoneDiv">
                <PhoneInput
                  country={"ch"}
                  value={formData.guestMobile}
                  onChange={(phone) =>
                    setFormData({ ...formData, guestMobile: phone })
                  }
                  className="phoneInput"
                />
              </div>
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
