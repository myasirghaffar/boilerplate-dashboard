import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowLeft,
  Eye,
  EyeOff,
  Check,
  Globe,
  ChevronDown,
} from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState(["", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle email submission
  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
    }, 1000);
  };

  // Handle code input
  const handleCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...resetCode];
      newCode[index] = value;
      setResetCode(newCode);

      // Auto-focus next input
      if (value && index < 4) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Handle code verification
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const code = resetCode.join("");
    if (code.length !== 5) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(3);
    }, 1000);
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword || newPassword.length < 6) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // Redirect to login after successful password reset
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }, 1000);
  };

  // Handle resend code
  const handleResendCode = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
      console.log("Code resent successfully");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1429] via-[#1A1F3A] to-[#0F1429] flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center pt-8 pb-4">
        {/* Logo */}
        <div className="w-12 h-12 bg-gradient-to-br from-[#14F195] to-[#9945FF] rounded-xl flex items-center justify-center mb-4">
          <div className="w-6 h-6 bg-white rounded-md"></div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-2">Forget Password</h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Step 1: Email Input */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Reset Password
              </h2>
              <p className="text-gray-600 mb-6">
                Enter your email address, and we'll send you detailed
                instructions on how to reset your password.
              </p>

              <form onSubmit={handleSendCode} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Enter Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Code"}
                </button>

                <Link
                  to="/login"
                  className="w-full border border-purple-300 text-white py-3 rounded-lg font-medium hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </Link>
              </form>

              <div className="text-center mt-6">
                <span className="text-gray-600">Don't have an account? </span>
                <Link
                  to="/signup"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}

          {/* Step 2: Code Verification */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Reset Password
              </h2>

              {/* Success Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <p className="text-gray-600 mb-6 text-center">
                Check your Inbox—we've sent you a reset code. Please enter the
                code below to continue.
              </p>

              <form onSubmit={handleVerifyCode} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Enter Reset Code
                  </label>
                  <div className="flex justify-center gap-3">
                    {resetCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) =>
                          handleCodeChange(index, e.target.value)
                        }
                        className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder=""
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || resetCode.join("").length !== 5}
                  className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Verifying..." : "Continue"}
                </button>

                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isLoading}
                  className="w-full border border-green-500 text-green-600 py-3 rounded-lg font-medium hover:bg-green-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Resend Code"}
                </button>
              </form>

              <div className="text-center mt-6">
                <span className="text-gray-600">Don't have an account? </span>
                <Link
                  to="/signup"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}

          {/* Step 3: Password Reset */}
          {currentStep === 3 && (
            <div className="bg-[#1A1F3A] rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">
                Reset Password
              </h2>
              <p className="text-gray-300 mb-6">
                Enter and confirm your new password to secure your account.
              </p>

              {isSuccess ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-400">
                    Password Reset Successful!
                  </h3>
                  <p className="text-gray-300">Redirecting to login page...</p>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 bg-[#171D41] border border-[#3A3A4E] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 bg-[#171D41] border border-[#3A3A4E] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Confirm Password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={
                      isLoading ||
                      newPassword !== confirmPassword ||
                      newPassword.length < 6
                    }
                    className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              )}

              <div className="text-center mt-6">
                <span className="text-gray-400">Don't have an account? </span>
                <Link
                  to="/signup"
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex justify-between items-center px-6 py-4 text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <Link to="/terms" className="hover:text-white transition-colors">
            Terms
          </Link>
          <span>•</span>
          <Link to="/privacy" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <span>•</span>
          <Link to="/docs" className="hover:text-white transition-colors">
            Docs
          </Link>
          <span>•</span>
          <Link to="/help" className="hover:text-white transition-colors">
            Help
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4" />
          <span>English</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
