import { Link } from "react-router-dom";

function Home() {
  const isLoggedIn = localStorage.getItem("token") !== null;

  if (!isLoggedIn) {
    return (
      <div className="min-h-[85vh] bg-gradient-to-b from-gray-100 to-white flex items-center justify-center px-4">
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center border-t-8 border-red-600 transform transition duration-500 hover:scale-[1.01]">
          {/* Animated Heart Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-600 shadow-inner animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Welcome to CardioCare AI
          </h2>

          <p className="text-gray-500 mt-4 mb-8 text-base leading-relaxed">
            Predict the possibility of heart disease using our advanced AI-powered system. Please log in or create an account to start your health analysis.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="flex-1 px-6 py-3.5 rounded-xl border-2 border-red-600 text-red-600 font-bold hover:bg-red-600 hover:text-white duration-300 shadow-sm text-center"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="flex-1 px-6 py-3.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 duration-300 shadow-md hover:shadow-lg text-center"
            >
              Register
            </Link>
          </div>
          
          <div className="mt-8 border-t border-gray-100 pt-6">
            <p className="text-xs text-gray-400">
              🔒 Your health data is safe, secure, and encrypted.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
     {/* Hero Section */}
    <section className="min-h-[85vh] bg-gradient-to-b from-gray-100 to-white flex items-center justify-center">

      <div className="max-w-5xl text-center px-6">

        <h1 className="text-6xl font-bold text-red-600 mb-6">
          Heart Disease Predictor
        </h1>

        <h3 className="text-2xl text-gray-700 mb-6">
          AI-powered Heart Disease Risk Assessment
        </h3>

        <p className="text-gray-600 text-lg leading-8 mb-10">
          Predict the possibility of heart disease using Artificial
          Intelligence. Get quick insights and personalized
          recommendations based on your health information.
        </p>
        <div className="flex justify-center gap-6 mt-10">
        <Link
          to="/prediction"
          className="bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-700 duration-300 shadow-md"
        >
          Start Prediction
        </Link>
         <Link
          to="/learn-more"
          className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-600 hover:text-white duration-300"
        >
          Learn More
        </Link>
        </div>

        <p className="mt-12 text-gray-500 text-sm">
          ⚠️ AI predictions are for informational purposes only and may not
          always be accurate. Please consult a healthcare professional for
          medical advice.
        </p>

      </div>
      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto py-24 px-8">

        <h2 className="text-4xl font-bold text-center mb-16">
          Why Choose CardioCare AI?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h3 className="text-2xl font-bold text-red-600 mb-4">
              ⚡ Fast Prediction
            </h3>

            <p>
              Get heart disease prediction within seconds using AI.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h3 className="text-2xl font-bold text-red-600 mb-4">
              🔒 Secure Data
            </h3>

            <p>
              Your health information is encrypted and protected.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h3 className="text-2xl font-bold text-red-600 mb-4">
              📈 Prediction History
            </h3>

            <p>
              Access all previous predictions anytime.
            </p>

          </div>

        </div>

      </section>

      {/* How it Work */}

<section className="bg-white py-24">

  <h2 className="text-4xl font-bold text-center">
    How It Works
  </h2>

  <p className="text-center text-gray-500 mt-4 max-w-2xl mx-auto">
    Get your heart disease risk prediction in just three simple steps using
    our AI-powered healthcare system.
  </p>

  <div className="flex justify-center gap-20 mt-16">

    <div className="text-center">

      <h1 className="text-6xl font-bold text-red-600">1</h1>

      <h3 className="text-xl font-semibold mt-4">
        Create Account
      </h3>

      <p className="text-gray-600 mt-2">
        Register securely using your name,
        email and password.
      </p>

    </div>

    <div className="text-center">

      <h1 className="text-6xl font-bold text-red-600">2</h1>

      <h3 className="text-xl font-semibold mt-4">
        Enter Health Details
      </h3>

      <p className="text-gray-600 mt-2">
        Fill in your medical details for
        accurate AI analysis.
      </p>

    </div>

    <div className="text-center">

      <h1 className="text-6xl font-bold text-red-600">3</h1>

      <h3 className="text-xl font-semibold mt-4">
        Get AI Prediction
      </h3>

      <p className="text-gray-600 mt-2">
        Receive an instant heart disease
        risk prediction with insights.
      </p>

    </div>

  </div>

</section>

    </>

  );
}

export default Home;