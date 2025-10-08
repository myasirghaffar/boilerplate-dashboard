import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth?.isAuthenticated);
  const currentRole = useSelector((state) => state.auth.user?.role);

  // Map roles to their correct route prefixes
  const roleName =
    currentRole === "CTS Admin"
      ? "admin"
      : currentRole === "Company Owner"
      ? "user"
      : currentRole === "Driver"
      ? "contractor"
      : null;

  useEffect(() => {
    if (isLoggedIn && roleName) {
      navigate(`/${roleName}/dashboard`, { replace: true });
    } else if (isLoggedIn && !roleName) {
      // If user is logged in but has an unrecognized role, redirect to login
      navigate("/login", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, roleName, navigate]);

  return null;
};

export default AuthRedirect;
