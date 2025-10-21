import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonBack from "@components/buttons/ButtonBack";
import ButtonLogin from "@components/buttons/ButtonLogin";
import ButtonRegular from "@components/buttons/ButtonRegular";
import { AuthAPI } from "@utils/AuthAPI";

import CoverLogin from '@public/images/CoverLogin.jpg'
import { Eye, EyeOff } from 'lucide-react';

export default function MainLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeForm, setActiveForm] = useState<"login" | "signup">("login");
  
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await AuthAPI.login(formData.username, formData.password);
      if (result.success && result.access_token) {
        // Store token and user data
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/user/discover");
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const result = await AuthAPI.signUp(
        formData.username,
        formData.email,
        formData.password,
        formData.password_confirmation
      );
      
      if (result.success && result.access_token) {
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/user/discover");
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonLoginClick = () => {
    setActiveForm("login");
    setError("");
  };

  const handleButtonSignUpClick = () => {
    setActiveForm("signup");
    setError("");
  };

  return (
    <div className="min-h-screen relative bg-neutral-900 overflow-hidden">
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${CoverLogin})` }}
      />
      
      {/* Content Container */}
      <div className="relative p-8 md:p-12 h-screen flex items-center">
        
        {/* Back Button */}
        <div className="absolute top-10 left-10">
          <NavLink to="/">
            <ButtonBack nama="Go back" />
          </NavLink>
        </div>

        <div className="grid grid-cols-12 gap-8 w-full items-center">
          {/* Left Side - Brand Section */}
          <div className="col-span-6">
            <div className="bg-gradient-to-r from-red-400/10 to-red-600/10 rounded-3xl p-12 border border-red-400/20 backdrop-blur-sm">
              <div className="text-center">
                <h1 className="block text-4xl md:text-6xl lg:text-[100px] font-extrabold bg-gradient-to-r from-[#B43739] to-[#FFAFAF] text-transparent bg-clip-text">
                  MasakYo
                </h1>
                <p className="text-xl text-red-200 my-8">
                  Temukan kuliner dunia dalam genggaman Anda
                </p>


                {/* Social Login */}
                <div className="flex justify-center gap-4">
                  <ButtonLogin 
                    onLoginClick={handleButtonLoginClick}
                    onSignUpClick={handleButtonSignUpClick}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="col-span-6">
            <div className="bg-gradient-to-br from-red-400/10 to-red-600/10 rounded-3xl p-12 border border-red-400/20 backdrop-blur-sm">
              <div className="max-w-md mx-auto">
                
                {/* Form Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {activeForm === "login" ? "Login" : "Sign Up"}
                  </h2>
                  <p className="text-red-200">
                    {activeForm === "login" 
                      ? "Masuk untuk menjelajahi dunia kuliner" 
                      : "Bergabung dengan komunitas MasakYo"
                    }
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl text-red-200 text-center">
                    {error}
                  </div>
                )}

                {/* Login/Signup Form */}
                <form onSubmit={activeForm === "login" ? handleLogin : handleSignUp}>
                  <div className="space-y-6">

                    {/* Username Field */}
                    <div>
                      <label className="block text-red-300 font-semibold mb-3 text-sm uppercase tracking-wide">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-neutral-800/50 border border-red-400/30 rounded-2xl text-white placeholder-red-300/50 focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-red-400/50 transition-all"
                        placeholder="Enter your username"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    {/* Email Field (Sign Up only) */}
                    {activeForm === "signup" && (
                      <div>
                        <label className="block text-red-300 font-semibold mb-3 text-sm uppercase tracking-wide">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-neutral-800/50 border border-red-400/30 rounded-2xl text-white placeholder-red-300/50 focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-red-400/50 transition-all"
                          placeholder="Enter your email"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    )}

                    {/* Password Field */}
                    <div className="relative">
                      <label className="block text-red-300 font-semibold mb-3 text-sm uppercase tracking-wide">
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-neutral-800/50 border border-red-400/30 rounded-2xl text-white placeholder-red-300/50 focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-red-400/50 transition-all pr-12"
                        placeholder="Enter your password"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-12 text-red-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-red-400/20"
                        disabled={isLoading}
                      >
                         {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>

                    {/* Confirm Password Field (Sign Up only) */}
                    {activeForm === "signup" && (
                      <div>
                        <label className="block text-red-300 font-semibold mb-3 text-sm uppercase tracking-wide">
                          Confirm Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password_confirmation"
                          value={formData.password_confirmation}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-neutral-800/50 border border-red-400/30 rounded-2xl text-white placeholder-red-300/50 focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-red-400/50 transition-all"
                          placeholder="Confirm your password"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-4">
                      <ButtonRegular 
                        nama={isLoading ? "Loading..." : (activeForm === "login" ? "Login!" : "Sign Up!")}
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-4 text-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl transition-all transform hover:scale-105 ${
                          isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      />
                    </div>
                  </div>
                </form>

                {/* Additional Info */}
                <div className="mt-8 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-red-300">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span>Bergabung dengan 10.000+ food enthusiast</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-red-300 mt-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>1000+ resep terkurasi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}