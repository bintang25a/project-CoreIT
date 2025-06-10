import Sidebar from "../components/admin/Sidebar";
import Navbar from "..//components/admin/Navbar";
import Footer from "../components/admin/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuthenticated } from "../_services/auth";
import "./admin.css";

export default function AdminLayout() {
   const navigate = useNavigate();

   useEffect(() => {
      const checkAuth = async () => {
         const valid = await isAuthenticated();
         if (!valid) {
            navigate("/login");
         }
      };

      checkAuth();
   }, [navigate]);

   return (
      <>
         <div className="mobile">
            <h1>BUKA DI PC KOCAK</h1>
         </div>
         <Sidebar />
         <div className="right-content" id="top">
            <Navbar />
            <Outlet />
            <Footer />
         </div>
      </>
   );
}
