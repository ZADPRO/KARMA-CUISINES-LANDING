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
import { useNavigate } from "react-router-dom";

import axios from "axios";
import decrypt from "../../helper";

export default function PaymentModel({ isOpen, totalAmount, onClose }) {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();
  const y = useMotionValue(0);
  const controls = useDragControls();

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
          <CardPaymentForm totalAmount={totalAmount} onClose={onClose} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function CardPaymentForm({ totalAmount, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [cardComplete, setCardComplete] = useState(false);

  const navigate = useNavigate();

  const isFormValid = name && email && mobile && billingAddress && cardComplete;

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/Employee/checkApi",
        {
          amount: totalAmount,
          currency: "CHF",
          successRedirectUrl: "https://your-success-url.com",
          failedRedirectUrl: "https://your-failed-url.com",
          purpose: "Test Payment",
        },
        {
          headers: {
            Authorization: "vqdTdCezHYCNEzgFcRsPz4PwvYvZPV",
            "Content-Type": "application/json",
          },
        }
      );

      const decryptedData = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      if (decryptedData.success) {
        console.log("decryptedData", decryptedData);
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

      <CardElement
        className="p-2 border rounded"
        onChange={(event) => setCardComplete(event.complete)}
      />

      <button
        className={`mt-4 px-4 py-2 rounded ${
          isFormValid
            ? "bg-blue-600 text-white"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handlePayment}
        disabled={!isFormValid}
      >
        Pay CHF{totalAmount}
      </button>
    </div>
  );
}

PaymentModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  totalAmount: PropTypes.number,
};
