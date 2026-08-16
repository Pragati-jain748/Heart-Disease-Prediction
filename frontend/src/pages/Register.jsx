import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must contain exactly 10 digits");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }
    try {

      const response = await axios.post(
        "https://heart-disease-backend-3o3m.onrender.com/api/auth/register",
        {
          name,
          email,
          phone,
          password
        }
      );

      console.log(response.data);

      alert("Registration successful. Please login.");
      navigate("/login");

    } catch (error) {

      console.error("REGISTER ERROR:", error);
      console.error("SERVER RESPONSE:", error.response?.data);

      alert(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-10">

        <h1 className="text-3xl font-bold text-center text-red-600 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Register for CardioCare AI
        </p>

        <form onSubmit={handleRegister} autoComplete="off">


          {/* Name */}

          <div className="mb-5">

            <label className="block text-gray-700 font-semibold mb-2">
              Name
            </label>

            <input
              type="text"
              name="register-name-new"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
            />

          </div>


          {/* Email */}

          <div className="mb-5">

            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              name="register-email-new"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
            />

          </div>

          {/* Phone Number */}
          <div className="mb-5">

            <label className="block text-gray-700 font-semibold mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              name="register-phone-new"
              autoComplete="off"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter 10 digit phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
            />

          </div>

          {/* Password */}

          <div className="mb-5">

            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="new-password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-20 outline-none focus:border-red-500"
              />

              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute right-3 top-3 text-sm text-red-600 font-semibold"
              >

              </button>

            </div>

          </div>


          {/* Confirm Password */}

          <div className="mb-6">

            <label className="block text-gray-700 font-semibold mb-2">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm-new-password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-20 outline-none focus:border-red-500"
              />

              <button
                type="button"
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
                className="absolute right-3 top-3 text-sm text-red-600 font-semibold"
              >

              </button>

            </div>

          </div>


          {/* Register Button */}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 duration-300"
          >
            Register
          </button>


        </form>

        <p className="text-center text-gray-600 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-red-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;