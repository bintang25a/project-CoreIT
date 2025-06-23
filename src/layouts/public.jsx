import { Outlet, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDivisions, getDivisionLogo } from "../_services/divisions";
import { getImages, getImageUrl } from "../_services/galleries";
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
   const [images, setImages] = useState([]);
   const [staffs, setStaffs] = useState([]);
   const [news, setNews] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [isClose, setIsClose] = useState(true);

   const fetchData = async () => {
      if (currentPath.startsWith("/staffs")) {
         const [staffsData] = await Promise.all([getStaffs()]);
         setStaffs(staffsData);
      }

      if (currentPath.startsWith("/divisions")) {
         const [divisionsData] = await Promise.all([getDivisions()]);
         setDivisions(divisionsData);
      }

      if (currentPath.startsWith("/news")) {
         const [newsData] = await Promise.all([getNews()]);
         setNews(newsData);
      }

      if (currentPath.startsWith("/galleries")) {
         const [galleriesData] = await Promise.all([getImages()]);
         setImages(galleriesData);
      }

      if (currentPath === "/") {
         const [divisionsData, newsData] = await Promise.all([
            getDivisions(),
            getNews(),
         ]);

         setDivisions(divisionsData);
         setNews(newsData);
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
               staffs,
               divisions,
               divisionsLogo: getDivisionLogo,
               news,
               images,
               imageUrl: getImageUrl,
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
