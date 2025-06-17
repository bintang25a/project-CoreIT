import { Outlet, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDivisions, getDivisionLogo } from "../_services/divisions";
import { getImages, getImageUrl } from "../_services/galleries";
import { getMembers } from "../_services/members";
import { getStaffs } from "../_services/staffs";
import { getNews } from "../_services/news";
import logo from "/images/logo/Logo CORE IT transparan.png";
import "./public.css";

import Navbar from "../components/public/Navbar";
import Footer from "../components/public/Footer";

export default function PublicLayout() {
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
   const [isClose, setIsClose] = useState(true);

   const fetchData = async () => {
      if (currentPath.startsWith("/members")) {
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

      if (currentPath.startsWith("/staffs")) {
         const [staffsData, imageUrlData] = await Promise.all([
            getStaffs(),
            getImageUrl(),
         ]);
         setStaffs(staffsData);
         setImageUrl(imageUrlData);
      }

      if (currentPath.startsWith("/divisions")) {
         const [divisionsData, divisionsLogoData] = await Promise.all([
            getDivisions(),
            getDivisionLogo(),
         ]);
         setDivisions(divisionsData);
         setDivisionsLogo(divisionsLogoData);

         if (currentPath.startsWith("/divisions/")) {
            const [membersData] = await Promise.all([getMembers()]);

            setMembers(membersData);
         }
      }

      if (currentPath.startsWith("/news")) {
         const [newsData, newsImageData] = await Promise.all([
            getNews(),
            getImageUrl(),
         ]);
         setNews(newsData);
         setImageUrl(newsImageData);
      }

      if (currentPath.startsWith("/galleries")) {
         const [galleriesData, newsImageData] = await Promise.all([
            getImages(),
            getImageUrl(),
         ]);
         setImages(galleriesData);
         setImageUrl(newsImageData);
      }

      if (currentPath === "/") {
         const [divisionsData, logoUrlData, newsData, imageUrlData] =
            await Promise.all([
               getDivisions(),
               getDivisionLogo(),
               getNews(),
               getImageUrl(),
            ]);

         setDivisions(divisionsData);
         setDivisionsLogo(logoUrlData);
         setNews(newsData);
         setImageUrl(imageUrlData);
      }

      if (currentPath.startsWith("/admin")) {
         const [imageUrlData] = await Promise.all([getImageUrl()]);

         setImageUrl(imageUrlData);
         setIsLoading(false);
      }
   };

   const [isScrolled, setIsScrolled] = useState(false);
   useEffect(() => {
      const onScroll = () => {
         setIsScrolled(window.scrollY > 0);
      };

      window.addEventListener("scroll", onScroll);

      return () => window.removeEventListener("scroll", onScroll);
   }, []);

   return (
      <div className="public-layout">
         <Navbar
            logo={logo}
            isScrolled={isScrolled}
            currentPath={currentPath}
            isClose={isClose}
            setIsClose={setIsClose}
         />
         <Outlet
            context={{
               members,
               staffs,
               divisions,
               divisionsLogo,
               news,
               images,
               imageUrl,
               fetchData,
               isLoading,
               setIsLoading,
               setIsClose,
            }}
         />
         <Footer />
      </div>
   );
}
