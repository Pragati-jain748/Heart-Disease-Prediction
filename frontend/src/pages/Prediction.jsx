import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Prediction() {

    const navigate = useNavigate();

    // Loading state
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [chestPainType, setChestPainType] = useState("");
    const [restingBloodPressure, setRestingBloodPressure] = useState("");
    const [cholesterol, setCholesterol] = useState("");
    const [fastingBloodSugar, setFastingBloodSugar] = useState("");
    const [restingEcg, setRestingEcg] = useState("");
    const [maximumHeartRate, setMaximumHeartRate] = useState("");
    const [exerciseAngina, setExerciseAngina] = useState("");
    const [oldpeak, setOldpeak] = useState("");
    const [stSlope, setStSlope] = useState("");

    const handlePrediction = async (e) => {

        e.preventDefault();
        if (
            name.trim() === "" ||
            phone.trim() === "" ||
            age === "" ||
            gender === "" ||
            chestPainType === "" ||
            restingBloodPressure === "" ||
            cholesterol === "" ||
            fastingBloodSugar === "" ||
            restingEcg === "" ||
            maximumHeartRate === "" ||
            exerciseAngina === "" ||
            oldpeak === "" ||
            stSlope === ""
        ) {
            alert("Please fill all fields");
            return;
        }

        setLoading(true);


        try {
            const response = await axios.post(
                "https://heart-disease-backend-3o3m.onrender.com/predict",

                {
                    name,
                    phone,
                    age,
                    gender,

                    chest_pain_type: chestPainType,
                    resting_blood_pressure: restingBloodPressure,
                    cholesterol,
                    fasting_blood_sugar: fastingBloodSugar,
                    resting_ecg: restingEcg,
                    maximum_heart_rate: maximumHeartRate,
                    exercise_angina: exerciseAngina,
                    oldpeak,
                    st_slope: stSlope
                },

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );


            console.log(response.data);
            await new Promise((resolve) => {
                setTimeout(resolve, 3000);
            });


            navigate("/result", {
                state: {

                    // Patient details
                    name,
                    phone,
                    age,
                    gender,

                    // Medical details
                    chestPainType,
                    restingBloodPressure,
                    cholesterol,
                    fastingBloodSugar,
                    restingEcg,
                    maximumHeartRate,
                    exerciseAngina,
                    oldpeak,
                    stSlope,

                    // Backend prediction result
                    prediction: response.data.prediction,
                    recommendation: response.data.recommendation
                }
            });


        } catch (error) {

            console.log("ERROR STATUS:", error.response?.status);
            console.log("ERROR DATA:", JSON.stringify(error.response?.data));
            console.log("ERROR MESSAGE:", error.message);

            alert(
                JSON.stringify(error.response?.data) ||
                error.message ||
                "Prediction failed"
            );

        } finally {
            setLoading(false);
        }

    };


    return (
        <>
            {loading ? (

                <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex flex-col items-center justify-center p-6">
                    <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center border border-red-100 space-y-6">
                        <div className="relative flex items-center justify-center w-28 h-28 mx-auto">
                            <div className="absolute w-24 h-24 bg-red-100 rounded-full animate-ping opacity-75"></div>
                            <div className="relative w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-500/30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-2xl font-extrabold text-gray-800">
                            Analyzing Heart Metrics...
                        </h2>

                        <p className="text-gray-500 text-sm leading-relaxed">
                            Our AI model is processing the clinical indicators, ECG waveforms, blood pressure, and cholesterol levels.
                        </p>

                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full animate-pulse" style={{ width: '85%' }}></div>
                        </div>

                        <p className="text-xs text-gray-400">
                            This risk analysis may take a few moments
                        </p>
                    </div>
                </div>

            ) : (

                <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">

                        {/* Banner Block */}
                        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8 text-center relative overflow-hidden">
                            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 rounded-full bg-red-500/20"></div>
                            <div className="absolute left-0 bottom-0 -translate-x-12 translate-y-12 w-48 h-48 rounded-full bg-red-500/20"></div>
                            <h1 className="text-3xl font-extrabold relative z-10">Heart Disease Risk Prediction</h1>
                            <p className="mt-2 text-red-100/90 text-sm relative z-10">Fill in patient data below to check probability score and get custom guidelines</p>
                        </div>

                        <form onSubmit={handlePrediction} className="p-8 sm:p-10 space-y-8" autoComplete="off">

                            {/* Section 1: PERSONAL DETAILS */}
                            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2.5">
                                    <span className="p-1.5 rounded-lg bg-red-50 text-red-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>
                                    Personal Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Patient Name
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter patient name"
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-300 font-medium text-gray-700 placeholder-gray-400 bg-white"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Enter phone number"
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-300 font-medium text-gray-700 placeholder-gray-400 bg-white"
                                        />
                                    </div>

                                    {/* Age */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Age (Years)
                                        </label>
                                        <input
                                            type="number"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            placeholder="Enter age"
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-300 font-medium text-gray-700 placeholder-gray-400 bg-white"
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Gender
                                        </label>
                                        <select
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-300 font-medium text-gray-700 bg-white"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: MEDICAL DETAILS */}
                            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2.5">
                                    <span className="p-1.5 rounded-lg bg-red-50 text-red-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </span>
                                    Clinical & Laboratory Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Chest Pain Type */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Chest Pain Type
                                        </label>
                                        <select
                                            value={chestPainType}
                                            onChange={(e) => setChestPainType(e.target.value)}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-300 font-medium text-gray-700 bg-white"
                                        >
                                            <option value="">Select Chest Pain Type</option>
                                            <option value="ATA">ATA - Atypical Angina</option>
                                            <option value="NAP">NAP - Non-Anginal Pain</option>
                                            <option value="TA">TA - Typical Angina</option>
                                            <option value="ASY">ASY - Asymptomatic</option>
                                        </select>
                                    </div>

                                    {/* Resting Blood Pressure */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Resting Blood Pressure (mm Hg)
                                        </label>
                                        <input
                                            type="number"
                                            value={restingBloodPressure}
                                            onChange={(e) => setRestingBloodPressure(e.target.value)}
                                            placeholder="e.g. 120"
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-300 font-medium text-gray-700 placeholder-gray-400 bg-white"
                                        />
                                    </div>

                                    {/* Cholesterol */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Cholesterol (mg/dl)
                                        </label>
                                        <input
                                            type="number"
                                            value={cholesterol}
                                            onChange={(e) => setCholesterol(e.target.value)}
                                            placeholder="e.g. 200"
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-300 font-medium text-gray-700 placeholder-gray-400 bg-white"
                                        />
                                    </div>

                                    {/* Fasting Blood Sugar */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Fasting Blood Sugar &gt; 120 mg/dl?
                                        </label>
                                        <select
                                            value={fastingBloodSugar}
                                            onChange={(e) => setFastingBloodSugar(e.target.value)}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-300 font-medium text-gray-700 bg-white"
                                        >
                                            <option value="">Select Option</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>

                                    {/* Resting ECG */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Resting ECG Results
                                        </label>
                                        <select
                                            value={restingEcg}
                                            onChange={(e) => setRestingEcg(e.target.value)}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-300 font-medium text-gray-700 bg-white"
                                        >
                                            <option value="">Select ECG Type</option>
                                            <option value="Normal">Normal</option>
                                            <option value="ST">ST (ST-T Wave Abnormality)</option>
                                            <option value="LVH">LVH (Left Ventricular Hypertrophy)</option>
                                        </select>
                                    </div>

                                    {/* Maximum Heart Rate */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Max Heart Rate Achieved (bpm)
                                        </label>
                                        <input
                                            type="number"
                                            value={maximumHeartRate}
                                            onChange={(e) => setMaximumHeartRate(e.target.value)}
                                            placeholder="e.g. 150"
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-300 font-medium text-gray-700 placeholder-gray-400 bg-white"
                                        />
                                    </div>

                                    {/* Exercise Angina */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Exercise Induced Angina?
                                        </label>
                                        <select
                                            value={exerciseAngina}
                                            onChange={(e) => setExerciseAngina(e.target.value)}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-300 font-medium text-gray-700 bg-white"
                                        >
                                            <option value="">Select Option</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>

                                    {/* Oldpeak */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Oldpeak (ST Depression)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            value={oldpeak}
                                            onChange={(e) => setOldpeak(e.target.value)}
                                            placeholder="e.g. 1.5"
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-300 font-medium text-gray-700 placeholder-gray-400 bg-white"
                                        />
                                    </div>

                                    {/* ST Slope */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            ST Slope Type
                                        </label>
                                        <select
                                            value={stSlope}
                                            onChange={(e) => setStSlope(e.target.value)}
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all duration-300 font-medium text-gray-700 bg-white"
                                        >
                                            <option value="">Select ST Slope</option>
                                            <option value="Up">Up</option>
                                            <option value="Flat">Flat</option>
                                            <option value="Down">Down</option>
                                        </select>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex items-end">
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-red-500/20 hover:from-red-700 hover:to-red-800 transition duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 text-lg"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                            Predict Risk Score
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Prediction;