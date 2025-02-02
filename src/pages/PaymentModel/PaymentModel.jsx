import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function PaymentModel({ isOpen, totalAmount, onClose }) {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();
  const y = useMotionValue(0);
  const controls = useDragControls();
  const [addresses, setAddresses] = useState([]);

  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      console.log("isOpen", isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    const storedAddresses = localStorage.getItem("addresses");
    if (storedAddresses) {
      console.log("storedAddresses raw data:", storedAddresses);
      const parsedAddresses = JSON.parse(storedAddresses);
      const addressArray = Object.values(parsedAddresses);
      console.log("Parsed Addresses:", addressArray);
      setAddresses(addressArray);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={scope}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-neutral-950/70"
    >
      <motion.div
        id="drawer"
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ ease: "easeInOut" }}
        className="absolute bottom-0 h-[75vh] w-full overflow-auto rounded-t-3xl bg-white"
        style={{ y }}
        drag="y"
        dragControls={controls}
        onDragEnd={() => {
          if (y.get() >= 100) {
            handleClose();
          }
        }}
        dragListener={false}
        dragConstraints={{ top: -100, bottom: 0 }}
      >
        <div className="p-4 border rounded mt-5">
          <h3 className="text-lg font-semibold mb-3">Select Payment Method</h3>

          <div className="flex space-x-4 mb-3">
            <button
              className={`px-4 py-2 rounded ${
                paymentMethod === "card"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              Pay with Card
            </button>
            <button
              className={`px-4 py-2 rounded ${
                paymentMethod === "twint"
                  ? "bg-green-600 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setPaymentMethod("twint")}
            >
              Pay with Twint
            </button>
          </div>

          {paymentMethod === "card" && (
            <CardPaymentForm totalAmount={totalAmount} />
          )}
          {paymentMethod === "twint" && (
            <TwintPayment totalAmount={totalAmount} />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function CardPaymentForm({ totalAmount }) {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const isFormValid = name && email && mobile && billingAddress;

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement, {
      name,
      email,
      mobile,
      address_line1: billingAddress,
    });

    if (error) {
      console.log("error", error);
      Swal.fire("Error", error.message, "error");
    } else {
      Swal.fire("Payment Successful!", `Paid €${totalAmount}`, "success");
      console.log("Token:", token);
    }
  };

  return (
    <div className="p-4 border rounded mt-5">
      <h3 className="text-lg font-semibold mb-3">Enter Payment Details</h3>

      <input
        type="text"
        className="p-2 border rounded w-full mb-3"
        placeholder="Cardholder Name *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="tel"
        className="p-2 border rounded w-full mb-3"
        placeholder="Mobile *"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        required
      />
      <input
        type="email"
        className="p-2 border rounded w-full mb-3"
        placeholder="Email Address *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        className="p-2 border rounded w-full mb-3"
        placeholder="Billing Address *"
        value={billingAddress}
        onChange={(e) => setBillingAddress(e.target.value)}
        required
      />

      <CardElement className="p-2 border rounded" />

      <button
        className={`mt-4 px-4 py-2 rounded ${
          isFormValid
            ? "bg-blue-600 text-white"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handlePayment}
        disabled={!isFormValid}
      >
        Pay €{totalAmount}
      </button>
    </div>
  );
}

function TwintPayment({ totalAmount }) {
  const handleTwintPayment = () => {
    Swal.fire(
      "Twint Payment",
      "Scan the QR code to complete your payment.",
      "info"
    );
  };

  return (
    <div className="p-4 border rounded mt-5 text-center">
      <h3>
        Internal Server Error <br />
      </h3>
      {/* <h3 className="text-lg font-semibold mb-3">Scan to Pay with Twint</h3>
      <img
        src="https://via.placeholder.com/150"
        alt="Twint QR Code"
        className="mx-auto mb-3"
      />
      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={handleTwintPayment}
      >
        Pay with Twint (€{totalAmount})
      </button> */}
    </div>
  );
}

PaymentModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
