import { useState } from "react";
import Swal from "sweetalert2";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate(); // Hook to navigate after login

  const [state, setState] = useState({
    email: "",
    otp: ["", "", "", "", "", ""],
  });
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (evt, index) => {
    const { value } = evt.target;
    // Ensure that only numbers are entered and length is limited to 1
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...state.otp];
    newOtp[index] = value.slice(0, 1);
    setState({
      ...state,
      otp: newOtp,
    });

    // Focus on the next input field if current field is filled
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleRequestOtp = (e) => {
    e.preventDefault();
    const { email } = state;
    console.log(`Requesting OTP for email: ${email}`);

    // Show SweetAlert for OTP request
    Swal.fire({
      title: "OTP Requested",
      text: `An OTP has been sent to ${email}`,
      icon: "success",
      confirmButtonText: "OK",
    });

    setOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const { email, otp } = state;
    const otpCode = otp.join("");
    console.log(`Verifying OTP ${otpCode} for email: ${email}`);

    // Show SweetAlert for OTP verification
    Swal.fire({
      title: "OTP Verified",
      text: `OTP ${otpCode} verified successfully for email: ${email}`,
      icon: "success",
      confirmButtonText: "OK",
    });
    handleLoginSuccess();
  };

  const handleLoginSuccess = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const fromPlaceOrder = localStorage.getItem("fromPlaceOrder");
    localStorage.setItem("loginStatus", true);

    if (fromPlaceOrder === "true") {
      navigate("/orders", { state: { orders: cartItems } });

      localStorage.removeItem("cartItems");
      localStorage.removeItem("fromPlaceOrder");
    } else {
      navigate("/home");
    }
  };

  return (
    <div>
      <div className="loginPage h-[100vh] flex lg:flex-row flex-col">
        <div className="flex-1 loginScreen"></div>
        <div className="flex-1 loginFunctionalities flex flex-col items-center justify-between p-6">
          <div className="flex flex-col items-center p-3">
            <p>Europe #1 Food Delivery App</p>
            <div className="text-center my-6 min-w-full">
              <div className="flex items-center justify-center">
                <hr className="flex-1 border-t-2 border-slate-300" />
                <h1 className="mx-4 text-xl font-semibold text-gray-700">
                  Login
                </h1>
                <hr className="flex-1 border-t-2 border-slate-300" />
              </div>
            </div>

            <form
              onSubmit={otpSent ? handleVerifyOtp : handleRequestOtp}
              className="w-full max-w-md"
            >
              <div className="relative my-6 flex items-center">
                {/* Email Input */}
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={state.email}
                  placeholder="Enter Email ID"
                  className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                  required
                  disabled={otpSent}
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:left-4 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Enter Email ID
                </label>
              </div>

              {/* OTP Grid */}
              {otpSent && (
                <div className="flex space-x-2 otpValidate justify-center my-6">
                  {state.otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(e, index)}
                      className="w-12 h-12 text-center text-2xl border border-slate-200 rounded focus:border-emerald-500 focus:outline-none"
                      pattern="[0-9]*"
                      inputMode="numeric" // This makes the mobile keyboard numeric
                      required
                    />
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded bg-emerald-500 py-2 text-white hover:bg-emerald-600"
              >
                {otpSent ? "Verify OTP" : "Request OTP"}
              </button>
            </form>
          </div>
          <div className="flex">
            <p className="w-10/12 mx-auto text-center text-[12px]">
              By continuing, you agree to our{" "}
              <span>Terms of Service, Privacy Policy, Content Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
