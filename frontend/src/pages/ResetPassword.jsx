import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleResetPassword = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const email = localStorage.getItem("resetEmail");


            const response = await axios.post(
                "https://heart-disease-backend-3o3m.onrender.com/reset-password",
                {
                    email: email,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword
                }
            );

            console.log(response.data);

            alert(response.data.message);
            localStorage.removeItem("resetEmail");
            navigate("/login");


        } catch (error) {

            console.error(
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.error ||
                "Unable to reset password"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Reset Password
                </h2>

                <p className="text-gray-500 text-center mt-2 mb-6">
                    Create your new password
                </p>


                <form onSubmit={handleResetPassword}>

                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-red-500"
                    />


                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
                    />


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-3 rounded-lg mt-5 font-semibold hover:bg-red-700 duration-300"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>

                </form>

            </div>

        </div>

    );

}

export default ResetPassword;