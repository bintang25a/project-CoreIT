import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../_services/auth";

const ProtectedRoute = ({ children }) => {
   const [authChecked, setAuthChecked] = useState(false);
   const [isAuth, setIsAuth] = useState(false);

   useEffect(() => {
      const check = isAuthenticated();
      setIsAuth(check);
      setAuthChecked(true);
   }, []);

   if (!authChecked) {
      return null;
   }

   if (!isAuth) {
      return <Navigate to="/login" replace />;
   }

   return children;
};

export default ProtectedRoute;
