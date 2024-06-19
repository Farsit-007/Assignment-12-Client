import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";
const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    if (loading) {
        return <>
            <div className="flex justify-center min-h-screen items-center">
                <LoadingSpinner></LoadingSpinner>
            </div>
        </>
    }
    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default PrivateRoute;