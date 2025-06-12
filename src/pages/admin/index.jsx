import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useLocation, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import MemberData from "../../components/admin/MemberData";
import DivisionData from "../../components/admin/DivisionData";
import NewsInformation from "../../components/admin/NewsInformation";
import StaffOnline from "../../components/admin/StaffOnline";

export default function Dashboard() {
   const { members, staffs, divisions, logoUrl, informations, fetchData } =
      useOutletContext();

   const location = useLocation();
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      if (isLoading) {
         setIsLoading(true);
      }

      const loadingTimeout = setTimeout(() => {
         if (members.length > 0) {
            setIsLoading(false);
         }
      }, 250);

      return () => clearTimeout(loadingTimeout);
   }, [members, isLoading]);

   useEffect(() => {
      const fetchTimeout = setTimeout(() => {
         if (isLoading) {
            fetchData();
         }
      }, 1500);

      if (members.length > 0) {
         clearTimeout(fetchTimeout);
      }
   }, [members, fetchData, isLoading]);

   useEffect(() => {
      if (location.state?.scrollTo) {
         const vwToPx = (vw) => (window.innerWidth * vw) / 100;

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
   }, [location.state?.scrollTo]);

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
