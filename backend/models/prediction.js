const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    chest_pain_type: {
        type: String,
        required: true
    },

    resting_blood_pressure: {
        type: Number,
        required: true
    },

    cholesterol: {
        type: Number,
        required: true
    },

    fasting_blood_sugar: {
        type: String,
        required: true
    },

    resting_ecg: {
        type: String,
        required: true
    },

    maximum_heart_rate: {
        type: Number,
        required: true
    },

    exercise_angina: {
        type: String,
        required: true
    },

    oldpeak: {
        type: Number,
        required: true
    },

    st_slope: {
        type: String,
        required: true
    },

    prediction: {
        type: String,
        required: true
    },
    recommendation: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Prediction", predictionSchema);
