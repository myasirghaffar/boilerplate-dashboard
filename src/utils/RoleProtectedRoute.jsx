// components/RoleProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RoleProtectedRoute = ({ allowedRoles, children }) => {
    const user = useSelector((state) => state.auth.user?.role);
    // const user = true;
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // const isAuthenticated = true;

    const location = useLocation();
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(user)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default RoleProtectedRoute;
