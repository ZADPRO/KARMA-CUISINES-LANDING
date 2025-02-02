import { ChevronLeft, House, ReceiptEuro, TimerReset } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import "./Orders.css";
import AddressBottomModal from "../../pages/AddressBottomModal/AddressBottomModal";
import { useNavigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import PaymentModel from "../../pages/PaymentModel/PaymentModel";

const stripePromise = loadStripe("pk_test_Rkr4eyMdSXZL54ZP2HKeDFMK");

export default function Orders() {
  const [cartItems, setCartItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentModule, setPaymentModule] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/menu");
  };

  useEffect(() => {
    const address = localStorage.getItem("selectedAddress");
    if (address) {
      console.log("address", address);
      setSavedAddress(address);
    }
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateCartItemCount = (id, delta) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.productId === id) {
          const updatedCount = item.count + delta;
          return { ...item, count: updatedCount > 0 ? updatedCount : 0 };
        }
        return item;
      })
      .filter((item) => item.count > 0);

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
    .reduce((total, item) => total + item.productPrice * item.count, 0)
    .toFixed(2);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const paymentModel = () => {
    setPaymentModule((prev) => !prev);
  };

  useEffect(() => {
    if (!isModalOpen) {
      const address = localStorage.getItem("selectedAddress");
      if (address) {
        console.log("address", address);
        const parsedAddress = JSON.parse(address);
        setSavedAddress(parsedAddress);
      }
    }

    if (!paymentModule) {
      const address = localStorage.getItem("selectedAddress");
      if (address) {
        console.log("address", address);
        const parsedAddress = JSON.parse(address);
        setSavedAddress(parsedAddress);
      }
    }
  }, [isModalOpen, paymentModule]);

  const handleProceedToPay = () => {
    setIsPaymentOpen(true);
  };

  return (
    <div className="relative h-screen">
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
                  <>
                    <div
                      key={item.productId}
                      className="flex items-center justify-between p-1"
                    >
                      <p>{item.productName}</p>
                      <div className="addItems flex items-center gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() =>
                                updateCartItemCount(item.productId, -1)
                              }
                              className="px-2 py-1 border rounded"
                            >
                              -
                            </button>
                            <p>{item.count}</p>
                            <button
                              onClick={() =>
                                updateCartItemCount(item.productId, 1)
                              }
                              className="px-2 py-1 border rounded"
                            >
                              +
                            </button>
                          </>
                        ) : (
                          <p className="pt-1 pb-1">Quantity: {item.count}</p>
                        )}
                      </div>
                    </div>
                    <div className="items flex items-center justify-between p-1">
                      <p>{item.productPrice}</p>
                      <p>€{item.productPrice * item.count}</p>
                    </div>
                  </>
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
            <p className="text-lg font-semibold">€ {grandTotal}</p>
          </div>

          {/* <div className="overallReceipt p-2 flex lg:flex-row flex-col gap-3 lg:justify-between">
            <div className="flex">
              <TimerReset />
              <p>Expected Delivery in 15 mins</p>
            </div>
          </div> */}
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
      <div className="addAddressTabCall flex pb-[15vh] flex-col p-3 w-full md:w-10/12 mx-auto">
        {/* <div className="p-4 ms-3 me-3 border-2 border-dashed rounded-lg surface-ground">
          <p>Mode of Payment</p>
        </div> */}
      </div>
      <Elements stripe={stripePromise}>
        {/* <PaymentModel isOpen={true} onClose={() => {}} /> */}
        <PaymentModel isOpen={paymentModule} onClose={paymentModel} />
      </Elements>

      <div className="payButton" onClick={paymentModel}>
        Proceed to Pay
      </div>
    </div>
  );
}

function PaymentForm({ totalAmount }) {
  const stripe = useStripe();
  const elements = useElements();

  // State to store additional details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    // Create payment token with additional data
    const { token, error } = await stripe.createToken(cardElement, {
      name,
      address_line1: billingAddress,
      email,
    });

    if (error) {
      Swal.fire("Error", error.message, "error");
    } else {
      Swal.fire("Payment Successful!", `Paid €${totalAmount}`, "success");
      console.log("Token:", token);
    }
  };

  return (
    <div className="p-4 border rounded mt-5 pb-[150px]">
      <h3 className="text-lg font-semibold mb-3">Enter Payment Details</h3>

      <input
        type="text"
        className="p-2 border rounded w-full mb-3"
        placeholder="Cardholder Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className="p-2 border rounded w-full mb-3"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        className="p-2 border rounded w-full mb-3"
        placeholder="Billing Address"
        value={billingAddress}
        onChange={(e) => setBillingAddress(e.target.value)}
      />

      <CardElement className="p-2 border rounded" />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handlePayment}
      >
        Pay €{totalAmount}
      </button>
    </div>
  );
}
