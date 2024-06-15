import { Navigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";
import useRole from "../Hooks/useRole";

const VolanteerRoute = ({children}) => {
    const[role,isLoading]= useRole()
   if(isLoading) return <LoadingSpinner></LoadingSpinner>
   if(role === 'volunteer') return children
   return <Navigate to='/dashboard'></Navigate>
};

export default VolanteerRoute;