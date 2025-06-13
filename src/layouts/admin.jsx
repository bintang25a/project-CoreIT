import Sidebar from "../components/admin/Sidebar";
import Navbar from "..//components/admin/Navbar";
import Footer from "../components/admin/Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../_services/auth";
import { getDivisions, getDivisionLogo } from "../_services/divisions";
import { getImages, getImageUrl } from "../_services/galleries";
import { getMembers } from "../_services/members";
import { getStaffs } from "../_services/staffs";
import { getNews } from "../_services/news";
import "./admin.css";

export default function AdminLayout() {
   const navigate = useNavigate();
   const location = useLocation();
   const currentPath = location.pathname;
   const [divisions, setDivisions] = useState([]);
   const [divisionsLogo, setDivisionsLogo] = useState("");
   const [images, setImages] = useState([]);
   const [imageUrl, setImageUrl] = useState("");
   const [members, setMembers] = useState([]);
   const [staffs, setStaffs] = useState([]);
   const [news, setNews] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

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
            currentPath === "/admin/staffs/register-account" ||
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

   useEffect(() => {
      const checkAuth = async () => {
         const valid = await isAuthenticated();
         if (!valid) {
            navigate("/login");
         }
      };

      checkAuth();
   }, [navigate]);

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <>
         <div className="mobile">
            <h1>BUKA DI PC KOCAK</h1>
         </div>
         <Sidebar />
         <div className="right-content" id="top">
            <Navbar imageUrl={imageUrl} isLoading={isLoading} />
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
      </>
   );
}
