import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Orders() {
  const [cartItems, setCartItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Track if editing is enabled

  useEffect(() => {
    // Set initial cart items from localStorage if available
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateCartItemCount = (id, delta) => {
    // Update the count of a cart item by delta
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === id) {
          const updatedCount = item.count + delta;
          return { ...item, count: updatedCount > 0 ? updatedCount : 0 };
        }
        return item;
      })
      .filter((item) => item.count > 0); // Remove items with count 0

    // Handle clearing the cart when no items are left
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
          setCartItems([]); // Clear the cart
          localStorage.removeItem("cart");
          Swal.fire(
            "Cart Cleared!",
            "All items have been removed from your cart.",
            "success"
          );
        }
      });
    } else {
      setCartItems(updatedCart); // Update the cart with new counts
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
    }
  };

  const grandTotal = cartItems
    .reduce((total, item) => total + item.price * item.count, 0)
    .toFixed(2);

  return (
    <div className="relative h-screen">
      <div className="headerContents flex items-center pt-2 pb-2">
        <ChevronLeft />
        <p>Back</p>
      </div>
      <div className="flex flex-col p-3">
        <h1>Orders Page</h1>
        <div className="flex flex-col">
          <div className="relative flex flex-wrap items-center">
            {/* Toggle the editing mode */}
            <input
              className="peer relative h-4 w-8 cursor-pointer appearance-none rounded-lg bg-slate-300 transition-colors after:absolute after:top-0 after:left-0 after:h-4 after:w-4 after:rounded-full after:bg-slate-500 after:transition-all checked:bg-emerald-200 checked:after:left-4 checked:after:bg-emerald-500 hover:bg-slate-400 after:hover:bg-slate-600 checked:hover:bg-emerald-300 checked:after:hover:bg-emerald-600 focus:outline-none checked:focus:bg-emerald-400 checked:after:focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-200 disabled:after:bg-slate-300"
              type="checkbox"
              checked={isEditing}
              onChange={() => setIsEditing((prev) => !prev)} // Toggle editing mode
              id="id-c01"
            />
            <label
              className="cursor-pointer pl-2 text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
              htmlFor="id-c01"
            >
              Edit Orders
            </label>
          </div>
          <div className="contents">
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((item) => (
                  <>
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <p>{item.name}</p>
                      <div className="addItems flex items-center gap-2">
                        {/* Only allow editing if 'isEditing' is true */}
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
                          <p>Quantity: {item.count}</p>
                        )}
                      </div>
                    </div>
                    <div className="items flex items-center justify-between">
                      <p>{item.price}</p>
                      <p>Total: ${item.price * item.count}</p>
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
      <div className="flex justify-between p-4 border-t">
        <p className="text-lg font-semibold">Grand Total:</p>
        <p className="text-lg font-semibold">${grandTotal}</p>
      </div>

      {/* Fixed pay button */}
      <div className="payButton footerBuyProducts">Proceed to Pay</div>
    </div>
  );
}
