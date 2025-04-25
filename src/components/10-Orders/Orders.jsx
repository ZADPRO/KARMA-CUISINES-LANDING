import { ChevronLeft, House } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useTranslation } from "react-i18next";

import "./Orders.css";
import AddressBottomModal from "../../pages/AddressBottomModal/AddressBottomModal";
import { useNavigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentModel from "../../pages/PaymentModel/PaymentModel";

const stripePromise = loadStripe("pk_test_Rkr4eyMdSXZL54ZP2HKeDFMK");

export default function Orders() {
  const { t } = useTranslation("global");

  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentModule, setPaymentModule] = useState(false);
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

  const handlePayment = async () => {
    if (!validateFields()) return;

    // if (paymentMethod === "online") {
    //   const stripe = window.Stripe("pk_test_Rkr4eyMdSXZL54ZP2HKeDFMK");

    //   // Create a Checkout Session
    //   const response = await fetch(
    //     "https://api.stripe.com/v1/checkout/sessions",
    //     {
    //       method: "POST",
    //       headers: {
    //         Authorization: `Bearer rk_test_51AS1nCH3jcdlg0c0s65rMdCQpuuTm7teaMIEWjIcpgtAVHekTtm59uWBZCDuVFUMuFV3Mqhk7cPZUXfhx5wA5z8Z00x9P6Lqv0`,
    //         "Content-Type": "application/x-www-form-urlencoded",
    //       },
    //       body: new URLSearchParams({
    //         payment_method_types: ["card"],
    //         line_items: JSON.stringify(
    //           cartItems.map((item) => ({
    //             price_data: {
    //               currency: "chf",
    //               product_data: {
    //                 name: "payment",
    //               },
    //               unit_amount: 100 * 100,
    //             },
    //             quantity: item.quantity,
    //           }))
    //         ),
    //         mode: "payment",
    //         success_url: window.location.origin + "/success",
    //         cancel_url: window.location.origin + "/cancel",
    //       }),
    //     }
    //   );

    //   const session = await response.json();

    //   // Redirect to Checkout
    //   const { error } = await stripe.redirectToCheckout({
    //     sessionId: session.id,
    //   });

    //   if (error) {
    //     console.error("Error:", error);
    //     Swal.fire("Payment failed", error.message, "error");
    //   }
    // } else {
    //   Swal.fire("Order Placed Successfully!", "", "success").then(() => {
    //     navigate("/ourBrand");
    //   });
    // }

    setPaymentModule(true);
  };

  async function generateHash(
    merchantId,
    txnId,
    amount,
    consumerId,
    returnUrl,
    currency,
    secretKey
  ) {
    const inputString = `${merchantId}|${txnId}|${amount}|${consumerId}|${currency}|${returnUrl}|${secretKey}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(inputString);
    const hashBuffer = await crypto.subtle.digest("SHA-512", data);
    console.log("hashBuffer", hashBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

  const paymentModel = () => {
    const address = localStorage.getItem("selectedAddress");
    if (address) {
      const merchantId = "KarmaCuisines";
      const txnId = `${Date.now()}`;
      const amount = grandTotal;
      const consumerId = "c964634";
      const currency = "CHF";
      const secretKey = "7C2F25CEDC36F78C6E52";

      generateHash(
        merchantId,
        txnId,
        amount,
        consumerId,
        currency,
        secretKey
      ).then((signature) => {
        const reqJson = {
          features: {
            enableAbortResponse: true,
            enableExpressPay: true,
            enableInstrumentDeRegistration: true,
            enableMerTxnDetails: true,
          },
          consumerData: {
            deviceId: "WEBSH2",
            token: "7B9131076A6D50F744BF",
            returnUrl:
              "https://pgproxyuat.in.worldline-solutions.com/linuxsimulator/MerchantResponsePage.jsp",
            responseHandler: (res) => {
              const txnStatus =
                res?.paymentMethod?.paymentTransaction?.statusCode;
              if (txnStatus === "0300") {
                Swal.fire("Order Placed Successfully!", "", "success").then(
                  () => {
                    navigate("/ourBrand");
                  }
                );
              } else if (txnStatus === "0398") {
                alert("⚠️ Payment initiated.");
              } else {
                alert("❌ Payment failed or cancelled.");
              }
            },
            paymentMode: "all",
            merchantLogoUrl:
              "https://www.paynimo.com/CompanyDocs/company-logo-vertical.png",
            merchantId,
            currency,
            consumerId,
            txnId,
            items: [
              {
                itemId: "first",
                amount,
                comAmt: "0",
              },
            ],
            signature,
            customStyle: {
              PRIMARY_COLOR_CODE: "#45beaa",
              SECONDARY_COLOR_CODE: "#FFFFFF",
              BUTTON_COLOR_CODE_1: "#2d8c8c",
              BUTTON_COLOR_CODE_2: "#FFFFFF",
            },
          },
        };

        if (window.$ && typeof window.$.pnCheckout === "function") {
          window.$.pnCheckout(reqJson);
          if (reqJson.features.enableNewWindowFlow) {
            window.pnCheckoutShared.openNewWindow();
          }
        } else {
          alert(
            "Payment gateway is not ready yet. Please try again in a moment."
          );
        }
      });
    } else {
      alert("Please select an address before proceeding to payment.");
    }
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
  }, [isModalOpen, paymentModule]);

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
          {/* <div className="relative flex flex-wrap items-center justify-end mb-4">
            <label
              className="cursor-pointer text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
              htmlFor="id-c01"
            >
              Edit Orders
            </label>
            <input
              className="peer relative h-4 w-8 ml-3 cursor-pointer appearance-none rounded-lg bg-slate-300 transition-colors after:absolute after:top-0 after:left-0 after:h-4 after:w-4 after:rounded-full after:bg-slate-500 after:transition-all checked:bg-emerald-200 checked:after:left-4 checked:after:bg-emerald-500 hover:bg-slate-400 after:hover:bg-slate-600 checked:hover:bg-emerald-300 checked:after:hover:bg-emerald-600 focus:outline-none checked:focus:bg-emerald-400 checked:after:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-200 disabled:after:bg-slate-300"
              type="checkbox"
              checked={isEditing}
              onChange={() => setIsEditing((prev) => !prev)}
              id="id-c01"
            />
          </div> */}
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
      <Elements stripe={stripePromise}>
        <PaymentModel
          isOpen={paymentModule}
          totalAmount={grandTotal}
          onClose={paymentModel}
        />
      </Elements>

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
