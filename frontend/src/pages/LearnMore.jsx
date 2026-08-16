import { Link } from "react-router-dom";

function LearnMore() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-red-600 tracking-tight">
            How CardioCare AI Works
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Your comprehensive guide to AI-powered heart disease risk assessment, system features, and account management.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Main Info Columns */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Section 1: What is CardioCare AI? */}
            <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-red-600">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="p-2 rounded-lg bg-red-50 text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                What is CardioCare AI?
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                CardioCare AI is an advanced, machine learning-driven web application designed to assess the potential risk of heart disease in patients. By analyzing a series of clinical variables—such as age, cholesterol, maximum heart rate, and resting blood pressure—our trained model calculates risk levels and provides immediate, actionable health recommendations.
              </p>
            </div>

            {/* Section 2: Step-by-Step Guide */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="p-2 rounded-lg bg-red-50 text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </span>
                Step-by-Step User Flow
              </h2>
              
              <div className="relative border-l border-gray-200 ml-4 space-y-8">
                
                {/* Step 1 */}
                <div className="relative pl-8">
                  <div className="absolute -left-3 top-1 bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold shadow-md">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Account Registration</h3>
                  <p className="text-gray-500 mt-1">
                    Create a secure account using your name, valid email, and contact number. Ensure you use a strong password with symbols and uppercase letters for security.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative pl-8">
                  <div className="absolute -left-3 top-1 bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold shadow-md">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Submit Clinical Parameters</h3>
                  <p className="text-gray-500 mt-1">
                    Navigate to "Start Prediction". Enter accurate patient metrics. You can refer to standard laboratory test reports for values like resting blood pressure and serum cholesterol.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative pl-8">
                  <div className="absolute -left-3 top-1 bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold shadow-md">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Instant AI Assessment</h3>
                  <p className="text-gray-500 mt-1">
                    The backend triggers our FastAPI server powered by Machine Learning. Within seconds, it returns a risk classification (Normal or Risk) along with custom medical recommendations.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="relative pl-8">
                  <div className="absolute -left-3 top-1 bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-bold shadow-md">
                    4
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">History Tracking</h3>
                  <p className="text-gray-500 mt-1">
                    All previous predictions are securely saved to your account. You can review past reports, trends, or patient entries anytime via the "History" tab.
                  </p>
                </div>

              </div>
            </div>

            {/* Section 3: Password Reset Help */}
            <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-yellow-500">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="p-2 rounded-lg bg-yellow-50 text-yellow-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </span>
                How to Reset Your Password
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Forgot your password? No worries, you can reset it securely in under 2 minutes:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Go to the <Link to="/login" className="text-red-600 font-semibold hover:underline">Login Page</Link> and click on the <strong>"Forgot Password?"</strong> link.</li>
                <li>Enter your registered email address and click <strong>"Send OTP"</strong>.</li>
                <li>Check your inbox for the 6-digit OTP (One-Time Password) sent by our mail server. (Note: Valid for 10 minutes).</li>
                <li>Enter the OTP on the verification page and hit <strong>"Verify OTP"</strong>.</li>
                <li>You will be redirected to the <strong>"Reset Password"</strong> page. Enter your new password, confirm it, and submit to update successfully.</li>
              </ul>
            </div>

          </div>

          {/* Sidebar / Glossary & Disclaimer */}
          <div className="space-y-8">
            
            {/* Sidebar Card 1: Medical Terms Glossary */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Clinical Variables Guide
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-red-600">Chest Pain Types</h4>
                  <p className="text-gray-500 mt-0.5">
                    <strong>TA:</strong> Typical Angina (chest pressure)<br />
                    <strong>ATA:</strong> Atypical Angina (sharp/transient pain)<br />
                    <strong>NAP:</strong> Non-Anginal Pain (musculoskeletal)<br />
                    <strong>ASY:</strong> Asymptomatic (no symptoms)
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600">Resting Blood Pressure</h4>
                  <p className="text-gray-500 mt-0.5">
                    The blood pressure measured in mm Hg upon admission to the hospital/clinic.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600">Serum Cholesterol</h4>
                  <p className="text-gray-500 mt-0.5">
                    Total blood cholesterol level in mg/dl. High cholesterol increases coronary risk.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600">ST Slope</h4>
                  <p className="text-gray-500 mt-0.5">
                    The slope of the peak exercise ST segment (Up, Flat, or Down), which is a key diagnostic indicator in electrocardiograms.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar Card 2: Security & Privacy */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                🔒 Privacy & Security
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                CardioCare AI respects your personal health info. All passwords are encrypted using industry-standard bcrypt algorithms. Communications between frontend, Node backend, and FastAPI machine learning modules are protected.
              </p>
            </div>

            {/* Sidebar Card 3: Disclaimer */}
            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
              <h3 className="text-lg font-bold text-red-800 mb-2">
                ⚠️ Medical Disclaimer
              </h3>
              <p className="text-red-900/80 text-xs leading-relaxed">
                The predictions generated by CardioCare AI are for general informational, educational, and awareness purposes only. This system does NOT provide medical advice or official diagnoses. Always consult a certified physician or cardiologist for any chest discomfort or heart concerns.
              </p>
            </div>

            {/* Back button */}
            <div className="text-center">
              <Link
                to="/"
                className="inline-block bg-gray-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-900 transition duration-300 w-full text-center shadow-md"
              >
                Back to Home
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default LearnMore;
