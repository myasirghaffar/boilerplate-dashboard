import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginForm from "../assets/images/login-form.png";
import { main_logo, google } from "../assets/logos";
import { authenticateUser } from "../data/dummyUsers";

const Login = () => {
  const [error, setError] = useState(null);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      const userRole = auth.user.role;
      const roleRouteMap = {
        admin: "admin",
        user: "user",
        contractor: "contractor"
      };
      
      const rolePath = roleRouteMap[userRole] || "admin";
      navigate(`/${rolePath}/dashboard`, { replace: true });
    }
  }, [auth.isAuthenticated, auth.user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setError(null);
    const { email, password } = data;

    try {
      // Authenticate user with dummy data
      const authenticatedUser = authenticateUser(email, password);

      if (authenticatedUser) {
        // Set user data in Redux store
        dispatch(
          setUser({
            role: authenticatedUser.role,
            email: authenticatedUser.email,
            name: authenticatedUser.name,
          })
        );

        // Show success toast
        toast.success(`Bem-vindo, ${authenticatedUser.name}!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Navigate to the appropriate dashboard
        navigate(`/${authenticatedUser.route}/dashboard`);
      } else {
        // Show error toast for invalid credentials
        toast.error("Email ou senha incorretos. Tente novamente.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      // Show error toast for any unexpected errors
      toast.error("Ocorreu um erro durante o login. Tente novamente.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="h-screen bg-primary flex items-center justify-center p-0">
      {/* Main Container with Grid Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-0 bg-white shadow-2xl overflow-hidden min-h-fit">
        {/* Left Section - Image (60% width on large screens) */}
        <div className="lg:col-span-3 bg-white flex items-center justify-center p-0">
          <img
            src={loginForm}
            alt="Login illustration"
            className="md:w-[100%] md:h-[100vh] sm:h-auto sm:max-w-[100%] sm:w-auto sm:object-contain md:object-cover"
          />
        </div>

        {/* Right Section - Login Form (40% width on large screens) */}
        <div className="lg:col-span-2 bg-primary p-12 flex flex-col justify-center">
          {/* ITEC Logo */}
          <div className="flex flex-col items-center mb-4">
            <img 
              src={main_logo} 
              alt="ITEC Logo" 
              className="w-32 h-32 animated-logo" 
            />
          </div>

          {/* Welcome Message */}
          <h2 className="text-white text-center text-2xl font-poppins mb-6">
            Welcome to our platform!
          </h2>
          
          {/* Test Accounts Info */}
          <div className="mb-6 p-4 bg-white/10 rounded-lg border border-white/20">
            <h3 className="text-white text-sm font-semibold mb-2">Test Accounts:</h3>
            <div className="text-white/80 text-xs space-y-1">
              <p>• admin@example.com / admin123</p>
              <p>• user@example.com / user123</p>
              <p>• contractor@example.com / contractor123</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Email Field */}
            <div className="mb-6">
              <input
                type="email"
                placeholder="E-mail do usuário"
                className="w-full bg-transparent text-white py-3 px-3 placeholder-white/50 login-input-bottom-border"
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Endereço de email inválido",
                  },
                })}
              />
              {errors.email && (
                <span className="text-xs text-red-300 mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-8">
              <input
                type="password"
                placeholder="Senha"
                className="w-full bg-transparent text-white py-3 px-3 placeholder-white/50 login-input-bottom-border"
                {...register("password", {
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres",
                  },
                })}
              />
              {errors.password && (
                <span className="text-xs text-red-300 mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-sm text-red-300 bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              disabled={auth.loading}
              type="submit"
              className="w-full bg-secondary text-white py-3 font-medium rounded-md text-lg hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {auth.loading ? "Entrando..." : "Entrar"}
            </button>

            {/* Separator */}
            <div className="text-center mb-2">
              <span className="text-white/80 text-sm font-poppins">or</span>
            </div>

            {/* Google Login Button */}
            <div className="flex items-center justify-center">
              <img src={google} alt="Google" className="w-20 h-20" />
            </div>
          </form>
        </div>
      </div>
      
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
