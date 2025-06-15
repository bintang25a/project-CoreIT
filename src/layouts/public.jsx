import { Outlet, useLocation, Link } from "react-router-dom";
import { FaInstagram, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getDivisions, getDivisionLogo } from "../_services/divisions";
import { getImages, getImageUrl } from "../_services/galleries";
import { getMembers } from "../_services/members";
import { getStaffs } from "../_services/staffs";
import { getNews } from "../_services/news";
import logo from "/images/logo/Logo CORE IT whitetext.png";
import "./public.css";

import Navbar from "../components/public/Navbar";

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
         const [staffsData] = await Promise.all([getStaffs()]);
         setStaffs(staffsData);
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

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className="public-layout">
         <Navbar logo={logo} isScrolled={isScrolled} />
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
            }}
         />
         <footer>
            <div className="header">
               <h1>Community of Research and Innovation Technology</h1>
            </div>
            <div className="content">
               <div className="content">
                  <a target="_blank" href={"core.it@ftumj.ac.id"}>
                     <FaEnvelope className="icon-style" />
                  </a>
                  <a
                     target="_blank"
                     href={
                        "https://www.linkedin.com/company/forum-riset-teknologi-informasi-universitas-muhammadiyah-jakarta/posts/?feedView=all"
                     }
                  >
                     <FaLinkedin className="icon-style" />
                  </a>
                  <a
                     target="_blank"
                     href={
                        "https://www.instagram.com/core.it_umj?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                     }
                  >
                     <FaInstagram className="icon-style" />
                  </a>
               </div>
            </div>
            <div className="footer">
               <h1>
                  &#169; Copyright 2025 - Community of Research and Innovation
                  Technology, Bintang Al Fizar
               </h1>
            </div>
         </footer>
      </div>
   );
}
