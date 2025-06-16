import { Link } from "react-router-dom";

export default function Navbar({ isScrolled, logo, currentPath }) {
   const handleClick = () => {
      window.scrollTo(0, 0);
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
         <div className="nav-list">
            <Link onClick={handleClick} to={"/"}>
               Home
            </Link>
            <Link onClick={handleClick} to={"/divisions"}>
               Division
            </Link>
            <Link onClick={handleClick} to={"/"}>
               Program
            </Link>
            <Link onClick={handleClick} to={"/staffs"}>
               Our Staff
            </Link>
            <Link onClick={handleClick} to={"/news"}>
               News
            </Link>
            <Link onClick={handleClick} to={"/galleries"}>
               Gallery
            </Link>
         </div>
         <div className="button">
            <a className="btn" href="/register" target="_blank">
               Join?
            </a>
         </div>
      </nav>
   );
}
