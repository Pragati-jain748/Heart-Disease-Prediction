const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const Otp = require("../models/Otp");
const sendEmail = require("../utils/sendEmail");


const router = express.Router();

// register
router.post('/register', async (req, res) => {
     console.log("REGISTER BODY:", req.body);
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;

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
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({
            error: "Invalid Email"
        });
    }

    if (!password) {
        return res.status(400).json({
            error: "Password is required"
        });
    }

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({
            "error": "Email already registered"
        })
    }
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
        return res.status(400).json({
            "error": "Phone Number already registered"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    await User.create({
        name,
        phone,
        email,
        password: hashedPassword
    })


    return res.status(201).json({
        message: "User Registered Successfully"
    });
})



// login
router.post('/login', async (req, res) => {
     console.log("LOGIN BODY:", req.body);
    const email = req.body.email;
    const password = req.body.password;

    // email Validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({
            error: "Invalid Email"
        });
    }
    // Password Validation
    if (!password) {
        return res.status(400).json({
            error: "Password is required"
        });
    }

    // Check wheather user already exists or not
    const existingEmail = await User.findOne({ email });
    if (!existingEmail) {
        return res.status(400).json({
            error: "Invalid Email"
        })
    }

    // Password match or not
    const isMatch = await bcrypt.compare(password, existingEmail.password);

    if (!isMatch) {
        return res.status(400).json({
            error: "Invalid Password"
        });
    }

    const token = jwt.sign(
        {
            userId: existingEmail._id,  
            email: existingEmail.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return res.status(200).json({
        message: "Login Successful",
        token: token
    });
})


// FORGOT PASSWORD

router.post("/forgot-password", async (req, res) => {

    const { email } = req.body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({
            error: "Invalid Email"
        });
    }

    const existingEmail = await User.findOne({ email });

    if (!existingEmail) {
        return res.status(404).json({
            error: "Email not registered"
        });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.deleteMany({ email });

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await Otp.create({
        email,
        otp,
        expiresAt
    });

    await sendEmail(

        email,

        "Password Reset OTP",

        `Your OTP for password reset is: ${otp}

        This OTP is valid for 10 minutes.

        Do not share this OTP with anyone.`

    );

    return res.status(200).json({
        message: "OTP Generated Successfully",
    });

});

router.post("/verify-otp", async (req, res) => {

    const { email, otp } = req.body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({
            error: "Invalid Email"
        });
    }

    if (!otp) {
        return res.status(400).json({
            error: "OTP is required"
        });
    }
    const otpData = await Otp.findOne({
        email,
        otp
    });

    if (!otpData) {
        return res.status(400).json({
            error: "Invalid OTP"
        });
    }

    if (otpData.expiresAt < new Date()) {

        await Otp.deleteOne({ _id: otpData._id });

        return res.status(400).json({
            error: "OTP Expired"
        });
    }

    return res.status(200).json({
        message: "OTP Verified Successfully"
    });

});

router.post("/reset-password", async (req, res) => {

    const { email, otp, newPassword } = req.body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({
            error: "Invalid Email"
        });
    }

    if (!otp) {
        return res.status(400).json({
            error: "OTP is required"
        });
    }

    if (!newPassword) {
        return res.status(400).json({
            error: "New Password is required"
        });
    }

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
            error: "Password is not strong enough"
        });
    }

    const otpData = await Otp.findOne({
        email,
        otp
    });

    if (!otpData) {
        return res.status(400).json({
            error: "Invalid OTP"
        });
    }

    if (otpData.expiresAt < new Date()) {

        await Otp.deleteOne({
            _id: otpData._id
        });

        return res.status(400).json({
            error: "OTP Expired"
        });

    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne(

        { email },

        {
            password: hashedPassword
        }

    );
    await Otp.deleteOne({
        _id: otpData._id
    });

    return res.status(200).json({

        message: "Password Reset Successfully"

    });

});

module.exports = router;