import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDivisions, getDivisionLogo } from "../../_services/divisions";
import { getMembers } from "../../_services/members";
import { getStaffs } from "../../_services/staffs.js";
import { getNews } from "../../_services/news.js";
import MemberData from "../../components/admin/MemberData";
import DivisionData from "../../components/admin/DivisionData";
import NewsInformation from "../../components/admin/NewsInformation";
import StaffOnline from "../../components/admin/StaffOnline";

export default function Dashboard() {
   const [members, setMembers] = useState([]);
   const [staffs, setStaffs] = useState([]);
   const [divisions, setDivisions] = useState([]);
   const [logoUrl, setLogoUrl] = useState(null);
   const [informations, setInformations] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const location = useLocation();

   useEffect(() => {
      const fetchData = async () => {
         const [divisionsData, membersData, logoUrlData, newsData, staffsData] =
            await Promise.all([
               getDivisions(),
               getMembers(),
               getDivisionLogo(),
               getNews(),
               getStaffs(),
            ]);

         setDivisions(divisionsData);
         setMembers(membersData);
         setLogoUrl(logoUrlData);
         setInformations(newsData);
         setStaffs(staffsData);
         setIsLoading(false);
      };

      const interval = setInterval(() => {
         fetchData();
      }, 5000);

      const vwToPx = (vw) => (window.innerWidth * vw) / 100;

      if (location.state?.scrollTo) {
         const element = document.getElementById(location.state.scrollTo);
         if (element) {
            const yOffset = -vwToPx(5);
            const y =
               element.getBoundingClientRect().top +
               window.pageYOffset +
               yOffset;

            window.scrollTo({ top: y, behavior: "smooth" });
         }
      }

      return () => clearInterval(interval);
   }, [location]);

   return (
      <main>
         <MemberData members={members} staffs={staffs} isLoading={isLoading} />
         <DivisionData
            members={members}
            divisions={divisions}
            logoUrl={logoUrl}
            isLoading={isLoading}
         />
         <NewsInformation isLoading={isLoading} news={informations} />
         <StaffOnline staffs={staffs} isLoading={isLoading} />
      </main>
   );
}
