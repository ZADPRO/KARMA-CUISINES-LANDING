import { ChevronLeft, House } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import "./Orders.css";
import AddressBottomModal from "../../pages/AddressBottomModal/AddressBottomModal";
import { useNavigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentModel from "../../pages/PaymentModel/PaymentModel";
import CryptoJS from "crypto-js";

const stripePromise = loadStripe("pk_test_Rkr4eyMdSXZL54ZP2HKeDFMK");

export default function Orders() {
  const [cartItems, setCartItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentModule, setPaymentModule] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);
  const [isAddressAvailable, setIsAddressAvailable] = useState(false);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/ourBrand");
  };

  useEffect(() => {
    const address = localStorage.getItem("selectedAddress");
    if (address) {
      console.log("address", address);
      setSavedAddress(JSON.parse(address)); // Parse the address
    }
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateCartItemCount = (id, delta) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === id) {
          // Change productId to id
          const updatedCount = item.quantity + delta; // Change count to quantity
          return { ...item, quantity: updatedCount > 0 ? updatedCount : 0 }; // Change count to quantity
        }
        return item;
      })
      .filter((item) => item.quantity > 0); // Change count to quantity

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

  const grandTotal = cartItems
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0) // Change productPrice to price and count to quantity
    .toFixed(2);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    // Load Paynimo scripts
    const scriptJQuery = document.createElement("script");
    scriptJQuery.src =
      "https://www.paynimo.com/paynimocheckout/client/lib/jquery.min.js";
    scriptJQuery.async = true;
    document.body.appendChild(scriptJQuery);

    const scriptCheckout = document.createElement("script");
    scriptCheckout.src =
      "https://www.paynimo.com/paynimocheckout/server/lib/checkout.js";
    scriptCheckout.async = true;
    document.body.appendChild(scriptCheckout);

    return () => {
      document.body.removeChild(scriptJQuery);
      document.body.removeChild(scriptCheckout);
    };
  }, []);

  async function generateHash(
    merchantId,
    txnId,
    amount,
    consumerId,
    currency,
    secretKey
  ) {
    const inputString = `${merchantId}${txnId}${amount}${consumerId}${currency}${secretKey}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(inputString);
    const hashBuffer = await crypto.subtle.digest("SHA-512", data);
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
      console.log("grandTotal", grandTotal);
      const amount = grandTotal;
      const consumerId = "c964634";
      const currency = "CHF";
      const secretKey = "7C2F25CEDC36F78C6E52";
      console.log("secretKey", secretKey);

      generateHash(
        merchantId,
        txnId,
        amount,
        consumerId,
        currency,
        secretKey
      ).then((signature) => {
        console.log("signature", signature);
        const reqJson = {
          features: {
            enableAbortResponse: true,
            enableExpressPay: true,
            enableInstrumentDeRegistration: true,
            enableMerTxnDetails: true,
          },
          consumerData: {
            deviceId: "WEBSH2",
            token: "7C2F25CEDC36F78C6E52",
            returnUrl:
              "https://pgproxyuat.in.worldline-solutions.com/linuxsimulator/MerchantResponsePage.jsp",
            responseHandler: (res) => {
              console.log("res", res);
              const txnStatus =
                res?.paymentMethod?.paymentTransaction?.statusCode;
              if (txnStatus === "0300") {
                alert("✅ Payment successful!");
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
            signature, // 👈 VERY IMPORTANT
            customStyle: {
              PRIMARY_COLOR_CODE: "#45beaa",
              SECONDARY_COLOR_CODE: "#FFFFFF",
              BUTTON_COLOR_CODE_1: "#2d8c8c",
              BUTTON_COLOR_CODE_2: "#FFFFFF",
            },
          },
        };

        console.log("reqJson", reqJson);
        window.$.pnCheckout(reqJson);
        if (reqJson.features.enableNewWindowFlow) {
          window.pnCheckoutShared.openNewWindow();
        }
      });
    } else {
      alert("Please select an address before proceeding to payment.");
    }

    // if (address) {
    //   const reqJson = {
    //     features: {
    //       enableAbortResponse: true,
    //       enableExpressPay: true,
    //       enableInstrumentDeRegistration: true,
    //       enableMerTxnDetails: true,
    //     },
    //     consumerData: {
    //       deviceId: "WEBSH2",
    //       token: "7B9131076A6D50F744BF",
    //       responseHandler: (res) => {
    //         if (
    //           res &&
    //           res.paymentMethod &&
    //           res.paymentMethod.paymentTransaction &&
    //           res.paymentMethod.paymentTransaction.statusCode === "0300"
    //         ) {
    //           alert("Payment successful!");
    //         } else if (
    //           res &&
    //           res.paymentMethod &&
    //           res.paymentMethod.paymentTransaction &&
    //           res.paymentMethod.paymentTransaction.statusCode === "0398"
    //         ) {
    //           alert("Payment initiated!");
    //         } else {
    //           alert("Payment failed or cancelled.");
    //         }
    //       },
    //       paymentMode: "all",
    //       merchantLogoUrl:
    //         "https://www.paynimo.com/CompanyDocs/company-logo-vertical.png",
    //       merchantId: "L3348",
    //       currency: "CHF",
    //       consumerId: "c964634",
    //       txnId: `${Date.now()}`, // unique txn ID
    //       items: [
    //         {
    //           itemId: "first",
    //           amount: grandTotal, // test amount
    //           comAmt: "0",
    //         },
    //       ],
    //       customStyle: {
    //         PRIMARY_COLOR_CODE: "#45beaa",
    //         SECONDARY_COLOR_CODE: "#FFFFFF",
    //         BUTTON_COLOR_CODE_1: "#2d8c8c",
    //         BUTTON_COLOR_CODE_2: "#FFFFFF",
    //       },
    //     },
    //   };

    //   // Call the Paynimo checkout
    //   window.$.pnCheckout(reqJson);
    //   if (reqJson.features.enableNewWindowFlow) {
    //     window.pnCheckoutShared.openNewWindow();
    //   }
    // } else {
    //   alert("Please select an address before proceeding to payment.");
    // }
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
        <p>Back</p>
      </div>
      <div className="flex flex-col p-3 w-full md:w-10/12 mx-auto">
        <div className="flex flex-col border-2 border-dashed rounded-lg surface-ground flex-auto p-4 m-3">
          <div className="relative flex flex-wrap items-center justify-end mb-4">
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
          </div>
          <div className="contents">
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((item) => (
                  <div
                    key={item.id} // Change productId to id
                    className="flex items-center justify-between p-1"
                  >
                    <p>{item.name}</p> {/* Change productName to name */}
                    <div className="addItems flex items-center gap-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={
                              () => updateCartItemCount(item.id, -1) // Change productId to id
                            }
                            className="px-2 py-1 border rounded"
                          >
                            -
                          </button>
                          <p>{item.quantity}</p>{" "}
                          {/* Change count to quantity */}
                          <button
                            onClick={
                              () => updateCartItemCount(item.id, 1) // Change productId to id
                            }
                            className="px-2 py-1 border rounded"
                          >
                            +
                          </button>
                        </>
                      ) : (
                        <p className="pt-1 pb-1">Quantity: {item.quantity}</p>
                      )}
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
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-semibold">CHF {grandTotal}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-3 w-full md:w-10/12 mx-auto">
        <div className="p-3 ms-3 me-3 border-2 border-dashed rounded-lg surface-ground">
          <div className="flex items-center justify-between ps-2 pt-2 pe-2">
            <p className="text-lg font-semibold">Billing Details</p>
          </div>
          <div className="flex lg:flex-row flex-col justify-center gap-3 mt-3">
            <div className="address flex justify-center lg:mt-0 mt-3">
              <input
                id="id-l03"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="address flex justify-center lg:mt-0 mt-3">
              <input
                id="id-l03"
                type="text"
                name="lastName"
                placeholder="Last Name"
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
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="address flex justify-center lg:mt-0 mt-3">
              <input
                id="id-l03"
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
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
                Use Another Address
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
        onClick={isAddressAvailable ? paymentModel : null}
        style={{
          cursor: isAddressAvailable ? "pointer" : "not-allowed",
          opacity: isAddressAvailable ? 1 : 0.5,
        }}
      >
        Proceed to Pay
      </div>
    </div>
  );
}
