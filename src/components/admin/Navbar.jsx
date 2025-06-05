import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import photo from "/images/photo/profile.jpg";

export default function Navbar() {
   const [isSticky, setIsSticky] = useState(false);

   useEffect(() => {
      const onScroll = () => {
         setIsSticky(window.scrollY > 0);
      };

      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
   }, []);

   return (
      <nav className={`${isSticky ? "sticky-shadow" : ""}`}>
         <div className="left-section">
            <Link to={"/admin"} state={{ scrollTo: "top" }}>
               <FaHome className="icon-style" />
            </Link>
            <Link to={"/admin/staff/profile/id"}>
               <FaUser className="icon-style" />
            </Link>
         </div>
         <div className="right-section">
            <div className="profile-text">
               <h1>Muhammad Azizsyah Putra</h1>
               <h2>KETUA</h2>
            </div>
            <div className="profile-image">
               <img src={photo} alt="Foto Profil" />
            </div>
         </div>
      </nav>
   );
}
