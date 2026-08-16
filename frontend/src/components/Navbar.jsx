import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );

  const handleLogout = () => {

    localStorage.removeItem("token");

    setIsLoggedIn(false);

    navigate("/login");
  };


  return (
    <nav className="w-full bg-white shadow-lg">

      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        <div className="flex items-center gap-5">

          <img
            src={logo}
            alt="CardioCare AI Logo"
            className="w-20 h-20 object-contain"
          />

          <div>

            <h1 className="text-5xl font-bold text-red-600 tracking-wide">
              CardioCare AI
            </h1>

            <p className="ml-1 text-gray-500 text-base mt-1">
              Heart Disease Prediction System
            </p>

          </div>

        </div>


        <ul className="flex items-center gap-8 text-lg font-semibold">

          <li>
            <Link
              to="/"
              className="hover:text-red-600 duration-300"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/learn-more"
              className="hover:text-red-600 duration-300"
            >
              Learn More
            </Link>
          </li>

          {isLoggedIn && (
            <>
              <li>
                <Link
                  to="/prediction"
                  className="hover:text-red-600 duration-300"
                >
                  Prediction
                </Link>
              </li>

              <li>
                <Link
                  to="/history"
                  className="hover:text-red-600 duration-300"
                >
                  History
                </Link>
              </li>
            </>
          )}

        </ul>

        <div className="flex items-center gap-5">

          {!isLoggedIn ? (

            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg border border-red-600 text-red-600 hover:bg-red-600 hover:text-white duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 duration-300"
              >
                Register
              </Link>
            </>

          ) : (
            <>
              <Link
                to="/profile"
                className="font-semibold hover:text-red-600 duration-300"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 duration-300"
              >
                Logout
              </button>

            </>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;