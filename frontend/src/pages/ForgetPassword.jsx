import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleForgotPassword = async (e) => {

        e.preventDefault();
        if (!email || email.trim() === "") {

            alert("Please enter your email");

            return;
        }


        setLoading(true);


        try {
            const response = await axios.post(

                "http://localhost:5000/ForgetPassword",

                {
                    email: email
                }

            );


            console.log(response.data);

            localStorage.setItem("resetEmail", email);


            console.log(
                "Saved email:",
                localStorage.getItem("resetEmail")
            );
            alert(response.data.message);
            navigate("/verify-otp");


        } catch (error) {

            console.error(
                error.response?.data || error.message
            );


            alert(

                error.response?.data?.error ||

                "Unable to process request"

            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

                <h1 className="text-3xl font-bold text-center text-red-600">

                    Forgot Password?

                </h1>


                <p className="text-gray-500 text-center mt-2 mb-8">

                    Enter your registered email address to receive an OTP.

                </p>


                <form onSubmit={handleForgotPassword}>


                    {/* EMAIL LABEL */}

                    <label className="block text-sm font-semibold text-gray-700 mb-2">

                        Email Address

                    </label>


                    {/* EMAIL INPUT */}

                    <input

                        type="email"

                        value={email}

                        onChange={(e) =>
                            setEmail(e.target.value)
                        }

                        placeholder="Enter your email"

                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"

                    />


                    {/* SEND OTP BUTTON */}

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full bg-red-600 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-red-700 duration-300 disabled:bg-gray-400"

                    >

                        {loading
                            ? "Generating OTP..."
                            : "Send OTP"
                        }

                    </button>


                </form>

            </div>

        </div>

    );

}


export default ForgetPassword;