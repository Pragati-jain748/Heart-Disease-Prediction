import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        // validation
        if (email.trim() === "" || password.trim() === "") {
            alert("Please fill all fields");
            return;
        }

        try {

            // API call
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            console.log(response.data);

            // Token save
            localStorage.setItem("token", response.data.token);

            // Redirect
            navigate("/");
            window.location.reload();

        } catch (error) {
            console.error(error.response?.data);
            alert("Login failed. Please check your credentials.");
        }
    };



    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

            {/* Login Card */}
            <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
                {/* Heading */}
                <h1 className="text-4xl font-bold text-center text-red-600">
                    Welcome Back 👋
                </h1>

                {/* Description */}
                <p className="text-center text-gray-500 mt-2 mb-8">
                    Login to CardioCare AI
                </p>

                {/* ==========================
                    Login Form
                ========================== */}
                <form onSubmit={handleLogin} autoComplete="off">
                    {/* Email */}
                    <label className="font-semibold">
                        Email
                    </label>

                    <input
                        type="email"
                        autoComplete="new-password"
                        name="login-email-random"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-lg p-3 mt-2 mb-5 outline-none focus:ring-2 focus:ring-red-500" />

                    {/* Password */}
                    <label className="font-semibold">
                        Password
                    </label>

                    <div className="flex mt-2">
                        <input
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            name="login-password-random"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500" />
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right mt-3">
                        <Link
                            to="/ForgetPassword"
                            className="text-red-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-3 rounded-lg mt-6 hover:bg-red-700 duration-300">
                        Login
                    </button>
                </form>

                {/* Register */}
                <p className="text-center mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/register" className="text-red-600 font-semibold hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>

    );

}

export default Login;