import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">

      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-5xl font-bold mb-4">

          CardioCare AI

        </h2>

        <p className="text-gray-400">

          AI-powered Heart Disease Prediction System

        </p>

        <div className="flex justify-center gap-8 mt-8 ">

          <Link
          to="/"
           className="hover:text-red-500 duration-300" href="/">Home</Link>

          <Link to="/login"
           className="hover:text-red-500 duration-300">Login</Link>

          <Link to="/register"
           className="hover:text-red-500 duration-300">Register</Link>

        </div>

        <p className="mt-10 text-gray-500">

          © 2026 CardioCare AI. All Rights Reserved.

        </p>

      </div>

    </footer>
  )
}

export default Footer
