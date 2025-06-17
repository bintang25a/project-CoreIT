import { Link } from "react-router-dom";
import {
   FaHome,
   FaBars,
   FaProjectDiagram,
   FaTasks,
   FaUsers,
   FaNewspaper,
   FaImages,
} from "react-icons/fa";

export default function Navbar({
   isScrolled,
   logo,
   currentPath,
   isClose,
   setIsClose,
}) {
   const handleClick = () => {
      window.scrollTo(0, 0);
      setIsClose(true);
   };

   const handleClickMenu = () => {
      setIsClose(!isClose);
   };

   return (
      <nav
         className={
            isScrolled
               ? "scrolled nav"
               : currentPath.startsWith("/divisions/")
               ? "nav div"
               : "nav"
         }
      >
         <div className="logo">
            <img src={logo} alt="Logo Core it" />
         </div>
         <div className={isClose ? "nav-list close" : "nav-list"}>
            <Link onClick={handleClick} to={"/"}>
               <FaHome className="icon" /> Home
            </Link>
            <Link onClick={handleClick} to={"/divisions"}>
               <FaProjectDiagram className="icon" /> Division
            </Link>
            <Link onClick={handleClick} to={"/program"}>
               <FaTasks className="icon" /> Program
            </Link>
            <Link onClick={handleClick} to={"/staffs"}>
               <FaUsers className="icon" /> Our Staff
            </Link>
            <Link onClick={handleClick} to={"/news"}>
               <FaNewspaper className="icon" /> News
            </Link>
            <Link onClick={handleClick} to={"/galleries"}>
               <FaImages className="icon" /> Gallery
            </Link>
         </div>
         <div className="button">
            <button type="button" onClick={handleClickMenu}>
               <FaBars className="hamburger-menu" />
            </button>
            <a className="btn" href="/register" target="_blank">
               Join?
            </a>
         </div>
      </nav>
   );
}
