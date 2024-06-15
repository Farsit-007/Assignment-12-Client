import { Navigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";
import useRole from "../Hooks/useRole";

const AdminRoute = ({children}) => {
    const[role,isLoading]= useRole()
   if(isLoading) return <LoadingSpinner></LoadingSpinner>
   if(role === 'admin') return children
   return <Navigate to='/dashboard'></Navigate>
};

export default AdminRoute;