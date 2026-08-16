import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editName, setEditName] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editEmail, setEditEmail] = useState("");

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:5000/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                console.log(response.data);

                setProfile(response.data);

                setEditName(response.data.name);
                setEditPhone(response.data.phone);
                setEditEmail(response.data.email);

            } catch (error) {

                console.error(
                    error.response?.data || error.message
                );

            } finally {

                setLoading(false);

            }

        };


        fetchProfile();

    }, []);

    const handleSaveProfile = async () => {

        try {
            const response = await axios.put(

                "http://localhost:5000/profile",

                {
                    name: editName,
                    email: editEmail,
                    phone: editPhone
                },

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }

            );

            console.log(response.data);

            setProfile({
                ...profile,
                name: response.data.name,
                email: response.data.email,
                phone: response.data.phone
            });

            setEditing(false);

            alert("Profile updated successfully!");

        } catch (error) {

            console.error(
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.error ||
                "Unable to update profile"
            );

        } 

    }; 


    return (

        <div className="min-h-screen bg-gray-100 py-12">

            <div className="max-w-2xl mx-auto px-4">

                {/* PAGE HEADING */}

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-red-600">
                        My Profile
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View and manage your account information
                    </p>

                </div>


                {/* PROFILE CARD */}

                {loading ? (

                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

                        <p className="text-gray-500">
                            Loading profile...
                        </p>

                    </div>

                ) : (

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                        {/* CARD HEADER */}

                        <div className="bg-red-600 p-6 text-center text-white">

                            <h2 className="text-2xl font-bold">
                                Account Information
                            </h2>

                            <p className="text-red-100 mt-1">
                                Your registered details
                            </p>

                        </div>


                        <div className="p-8">

                            {editing ? (

                                <div className="space-y-5">

                                    {/* NAME */}

                                    <div>

                                        <label className="block text-sm text-gray-500 mb-2">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) =>
                                                setEditName(e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                                        />

                                    </div>


                                    {/* EMAIL */}

                                    <div>

                                        <label className="block text-sm text-gray-500 mb-2">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            value={editEmail}
                                            onChange={(e) =>
                                                setEditEmail(e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                                        />

                                    </div>


                                    {/* PHONE */}

                                    <div>

                                        <label className="block text-sm text-gray-500 mb-2">
                                            Phone Number
                                        </label>

                                        <input
                                            type="text"
                                            value={editPhone}
                                            onChange={(e) =>
                                                setEditPhone(e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                                        />

                                    </div>


                                    {/* SAVE BUTTON */}

                                    <button
                                        onClick={handleSaveProfile}
                                        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 duration-300"
                                    >
                                        Save Changes
                                    </button>


                                    {/* CANCEL BUTTON */}

                                    <button
                                        onClick={() => {

                                            // Original data wapas set
                                            setEditName(profile.name);
                                            setEditEmail(profile.email);
                                            setEditPhone(profile.phone);

                                            // Edit mode band
                                            setEditing(false);

                                        }}
                                        className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 duration-300"
                                    >
                                        Cancel
                                    </button>

                                </div>

                            ) : (

                                <div>

                                    {/* NAME */}

                                    <div className="border-b border-gray-200 pb-5">

                                        <p className="text-sm text-gray-500">
                                            Full Name
                                        </p>

                                        <p className="text-lg font-semibold text-gray-800 mt-1">
                                            {profile?.name}
                                        </p>

                                    </div>


                                    {/* EMAIL */}

                                    <div className="border-b border-gray-200 py-5">

                                        <p className="text-sm text-gray-500">
                                            Email Address
                                        </p>

                                        <p className="text-lg font-semibold text-gray-800 mt-1">
                                            {profile?.email}
                                        </p>

                                    </div>


                                    {/* PHONE */}

                                    <div className="py-5">

                                        <p className="text-sm text-gray-500">
                                            Phone Number
                                        </p>

                                        <p className="text-lg font-semibold text-gray-800 mt-1">
                                            {profile?.phone}
                                        </p>

                                    </div>


                                    {/* EDIT BUTTON */}

                                    <button
                                        onClick={() => setEditing(true)}
                                        className="w-full mt-4 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 duration-300"
                                    >
                                        Edit Profile
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}

export default Profile;