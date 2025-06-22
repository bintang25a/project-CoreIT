import Sidebar from "../components/admin/Sidebar";
import Navbar from "..//components/admin/Navbar";
import Footer from "../components/admin/Footer";
import MobileProtected from "../components/admin/MobileProtected";
import useLoadingSpinner from "../components/elements/LoadingModal.jsx";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { isAuthenticated, logout } from "../_services/auth";
import { getDivisions, getDivisionLogo } from "../_services/divisions";
import { getImages, getImageUrl } from "../_services/galleries";
import { getMembers } from "../_services/members";
import { getStaffs } from "../_services/staffs";
import { getNews } from "../_services/news";
import "./admin.css";

export default function AdminLayout() {
   const navigate = useNavigate();
   const location = useLocation();
   const timeoutRef = useRef();
   const currentPath = location.pathname;
   const [divisions, setDivisions] = useState([]);
   const [divisionsLogo, setDivisionsLogo] = useState("");
   const [images, setImages] = useState([]);
   const [imageUrl, setImageUrl] = useState("");
   const [members, setMembers] = useState([]);
   const [staffs, setStaffs] = useState([]);
   const [news, setNews] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [id, setId] = useState(null);

   const { loading, LoadingSpinner } = useLoadingSpinner();

   //Mengambil data
   const fetchData = async () => {
      if (currentPath.startsWith("/admin/members")) {
         const [membersData, divisionsData, divisionsLogoData] =
            await Promise.all([
               getMembers(),
               getDivisions(),
               getDivisionLogo(),
            ]);
         setMembers(membersData);
         setDivisions(divisionsData);
         setDivisionsLogo(divisionsLogoData);
      }

      if (currentPath.startsWith("/admin/staffs")) {
         const [staffsData] = await Promise.all([getStaffs()]);
         setStaffs(staffsData);

         if (
            currentPath === "/admin/staffs/create" ||
            currentPath === "/admin/staffs"
         ) {
            const [membersData] = await Promise.all([getMembers()]);
            setMembers(membersData);
         }
      }

      if (currentPath.startsWith("/admin/divisions")) {
         const [divisionsData, divisionsLogoData] = await Promise.all([
            getDivisions(),
            getDivisionLogo(),
         ]);
         setDivisions(divisionsData);
         setDivisionsLogo(divisionsLogoData);
      }

      if (currentPath.startsWith("/admin/news")) {
         const [newsData, newsImageData] = await Promise.all([
            getNews(),
            getImageUrl(),
         ]);
         setNews(newsData);
         setImageUrl(newsImageData);
      }

      if (currentPath.startsWith("/admin/galleries")) {
         const [galleriesData, newsImageData] = await Promise.all([
            getImages(),
            getImageUrl(),
         ]);
         setImages(galleriesData);
         setImageUrl(newsImageData);
      }

      if (currentPath === "/admin") {
         const [membersData, staffsData, divisionsData, logoUrlData, newsData] =
            await Promise.all([
               getMembers(),
               getStaffs(),
               getDivisions(),
               getDivisionLogo(),
               getNews(),
            ]);

         setMembers(membersData);
         setStaffs(staffsData);
         setDivisions(divisionsData);
         setDivisionsLogo(logoUrlData);
         setNews(newsData);
      }

      if (currentPath.startsWith("/admin")) {
         const [imageUrlData] = await Promise.all([getImageUrl()]);

         setImageUrl(imageUrlData);
         setIsLoading(false);
      }
   };

   // Cek validasi token
   useEffect(() => {
      const checkAuth = async () => {
         const valid = await isAuthenticated();
         if (!valid) {
            navigate("/login", { replace: true });
         } else {
            fetchData();
            const userData = JSON.parse(localStorage.getItem("user"));
            setId(userData.id);
         }
      };
      checkAuth();
   }, [navigate]);

   // Auto logout setelah 10 menit
   const resetTimer = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
         logout();
         navigate("/login", { replace: true });
      }, 5 * 60 * 1000);
   };
   useEffect(() => {
      const events = ["mousemove", "keydown", "click", "scroll"];
      events.forEach((event) => window.addEventListener(event, resetTimer));

      resetTimer();

      return () => {
         events.forEach((event) =>
            window.removeEventListener(event, resetTimer)
         );
         clearTimeout(timeoutRef.current);
      };
   }, []);

   return (
      <>
         <div className="mobile">
            <MobileProtected />
         </div>
         <Sidebar id={id} />
         <div className="right-content" id="top">
            <Navbar
               imageUrl={imageUrl}
               isLoading={isLoading}
               fetchData={fetchData}
               loading={loading}
            />
            <Outlet
               context={{
                  members,
                  staffs,
                  divisions,
                  logoUrl: divisionsLogo,
                  informations: news,
                  images,
                  imageUrl,
                  fetchData,
               }}
            />
            <Footer />
         </div>
         <LoadingSpinner />
      </>
   );
}
