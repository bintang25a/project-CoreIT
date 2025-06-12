import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { logout } from "../../_services/auth";

export default function Navbar({ imageUrl }) {
   const [isSticky, setIsSticky] = useState(false);
   const [user, setUser] = useState({});
   const [isOpen, setIsOpen] = useState(false);
   const navigate = useNavigate();
   const dropdownRef = useRef(null);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
         ) {
            setIsOpen(false);
         }
      };

      if (isOpen) {
         document.addEventListener("mousedown", handleClickOutside);
      } else {
         document.removeEventListener("mousedown", handleClickOutside);
      }

      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);

      const onScroll = () => {
         setIsSticky(window.scrollY > 0);
      };
      window.addEventListener("scroll", onScroll);

      return () => {
         window.removeEventListener("scroll", onScroll);
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [isOpen]);

   const toggleDropdown = () => {
      setIsOpen(!isOpen);
   };

   const handleLogout = async () => {
      await logout();
      navigate("/login");
   };

   return (
      <nav ref={dropdownRef} className={`${isSticky ? "sticky-shadow" : ""}`}>
         <div className="left-section">
            <Link to={"/admin"} state={{ scrollTo: "top" }}>
               <FaHome className="icon-style" />
            </Link>
            <Link to={"/admin/staff/profile/id"}>
               <FaUser className="icon-style" />
            </Link>
         </div>
         <div className="right-section" onClick={toggleDropdown}>
            {user && (
               <div className="profile-text">
                  <h1>{user.name}</h1>
                  <h2>{user.position}</h2>
               </div>
            )}
            <div className="profile-image">
               <img src={imageUrl + user.image} alt="Foto Profil" />
            </div>
            {isOpen && (
               <div className="dropdown-menu">
                  <Link
                     to={`/admin/staffs/profile/${user.id}`}
                     className="dropdown-item"
                  >
                     Profile
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item">
                     Logout
                  </button>
                  <Link
                     to={"/admin/members/registrants"}
                     className="dropdown-item"
                  >
                     Open Recruitment
                  </Link>
               </div>
            )}
         </div>
      </nav>
   );
}
