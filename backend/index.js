const express = require("express");
require("dotenv").config();

const nodemailer = require("nodemailer");
const cors = require("cors");
const axios = require("axios");
const bcrypt = require("bcrypt");

const connectDB = require("./config/db");

const Prediction = require("./models/Prediction");
const User = require("./models/User");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend is Running at port 5000");
});

app.post("/predict", authMiddleware, async (req, res) => {

    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.user.email;
    const userId = req.user.userId;

    const age = req.body.age;
    const gender = req.body.gender;
    const chest_pain_type = req.body.chest_pain_type;
    const resting_blood_pressure = req.body.resting_blood_pressure;
    const cholesterol = req.body.cholesterol;
    const fasting_blood_sugar = req.body.fasting_blood_sugar;
    const resting_ecg = req.body.resting_ecg;
    const maximum_heart_rate = req.body.maximum_heart_rate;
    const exercise_angina = req.body.exercise_angina;
    const oldpeak = req.body.oldpeak;
    const st_slope = req.body.st_slope;


    if (!name || name.trim() === "") {
        return res.status(400).json({
            error: "Name is required"
        });
    }

    if (!phone || !/^\d{10}$/.test(phone)) {
        return res.status(400).json({
            error: "Phone number must contain exactly 10 digits"
        });
    }

    if (!age || age <= 0) {
        return res.status(400).json({
            error: "Age must be Positive"
        });
    }

    if (gender !== "Male" && gender !== "Female") {
        return res.status(400).json({
            error: "A Valid gender is Required"
        });
    }

    if (
        chest_pain_type !== "ATA" &&
        chest_pain_type !== "NAP" &&
        chest_pain_type !== "TA" &&
        chest_pain_type !== "ASY"
    ) {
        return res.status(400).json({
            error: "Invalid Chest Pain Type"
        });
    }

    if (cholesterol <= 0) {
        return res.status(400).json({
            error: "Cholesterol must be Positive"
        });
    }

    if (resting_blood_pressure <= 0) {
        return res.status(400).json({
            error: "Resting Blood Pressure must be Positive"
        });
    }

    if (
        fasting_blood_sugar !== "Yes" &&
        fasting_blood_sugar !== "No"
    ) {
        return res.status(400).json({
            error: "Fasting Blood Sugar must be Yes or No"
        });
    }

    if (
        resting_ecg !== "Normal" &&
        resting_ecg !== "ST" &&
        resting_ecg !== "LVH"
    ) {
        return res.status(400).json({
            error: "Resting ECG must be Normal, ST or LVH"
        });
    }

    if (maximum_heart_rate <= 0) {
        return res.status(400).json({
            error: "Heart Rate must be Positive"
        });
    }

    if (
        exercise_angina !== "Yes" &&
        exercise_angina !== "No"
    ) {
        return res.status(400).json({
            error: "Exercise Angina must be Yes or No"
        });
    }

    if (oldpeak < 0) {
        return res.status(400).json({
            error: "Old Peak cannot be negative"
        });
    }

    if (
        st_slope !== "Up" &&
        st_slope !== "Flat" &&
        st_slope !== "Down"
    ) {
        return res.status(400).json({
            error: "ST Slope must be Up, Flat or Down"
        });
    }


    try {

        const response = await axios.post(
           `${process.env.ML_API_URL}/predict`,
            {
                name,
                phone,
                email,
                age,
                gender,
                chest_pain_type,
                resting_blood_pressure,
                cholesterol,
                fasting_blood_sugar,
                resting_ecg,
                maximum_heart_rate,
                exercise_angina,
                oldpeak,
                st_slope
            }
        );


        await Prediction.create({

            userId,
            name,
            phone,
            email,
            age,
            gender,
            chest_pain_type,
            resting_blood_pressure,
            cholesterol,
            fasting_blood_sugar,
            resting_ecg,
            maximum_heart_rate,
            exercise_angina,
            oldpeak,
            st_slope,

            prediction: response.data.prediction,
            recommendation: response.data.recommendation

        });


        return res.json(response.data);

    } catch (error) {

        console.error(
            error.response?.data || error.message
        );

        return res.status(500).json({
            error: "Unable to connect to FastAPI"
        });

    }

});

app.get("/history", authMiddleware, async (req, res) => {

    try {

        const userId = req.user.userId;

        const predictions = await Prediction.find({ userId })
            .sort({ createdAt: -1 });

        return res.status(200).json(predictions);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Unable to fetch prediction history"
        });

    }

});

app.get("/profile", authMiddleware, async (req, res) => {

    try {

        const userId = req.user.userId;

        const user = await User.findById(userId);

        if (!user) {

            return res.status(404).json({
                error: "User not found"
            });

        }


        return res.status(200).json({

            name: user.name,
            phone: user.phone,
            email: user.email

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Unable to fetch profile"
        });

    }

});

app.put("/profile", authMiddleware, async (req, res) => {

    try {

        const userId = req.user.userId;

        const { name, email, phone } = req.body;


        if (!name || name.trim() === "") {

            return res.status(400).json({
                error: "Name is required"
            });

        }


        if (!email || !/\S+@\S+\.\S+/.test(email)) {

            return res.status(400).json({
                error: "Valid email is required"
            });

        }


        if (!phone || !/^\d{10}$/.test(phone)) {

            return res.status(400).json({
                error: "Phone number must contain exactly 10 digits"
            });

        }


        const existingUser = await User.findOne({

            email,
            _id: { $ne: userId }

        });


        if (existingUser) {

            return res.status(400).json({
                error: "This email is already in use"
            });

        }


        const updatedUser = await User.findByIdAndUpdate(

            userId,

            {
                name,
                email,
                phone
            },

            {
                new: true
            }

        );


        if (!updatedUser) {

            return res.status(404).json({
                error: "User not found"
            });

        }


        return res.status(200).json({

            message: "Profile updated successfully",

            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Unable to update profile"
        });

    }

});

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS

    }

});

app.post("/ForgetPassword", async (req, res) => {

    try {
        const { email } = req.body;
        if (!email || email.trim() === "") {

            return res.status(400).json({
                error: "Fill the Email first"
            });

        }

        const user = await User.findOne({ email });

        console.log("Email received:", email);

        if (!user) {

            return res.status(404).json({
                error: "User not Found"
            });

        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        user.resetOTP = otp;

        user.resetOTPExpiry = new Date(
            Date.now() + 10 * 60 * 1000
        );

        await user.save();


        console.log("OTP Generated:", otp);

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: email,

            subject: "Password Reset OTP",

            text: `Your OTP is: ${otp}
This OTP is valid for 10 minutes.`

        });


        return res.status(200).json({

            message: "OTP sent successfully. Please check your email."

        });

    } catch (error) {

        console.error("FORGOT PASSWORD ERROR:", error);

        return res.status(500).json({

            error: "Unable to process forgot password request"

        });

    }

});

app.post("/verify-otp", async (req, res) => {

    try {
        const { email, otp } = req.body;

        if (!email || !otp) {

            return res.status(400).json({
                error: "Email and OTP are required"
            });

        }

        const user = await User.findOne({ email });


        if (!user) {

            return res.status(404).json({
                error: "User not found"
            });

        }

        console.log("VERIFY DATA:", email, otp);
        console.log("DB OTP:", user.resetOTP);
        console.log("ENTERED OTP:", otp);
        console.log("OTP EXPIRY:", user.resetOTPExpiry);

        if (String(user.resetOTP) !== String(otp)) {

            return res.status(400).json({
                error: "Invalid OTP"
            });

        }

        if (new Date(user.resetOTPExpiry) < new Date()) {

            return res.status(400).json({
                error: "OTP has expired"
            });

        }
        return res.status(200).json({

            message: "OTP verified successfully"

        });

    } catch (error) {

        console.error("VERIFY OTP ERROR:", error);

        return res.status(500).json({

            error: "Unable to verify OTP"

        });

    }

});

app.post("/reset-password", async (req, res) => {

    try {

        const { email, newPassword, confirmPassword } = req.body;


        if (!email) {

            return res.status(400).json({
                error: "Email is required"
            });

        }


        if (!newPassword || !confirmPassword) {

            return res.status(400).json({
                error: "Password and Confirm Password are required"
            });

        }


        if (newPassword !== confirmPassword) {

            return res.status(400).json({
                error: "Passwords do not match"
            });

        }


        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;


        if (!passwordRegex.test(newPassword)) {

            return res.status(400).json({
                error: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
            });

        }


        const user = await User.findOne({ email });


        if (!user) {

            return res.status(404).json({
                error: "User not found"
            });

        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);


        user.password = hashedPassword;
        user.resetOTP = undefined;
        user.resetOTPExpiry = undefined;


        await user.save();


        return res.status(200).json({
            message: "Password reset successfully"
        });


    } catch (error) {

        console.error("RESET PASSWORD ERROR:", error);


        return res.status(500).json({
            error: "Unable to reset password"
        });

    }

});


app.listen(port, () => {

    console.log(
        `Server is running on port ${port}`
    );

});