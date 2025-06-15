import { Link } from "react-router-dom";

export default function Navbar({ isScrolled, logo }) {
   return (
      <nav className={isScrolled ? "scrolled nav" : "nav"}>
         <div className="logo">
            <img src={logo} alt="Logo Core it" />
         </div>
         <div className="nav-list">
            <Link to={"/"}>Home</Link>
            <Link to={"/divisions"}>Division</Link>
            <Link to={"/"}>Program</Link>
            <Link to={"/staffs"}>Our Staff</Link>
            <Link to={"/news"}>News</Link>
            <Link to={"/galleries"}>Gallery</Link>
         </div>
         <div className="button">
            <a className="btn" href="/register" target="_blank">
               Join?
            </a>
         </div>
      </nav>
   );
}
