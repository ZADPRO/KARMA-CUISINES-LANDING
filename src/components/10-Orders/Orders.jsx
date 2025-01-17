import { ChevronLeft, House, ReceiptEuro, TimerReset } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import "./Orders.css";
import AddressBottomModal from "../../pages/AddressBottomModal/AddressBottomModal";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [cartItems, setCartItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);

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
        if (item.id === id) {
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
    .reduce((total, item) => total + item.price * item.count, 0)
    .toFixed(2);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
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
  }, [isModalOpen]);

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
                      key={item.id}
                      className="flex items-center justify-between p-1"
                    >
                      <p>{item.name}</p>
                      <div className="addItems flex items-center gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => updateCartItemCount(item.id, -1)}
                              className="px-2 py-1 border rounded"
                            >
                              -
                            </button>
                            <p>{item.count}</p>
                            <button
                              onClick={() => updateCartItemCount(item.id, 1)}
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
                      <p>{item.price}</p>
                      <p>${item.price * item.count}</p>
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
            <p className="text-lg font-semibold">${grandTotal}</p>
          </div>
          <div className="flex ps-2 pe-2 items-center">
            <p>Tax: </p>
          </div>

          <div className="overallReceipt p-2 flex lg:flex-row flex-col gap-3 lg:justify-between">
            <div className="flex">
              <ReceiptEuro />
              <p>Total Bill : </p>
            </div>
            <div className="flex">
              <TimerReset />
              <p>Expected Delivery in 15 mins</p>
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
              <button onClick={toggleModal} className="useAnotherAddressButton">
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
        <div className="p-4 ms-3 me-3 border-2 border-dashed rounded-lg surface-ground">
          <p>Mode of Payment</p>
        </div>
      </div>
      <div className="payButton">Proceed to Pay</div>
    </div>
  );
}
