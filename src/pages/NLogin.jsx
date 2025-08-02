import React, { useState } from "react";
import TransNavbarAbout from "../Components/TransNavbarAbout";
import useIsMobile from "../hooks/useIsMobile";
import { useNavigate } from "react-router-dom";

import AnimatedGradientLogin from "./AnimatedGradientLogin";
import "./Flip.css";
import "./Login.css"; // if you need old styles

function NLogin() {
      console.log("NLogin loaded");
      const isMobile = useIsMobile();
      const navigate = useNavigate();



  const [isSignup, setIsSignup] = useState(false);
 const [isLoggedIn, setIsLoggedIn] = useState(false); // After login
const [showClientForm, setShowClientForm] = useState(false); // After signup


  return (
    <AnimatedGradientLogin>
      {isMobile && <TransNavbarAbout />}

      <div className={`relative z-10 flex items-center justify-center min-h-screen ${isMobile ? "pb-20" : ""}`}>

        
        {!showClientForm ? (
        !isLoggedIn ? (
        <div className={`flip-container ${isSignup ? "flipped" : ""}`}>
          <div className="flipper">
            {/* FRONT: LOGIN FORM */}
                <div className="form-container front bg-white/80 backdrop-blur-lg shadow-xl p-8 rounded-md border border-white/30">
              <p className="title text-2xl font-bold mb-4">Login</p>
              <form className="form space-y-4">
                <div className="input-group">
                  <label htmlFor="username" className="block text-sm font-medium">Username</label>
                  <input type="text" name="username" id="username" className="w-full p-2 border rounded" />
                </div>
                <div className="input-group">
                  <label htmlFor="password" className="block text-sm font-medium">Password</label>
                  <input type="password" name="password" id="password" className="w-full p-2 border rounded" />
                  <div className="forgot text-right mt-1">
                    <a href="#" className="text-blue-500 text-sm">Forgot Password?</a>
                  </div>
                </div>
<button
  type="button"
  onClick={() => {
  setIsLoggedIn(true);
  navigate("/dashboard"); // ✅ Redirect to lawyer selection page
}}

  className="sign w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
>
  Sign in
</button>

              </form>

              <div className="social-message flex items-center my-6">
                <div className="flex-grow h-px bg-gray-500"></div>
                <p className="mx-4 text-sm text-white">Login with social accounts</p>
                <div className="flex-grow h-px bg-gray-500"></div>
              </div>

              <div className="social-icons">
                <button aria-label="Log in with Google" className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    width="100"
                    height="100"
                  >
                    <g fill="#ffffff" fillRule="nonzero" style={{ mixBlendMode: 'normal' }}>
                      <g transform="scale(5.33333)">
                        <path d="M43.611,20.083h-1.611v-0.083h-18v8h11.303c-1.649,4.657-6.08,8-11.303,8
        c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
        c-3.572-3.329-8.35-5.382-13.618-5.382c-11.045,0-20,8.955-20,20c0,11.045,8.955,20,20,20
        c11.045,0,20-8.955,20-20c0-1.341-0.138-2.65-0.389-3.917z" />
                        <path d="M6.306,14.691l6.571,4.819c1.778-4.402,6.084-7.51,11.123-7.51c3.059,0,5.842,1.154,7.961,3.039
        l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382c-7.682,0-14.344,4.337-17.694,10.691z" />
                        <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238c-2.008,1.521-4.504,2.43-7.219,2.43
        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025c3.31,6.477,10.032,10.921,17.805,10.921z" />
                        <path d="M43.611,20.083h-1.611v-0.083h-18v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
        c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238c-0.438,0.398,6.591-4.807,6.591-14.807
        c0-1.341-0.138-2.65-0.389-3.917z" />
                      </g>
                    </g>
                  </svg>
                </button>
                <button aria-label="Log in with Twitter" className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                    <path d="M459.4 151.7c.3 4.1.3 8.2.3 12.3 0 125.4-95.4 270-269.8 270-53.4 0-103-15.7-145-42.6 7.4.9 14.9 1.3 22.6 1.3 53 0 102-18 141.1-48-49.7-.9-91.4-33.7-105.7-78.6 6.9.9 13.8 1.4 21.2 1.4 10.2 0 20.2-1.4 29.8-4-52-10.4-91-56-91-111.2v-1.4c15.4 8.5 33 13.7 51.6 14.4-30.5-20.4-50.4-55.2-50.4-94.7 0-20.9 5.6-40.4 15.4-57.4 56.3 69.4 140 114.8 234.4 119.7-1.9-8.4-2.9-17-2.9-25.9 0-62.8 50.8-113.6 113.6-113.6 32.7 0 62.4 13.7 83 35.7 25.7-5 50.2-14.5 72.1-27.7-8.4 26.2-26.2 48.4-49.4 62.3 22.7-2.7 44.3-8.8 64-17.8-15 22.2-33.8 41.8-55.4 57.2z" />
                  </svg>
                </button>
                <button aria-label="Log in with GitHub" className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.82-.258.82-.577v-2.17c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.082-.729.082-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.832 2.807 1.303 3.492.996.107-.775.418-1.303.762-1.603-2.665-.303-5.467-1.334-5.467-5.931 0-1.312.468-2.382 1.236-3.222-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.222 0 4.61-2.805 5.624-5.475 5.921.43.371.823 1.103.823 2.222v3.293c0 .319.218.694.824.576C20.565 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </button>
              </div>

              <p className="signup mt-6 text-sm text-center">
                Don't have an account?{" "}
                <button className="text-blue-500" onClick={() => setIsSignup(true)}>Sign up</button>
              </p>
            </div>

            {/* BACK: SIGNUP FORM */}
            <div className="form-container back bg-white/80 backdrop-blur-lg shadow-xl p-8 rounded-md">
              <p className="title text-2xl font-bold mb-4">Create Account</p>
              <form className="form space-y-4">
                <div className="input-group">
                  <label htmlFor="fullName" className="block text-sm font-medium">Full Name</label>
                  <input type="text" name="fullName" id="fullName" className="w-full p-2 border rounded" />
                </div>
                <div className="input-group">
                  <label htmlFor="email" className="block text-sm font-medium">Email</label>
                  <input type="email" name="email" id="email" className="w-full p-2 border rounded" />
                </div>
                <div className="input-group">
                  <label htmlFor="passwordSignup" className="block text-sm font-medium">Password</label>
                  <input type="password" name="passwordSignup" id="passwordSignup" className="w-full p-2 border rounded" />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="isLawyer" className="mr-2" />
                  <label htmlFor="isLawyer" className="text-sm">I am a lawyer</label>
                </div>
<button
  type="button"
  onClick={() => {
  navigate("/dashboard"); // ✅ Redirect to lawyer selection page after signup
}}

  className="sign w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
>
  Sign Up
</button>

              </form>
              <p className="signup mt-6 text-sm text-center">
                Already have an account?{" "}
                <button className="text-blue-500" onClick={() => setIsSignup(false)}>Login</button>
             </p>
            </div>
          </div>
        </div>
        ) : (
          <h1 className="text-white text-3xl">Welcome Back!</h1>
        )
      ):(
      // Show Client Details Form
      <div className="form-container bg-white/80 backdrop-blur-lg shadow-xl p-8 rounded-md border border-white/30 w-[400px] max-w-md mx-auto">
  <p className="title text-2xl font-bold mb-4 text-center">Client Details</p>
  <form className="form space-y-4">
    <div className="input-group">
      <label className="block text-sm font-medium">Full Name</label>
      <input
        type="text"
        className="w-full p-3 border rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your full name"
      />
    </div>
    <div className="input-group">
      <label className="block text-sm font-medium">Email</label>
      <input
        type="email"
        className="w-full p-3 border rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your email"
      />
    </div>
    <div className="input-group">
      <label className="block text-sm font-medium">Contact</label>
      <input
        type="tel"
        className="w-full p-3 border rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your contact number"
      />
    </div>
    <div className="input-group">
      <label className="block text-sm font-medium">Case Category</label>
      <select className="w-full p-3 border rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>Select Category</option>
        <option>Civil</option>
        <option>Criminal</option>
        <option>Corporate</option>
        <option>Family</option>
        <option>Others</option>
      </select>
    </div>
    <button className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition">
      Submit
    </button>
  </form>
</div>


    )}
      </div>

    </AnimatedGradientLogin>
  );
}

export default NLogin;
