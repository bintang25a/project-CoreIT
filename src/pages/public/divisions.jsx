import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

function LoadingCard() {
   return Array(4)
      .fill(0)
      .map((_, i) => (
         <div className="card" key={i}>
            <Skeleton circle height={100} width={100} />
            <h1>
               <Skeleton height={20} width={"15vw"} />
            </h1>
            <h2>
               <Skeleton count={6} height={10} width={"15vw"} />
            </h2>
         </div>
      ));
}

export default function Divisions() {
   const { divisions, divisionsLogo, fetchData } = useOutletContext();

   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      if (isLoading) {
         setIsLoading(true);
      }

      const loadingTimeout = setTimeout(() => {
         if (divisions.length > 0) {
            setIsLoading(false);
         }
      }, 250);

      return () => clearTimeout(loadingTimeout);
   }, [isLoading, divisions]);

   useEffect(() => {
      const fetchTimeout = setTimeout(() => {
         if (isLoading) {
            fetchData();
         }
      }, 1500);

      if (divisions.length > 0) {
         clearTimeout(fetchTimeout);
      }
   }, [fetchData, isLoading, divisions]);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   const navigate = useNavigate();
   const handleNavigate = (id) => {
      navigate(`/divisions/${id}`, { replace: true });
   };

   return (
      <div className="divisions-public">
         <div className="header">
            <h1>All Our Divisions</h1>
            <h2>Discover Every Interest</h2>
         </div>
         <div className="content">
            {isLoading ? (
               <LoadingCard />
            ) : (
               divisions.map((division) => (
                  <div
                     key={division.id}
                     className="card"
                     onClick={() => handleNavigate(division.id)}
                  >
                     <img
                        src={divisionsLogo + division.logo_path}
                        alt={division.name}
                     />
                     <h1>{division.name}</h1>
                     <h2>{division.description}</h2>
                     <div className="card-hover">
                        <h1>Click me!</h1>
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
   );
}
