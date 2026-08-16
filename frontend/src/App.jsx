import './App.css'
import { Routes , Route } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import Prediction from './pages/Prediction';
import Result from './pages/Result';
import History from './pages/History';
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import VerifyOTP from './pages/VerifyOtp';
import ResetPassword from "./pages/ResetPassword";
import LearnMore from "./pages/LearnMore";

function App() {

  return (
    <>
       <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/prediction" element={<Prediction/>}/>
          <Route path="/result" element={<Result/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/ForgetPassword" element={<ForgetPassword/>}/>
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/learn-more" element={<LearnMore />} />
        </Routes>
       <Footer/>
</>
  );
}

export default App
