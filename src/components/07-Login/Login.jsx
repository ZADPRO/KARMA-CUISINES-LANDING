import { useState } from "react";
import Swal from "sweetalert2";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    login: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(true);

  const [signUp, setSignUp] = useState({
    temp_fname: "",
    temp_lname: "",
    temp_username: "",
    temp_password: "",
    temp_phone: "",
    temp_email: "",
  });

  const [otpSent, setOtpSent] = useState(false);

  const handleRequestOtp = (e) => {
    e.preventDefault();
    const { email } = signUp; // Use signUp instead of state
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
    // Implement OTP verification logic here
    Swal.fire({
      title: "OTP Verified",
      text: "OTP verified successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });
    // Optionally navigate to login or home
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve user login details from local storage
    const userLoginDetails = JSON.parse(
      localStorage.getItem("userLoginDetails")
    );

    if (userLoginDetails) {
      const { mobileNumber, password } = userLoginDetails;

      // Check if the entered login details match the stored details
      if (state.login === mobileNumber && state.password === password) {
        handleLoginSuccess();
      } else {
        // Show SweetAlert for invalid credentials
        Swal.fire({
          title: "Invalid Credentials",
          text: "The mobile number or password you entered is incorrect.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      // Show SweetAlert if no user details are found
      Swal.fire({
        title: "No User Found",
        text: "No user found with the provided details.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
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

  const handleSignUp = (e) => {
    e.preventDefault();

    // Store user details in local storage
    const userLoginDetails = {
      mobileNumber: signUp.temp_phone,
      password: signUp.temp_password,
      // You can also store other details if needed
      firstName: signUp.temp_fname,
      lastName: signUp.temp_lname,
      username: signUp.temp_username,
      email: signUp.temp_email,
    };

    localStorage.setItem("userLoginDetails", JSON.stringify(userLoginDetails));

    // Show SweetAlert for successful sign-up
    Swal.fire({
      title: "Sign Up Successful",
      text: "You can now log in with your credentials.",
      icon: "success",
      confirmButtonText: "OK",
    });

    // Optionally navigate to login page
    navigate("/orders");
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? (
        <div className="loginPage h-[100vh] flex lg:flex-row flex-col">
          <div className="flex-1 loginScreen"></div>
          <div className="flex-1 loginFunctionalities flex flex-col items-center justify-center p-6">
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

              <form className="w-full max-w-md" onSubmit={handleLogin}>
                <div className="relative my-6 flex items-center">
                  {/* Email Input */}
                  <input
                    id="login"
                    type="text"
                    name="login"
                    value={state.login}
                    placeholder="Enter Email ID"
                    className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-[#4f391d] invalid:text-[#4f391d] focus:border-emerald-500 focus:outline-none invalid:focus:border-[#4f391d] focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    onChange={(e) =>
                      setState({ ...state, login: e.target.value })
                    }
                    required
                    disabled={otpSent}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-[#4f391d] peer-required:after:content-['\00a0*'] peer-invalid:text-[#4f391d] peer-focus:-top-2 peer-focus:left-4 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-[#4f391d] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                  >
                    Enter Mobile Number
                  </label>
                </div>
                <div className="relative mt-6 mb-2 flex items-center">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={state.password}
                    placeholder="Enter Password"
                    className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-[#4f391d] invalid:text-[#4f391d] focus:border-emerald-500 focus:outline-none invalid:focus:border-[#4f391d] focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                    onChange={(e) =>
                      setState({ ...state, password: e.target.value })
                    }
                    required
                    disabled={otpSent}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-4 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base peer-autofill:-top-2 peer-required:after:text-[#4f391d] peer-required:after:content-['\00a0*'] peer-invalid:text-[#4f391d] peer-focus:-top-2 peer-focus:left-4 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-[#4f391d] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                  >
                    Enter Password
                  </label>
                </div>
                {/* 
                <div className="flex justify-end items-center mb-2">
                  <label className="">Forgot Password ?</label>
                </div> */}

                <button
                  type="submit"
                  className="w-full rounded bg-emerald-500 py-2 text-white hover:bg-emerald-600"
                >
                  Login
                </button>
              </form>

              <p className="mt-3 mx-auto text-center text-[15px]">
                <p className="toggleText" onClick={handleToggle}>
                  {isLogin
                    ? "New to our app? Sign Up"
                    : "Already have an account? Login"}
                </p>{" "}
              </p>
              <div className="flex">
                <p className="w-10/12 mx-auto text-center text-[12px]">
                  By continuing, you agree to our{" "}
                  <span>Terms of Service, Privacy Policy, Content Policy</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="signUpPage loginPage flex lg:flex-row flex-col items-center justify-center">
          <div>
            <form onSubmit={handleSignUp} className="w-10/12 mx-auto">
              <div className="text-center my-6 min-w-full">
                <div className="flex items-center justify-center">
                  <hr className="flex-1 border-t-2 border-slate-300" />
                  <h1 className="mx-4 text-xl font-semibold text-gray-700">
                    {isLogin ? "Login" : "Sign Up"}
                  </h1>
                  <hr className="flex-1 border-t-2 border-slate-300" />
                </div>
              </div>

              {/* Sign Up Fields */}
              {!isLogin && (
                <>
                  <div className="relative my-6 flex items-center">
                    <input
                      id="temp_fname"
                      type="text"
                      name="temp_fname"
                      value={signUp.temp_fname}
                      placeholder="Enter First Name"
                      className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all"
                      onChange={(e) =>
                        setSignUp({ ...signUp, temp_fname: e.target.value })
                      }
                      required
                    />
                    <label
                      htmlFor="temp_fname"
                      className="absolute left-4 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all"
                    >
                      Enter First Name
                    </label>
                  </div>
                  <div className="relative my-6 flex items-center">
                    <input
                      id="temp_lname"
                      type="text"
                      name="temp_lname"
                      value={signUp.temp_lname}
                      placeholder="Enter Last Name"
                      className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all"
                      onChange={(e) =>
                        setSignUp({ ...signUp, temp_lname: e.target.value })
                      }
                      required
                    />
                    <label
                      htmlFor="temp_lname"
                      className="absolute left-4 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all"
                    >
                      Enter Last Name
                    </label>
                  </div>
                  <div className="relative my-6 flex items-center">
                    <input
                      id="temp_username"
                      type="text"
                      name="temp_username"
                      value={signUp.temp_username}
                      placeholder="Enter Username"
                      className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all"
                      onChange={(e) =>
                        setSignUp({ ...signUp, temp_username: e.target.value })
                      }
                      required
                    />
                    <label
                      htmlFor="temp_username"
                      className="absolute left-4 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all"
                    >
                      Enter Username
                    </label>
                  </div>
                  <div className="relative my-6 flex items-center">
                    <input
                      id="temp_phone"
                      type="text"
                      name="temp_phone"
                      value={signUp.temp_phone}
                      placeholder="Enter Phone"
                      className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all"
                      onChange={(e) =>
                        setSignUp({ ...signUp, temp_phone: e.target.value })
                      }
                      required
                    />
                    <label
                      htmlFor="temp_phone"
                      className="absolute left-4 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all"
                    >
                      Enter Phone
                    </label>
                  </div>
                  <div className="relative my-6 flex items-center">
                    <input
                      id="temp_email"
                      type="text"
                      name="temp_email"
                      value={signUp.temp_email}
                      placeholder="Enter Email"
                      className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all"
                      onChange={(e) =>
                        setSignUp({ ...signUp, temp_email: e.target.value })
                      }
                      required
                    />
                    <label
                      htmlFor="temp_email"
                      className="absolute left-4 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all"
                    >
                      Enter Email
                    </label>
                  </div>
                  <div className="relative my-6 flex items-center">
                    <input
                      id="temp_password"
                      type="password"
                      name="temp_password"
                      value={signUp.temp_password}
                      placeholder="Enter Password"
                      className="peer relative h-12 w-full rounded border border-slate-200 px-4 text-slate-500 placeholder-transparent outline-none transition-all"
                      onChange={(e) =>
                        setSignUp({ ...signUp, temp_password: e.target.value })
                      }
                      required
                    />
                    <label
                      htmlFor="temp_password"
                      className="absolute left-4 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all"
                    >
                      Enter Password
                    </label>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full mt-3 rounded bg-emerald-500 py-2 text-white hover:bg-emerald-600"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <p className="mt-3 mx-auto text-center text-[15px]">
              <span className="toggleText" onClick={handleToggle}>
                {isLogin
                  ? "New to our app? Sign Up"
                  : "Already have an account? Login"}
              </span>
            </p>
            <div className="flex">
              <p className="w-10/12 mx-auto text-center text-[12px]">
                By continuing, you agree to our{" "}
                <span>Terms of Service, Privacy Policy, Content Policy</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
