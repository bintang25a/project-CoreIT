import Sidebar from "../components/admin/Sidebar";
import Navbar from "..//components/admin/Navbar";
import Footer from "../components/admin/Footer";
import { Outlet } from "react-router-dom";
import "./admin.css";

export default function AdminLayout() {
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
