import "react-loading-skeleton/dist/skeleton.css";
import { useLocation, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import MemberData from "../../components/admin/Dashboard-MemberData";
import DivisionData from "../../components/admin/Dashboard-DivisionData";
import NewsInformation from "../../components/admin/Dashboard-NewsInformation";
import StaffOnline from "../../components/admin/Dashboard-StaffOnline";
import "./index.css";
import "./content.css";

export default function Dashboard() {
   const {
      members,
      staffs,
      divisions,
      logoUrl,
      informations,
      fetchData,
      imageUrl,
   } = useOutletContext();

   const location = useLocation();
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      if (isLoading) {
         setIsLoading(true);
      }

      const loadingTimeout = setTimeout(() => {
         if (
            (members.length > 0) &
            (staffs.length > 0) &
            (divisions.length > 0) &
            (informations.length > 0)
         ) {
            setIsLoading(false);
         } else {
            setTimeout(() => {
               setIsLoading(false);
            }, 2000);
         }
      }, 250);

      return () => clearTimeout(loadingTimeout);
   }, [members, staffs, divisions, informations, isLoading]);

   useEffect(() => {
      const fetchTimeout = setTimeout(() => {
         if (
            isLoading &&
            (members.length < 1 ||
               staffs.length < 1 ||
               divisions.length < 1 ||
               informations.length < 1)
         ) {
            fetchData();
         }
      }, 500);

      return () => clearTimeout(fetchTimeout);
   }, [
      fetchData,
      isLoading,
      members.length,
      staffs.length,
      divisions.length,
      informations.length,
   ]);

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
         <StaffOnline
            staffs={staffs}
            isLoading={isLoading}
            imageUrl={imageUrl}
         />
      </main>
   );
}
