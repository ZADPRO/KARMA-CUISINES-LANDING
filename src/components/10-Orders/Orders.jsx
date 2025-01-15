import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Orders() {
  const location = useLocation();
  const orders = location.state?.orders || [];

  useEffect(() => {
    console.log("Orders Data:", orders);
  }, [orders]);

  return (
    <div>
      <div className="headerContents"></div>
      <h1>Orders Page</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((item) => (
            <li key={item.id}>
              {item.name} - Quantity: {item.count}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
}
