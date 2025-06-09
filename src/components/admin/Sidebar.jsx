import { Link } from "react-router-dom";
import { FaHome, FaLayerGroup, FaLock } from "react-icons/fa";
import coreit from "/images/logo/Logo CORE IT whitetext.png";
import { useEffect, useState } from "react";

export default function Sidebar() {
   const [id, setId] = useState(null);

   useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("user"));
      setId(userData.id);
   }, []);

   return (
      <aside>
         <div className="logo">
            <img src={coreit} draggable="false" alt="Logo CORE IT" />
         </div>
         <div className="menu-container">
            <div className="title">
               <FaHome className="icon-style" />
               <h1>Dashboard</h1>
            </div>
            <div className="menu">
               <ul>
                  <li>
                     <Link to={"/admin"} state={{ scrollTo: "top" }}>
                        Member data
                     </Link>
                  </li>
                  <li>
                     <Link to={"/admin"} state={{ scrollTo: "division" }}>
                        Division data
                     </Link>
                  </li>
                  <li>
                     <Link to={"/admin"} state={{ scrollTo: "news" }}>
                        News information
                     </Link>
                  </li>
                  <li>
                     <Link to={"/admin"} state={{ scrollTo: "staff" }}>
                        Staff online
                     </Link>
                  </li>
               </ul>
            </div>
         </div>
         <div className="menu-container">
            <div className="title">
               <FaLayerGroup className="icon-style" />
               <h1>Pages</h1>
            </div>
            <div className="menu">
               <ul>
                  <li>
                     <Link to={"/admin/members"}>Member</Link>
                  </li>
                  <li>
                     <Link to={"/admin/staffs"}>Staff</Link>
                  </li>
                  <li>
                     <Link to={"/admin/divisions"}>Division</Link>
                  </li>
                  <li>
                     <Link to={"/admin/news"}>News</Link>
                  </li>
                  <li>
                     <Link to={"/admin/galleries"}>Gallery</Link>
                  </li>
               </ul>
            </div>
         </div>
         <div className="menu-container">
            <div className="title">
               <FaLock className="icon-style" />
               <h1>Authentication</h1>
            </div>
            <div className="menu">
               <ul>
                  <li>
                     <Link to={"/admin/members/registrants"}>Registrant</Link>
                  </li>
                  <li>
                     <Link to={`/admin/staffs/profile/${id}`}>Profile</Link>
                  </li>
                  <li>
                     <Link to={"/admin/staffs/register-account"}>
                        Staff update
                     </Link>
                  </li>
               </ul>
            </div>
         </div>
      </aside>
   );
}
