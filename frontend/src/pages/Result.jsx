import { useLocation } from "react-router-dom";

function Result() {

    const location = useLocation();
    const data = location.state;

    const concerns = [];

    // High Blood Pressure
    if (Number(data.restingBloodPressure) >= 140) {
        concerns.push({
            title: "High Resting Blood Pressure",
            value: `${data.restingBloodPressure} mmHg`,
            message: "Your resting blood pressure is elevated."
        });
    }

    // High Cholesterol
    if (Number(data.cholesterol) >= 200) {
        concerns.push({
            title: "High Cholesterol",
            value: `${data.cholesterol} mg/dL`,
            message: "Your cholesterol level is above the general reference level."
        });
    }

    // Low Maximum Heart Rate
    if (Number(data.maximumHeartRate) < 60) {
        concerns.push({
            title: "Low Heart Rate",
            value: `${data.maximumHeartRate} bpm`,
            message: "Your heart rate is lower than the usual resting range."
        });
    }

    // Exercise Angina
    if (data.exerciseAngina === "Yes") {
        concerns.push({
            title: "Exercise Angina Reported",
            value: "Yes",
            message: "Chest discomfort during exercise was reported."
        });
    }

    // Abnormal ECG
    if (data.restingEcg !== "Normal") {
        concerns.push({
            title: "Abnormal Resting ECG",
            value: data.restingEcg,
            message: "The selected ECG result is not Normal."
        });
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">

            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-5">

                <h1 className="text-3xl font-bold text-center text-red-600">
                    Heart Disease Prediction Result
                </h1>

                <p className="text-center text-gray-500 mt-2">
                    Patient Health Assessment Report
                </p>

                {/* Patient Details */}

                <div className="mt-6">

                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        Patient Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                        <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <p className="text-gray-500">Name</p>
                            <p className="font-semibold">{data.name}</p>
                        </div>

                        <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <p className="text-gray-500">Phone Number</p>
                            <p className="font-semibold">{data.phone}</p>
                        </div>

                        <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <p className="text-gray-500">Age</p>
                            <p className="font-semibold">{data.age}</p>
                        </div>

                        <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <p className="text-gray-500">Gender</p>
                            <p className="font-semibold">{data.gender}</p>
                        </div>

                    </div>

                </div>

                {/* Prediction Result */}

                <div className="mt-6">

                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        Prediction Result
                    </h2>

                    <div className="rounded-xl p-6 border border-red-200 bg-red-50">

                        <p className="text-gray-600 mb-2">
                            AI Prediction
                        </p>

                        <h3 className="text-2xl font-bold text-red-600">
                            {data.prediction}
                        </h3>

                        <div className="mt-5 border-t border-red-200 pt-5">

                            <p className="font-semibold text-gray-700 mb-2">
                                Recommendation
                            </p>

                            <p className="text-gray-600 leading-relaxed">
                                {data.recommendation}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Health Parameters */}

                <div className="mt-6">

                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        Health Parameters
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                        {/* Chest Pain Type */}
                        <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <p className="text-gray-500">Chest Pain Type</p>
                            <p className="font-semibold">
                                {data.chestPainType}
                            </p>
                        </div>


                        {/* Resting Blood Pressure */}
                        <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <p className="text-gray-500">
                                Resting Blood Pressure
                            </p>
                            <p className="font-semibold">
                                {data.restingBloodPressure} mmHg
                            </p>
                        </div>


                        {/* Cholesterol */}
                        <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <p className="text-gray-500">
                                Cholesterol
                            </p>
                            <p className="font-semibold">
                                {data.cholesterol} mg/dL
                            </p>
                        </div>


                        {/* Fasting Blood Sugar */}
                        <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <p className="text-gray-500">
                                Fasting Blood Sugar
                            </p>
                            <p className="font-semibold">
                                {data.fastingBloodSugar}
                            </p>
                        </div>


                        {/* Resting ECG */}
                        <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <p className="text-gray-500">
                                Resting ECG
                            </p>
                            <p className="font-semibold">
                                {data.restingEcg}
                            </p>
                        </div>


                        {/* Maximum Heart Rate */}
                        <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <p className="text-gray-500">
                                Maximum Heart Rate
                            </p>
                            <p className="font-semibold">
                                {data.maximumHeartRate} bpm
                            </p>
                        </div>


                        {/* Exercise Angina */}
                        <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <p className="text-gray-500">
                                Exercise Angina
                            </p>
                            <p className="font-semibold">
                                {data.exerciseAngina}
                            </p>
                        </div>


                        {/* Oldpeak */}
                        <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <p className="text-gray-500">
                                Oldpeak
                            </p>
                            <p className="font-semibold">
                                {data.oldpeak}
                            </p>
                        </div>


                        {/* ST Slope */}
                        <div className="bg-gray-50 px-4 py-2 rounded-lg">
                            <p className="text-gray-500">
                                ST Slope
                            </p>
                            <p className="font-semibold">
                                {data.stSlope}
                            </p>
                        </div>

                    </div>

                </div>

                {/* Health Concerns */}

                <div className="mt-6">

                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        Health Concerns
                    </h2>

                    {concerns.length > 0 ? (

                        <div className="space-y-3">

                            {concerns.map((concern, index) => (

                                <div
                                    key={index}
                                    className="border border-red-200 bg-red-50 rounded-lg p-4"
                                >

                                    <h3 className="font-bold text-red-600">
                                        ⚠️ {concern.title}
                                    </h3>

                                    <p className="font-semibold text-gray-800 mt-1">
                                        {concern.value}
                                    </p>

                                    <p className="text-gray-600 text-sm mt-1">
                                        {concern.message}
                                    </p>

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="border border-green-200 bg-green-50 rounded-lg p-4">

                            <p className="font-semibold text-green-700">
                                ✓ No major concerns identified from the entered parameters.
                            </p>

                        </div>

                    )}

                </div>

                {/* Print Report Button */}

                <div className="flex justify-center mt-10">

                    <button
                        onClick={() => window.print()}
                        className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 duration-300"
                    >
                        Print Report
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Result;