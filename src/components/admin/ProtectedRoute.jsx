import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../_services/auth";

const ProtectedRoute = ({ children }) => {
   if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
   }
   return children;
};

export default ProtectedRoute;
