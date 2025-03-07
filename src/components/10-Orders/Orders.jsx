import { ChevronLeft, House } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import "./Orders.css";
import AddressBottomModal from "../../pages/AddressBottomModal/AddressBottomModal";
import { useNavigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentModel from "../../pages/PaymentModel/PaymentModel";

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

  const paymentModel = () => {
    const address = localStorage.getItem("selectedAddress");
    if (address) {
      setPaymentModule((prev) => !prev);
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
