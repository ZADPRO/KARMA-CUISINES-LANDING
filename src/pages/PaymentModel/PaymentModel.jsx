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
          <CardPaymentForm totalAmount={totalAmount} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function CardPaymentForm({ totalAmount, onClose }) {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [cardComplete, setCardComplete] = useState(false);

  const isFormValid = name && email && mobile && billingAddress && cardComplete;

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement, {
      name,
      email,
      totalAmount,
      mobile,
      address_line1: billingAddress,
    });

    if (error) {
      console.log("error", error);
      Swal.fire("Error", error.message, "error");
    } else {
      Swal.fire("Payment Successful!", `Paid CHF${totalAmount}`, "success");
      console.log("Token:", token);
      // onClose();
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
