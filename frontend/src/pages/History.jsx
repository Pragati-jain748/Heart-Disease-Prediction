import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function History() {
    const navigate = useNavigate();

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchHistory = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:5000/history",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                console.log(response.data);

                setHistory(response.data);

            } catch (error) {

                console.error(
                    error.response?.data || error.message
                );

            } finally {

                setLoading(false);

            }

        };

        fetchHistory();

    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold text-red-600">
                    Prediction History
                </h1>

                <p className="text-gray-500 mt-2 mb-8">
                    View your previous heart disease predictions
                </p>

                {loading ? (

                    <p className="text-gray-500">
                        Loading history...
                    </p>

                ) : history.length === 0 ? (

                    <div className="bg-white rounded-xl shadow p-6 text-center">
                        <p className="text-gray-500">
                            No prediction history found.
                        </p>
                    </div>

                ) : (

                    <div className="space-y-4">

                        {history.map((item) => (

                            <div
                                key={item._id}
                                className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center"
                            >

                                <div>

                                    <h2 className="text-xl font-bold text-gray-800">
                                        {item.name}
                                    </h2>

                                    <p className="text-gray-500 mt-1">
                                        Age: {item.age} | Gender: {item.gender}
                                    </p>

                                    <p className="text-gray-500 mt-1">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </p>

                                </div>


                                <div className="text-right">

                                    <p
                                        className={`font-bold ${item.prediction.includes("High")
                                                ? "text-red-600"
                                                : "text-green-600"
                                            }`}
                                    >
                                        {item.prediction}
                                    </p>

                                    <button
                                        onClick={() => navigate("/result", {
                                            state: {
                                                name: item.name,
                                                phone: item.phone,
                                                age: item.age,
                                                gender: item.gender,

                                                chestPainType: item.chest_pain_type,
                                                restingBloodPressure: item.resting_blood_pressure,
                                                cholesterol: item.cholesterol,
                                                fastingBloodSugar: item.fasting_blood_sugar,
                                                restingEcg: item.resting_ecg,
                                                maximumHeartRate: item.maximum_heart_rate,
                                                exerciseAngina: item.exercise_angina,
                                                oldpeak: item.oldpeak,
                                                stSlope: item.st_slope,

                                                prediction: item.prediction,
                                                recommendation: item.recommendation
                                            }
                                        })}
                                        className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 duration-300"
                                    >
                                        View Report
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default History;