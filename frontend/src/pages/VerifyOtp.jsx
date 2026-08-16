import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleVerifyOTP = async (e) => {

        e.preventDefault();

        if (!otp || otp.trim() === "") {

            alert("Please enter OTP");

            return;
        }
        const email = localStorage.getItem("resetEmail");

        if (!email) {

            alert("Email not found. Please try Forgot Password again.");

            navigate("/ForgetPassword");

            return;
        }


        try {

            setLoading(true);


            const response = await axios.post(

                "http://localhost:5000/verify-otp",

                {
                    email: email,
                    otp: otp
                }

            );


            console.log(response.data);

            alert(response.data.message);
            
            navigate("/reset-password");


        } catch (error) {

            console.error(
                error.response?.data || error.message
            );


            alert(

                error.response?.data?.error ||

                "Unable to verify OTP"

            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold text-center text-gray-800">

                    Verify OTP

                </h2>


                <p className="text-gray-500 text-center mt-2 mb-6">

                    Enter the 6-digit OTP sent to your email

                </p>


                <form onSubmit={handleVerifyOTP}>


                    {/* OTP INPUT */}

                    <input

                        type="text"

                        value={otp}

                        onChange={(e) =>
                            setOtp(e.target.value)
                        }

                        placeholder="Enter 6 digit OTP"

                        maxLength="6"

                        required

                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"

                    />


                    {/* VERIFY BUTTON */}

                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full bg-red-600 text-white py-3 rounded-lg mt-5 font-semibold hover:bg-red-700 duration-300 disabled:bg-gray-400"

                    >

                        {loading
                            ? "Verifying..."
                            : "Verify OTP"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default VerifyOTP;