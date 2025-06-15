import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

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
      fetchData();
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
            {divisions.map((division) => (
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
            ))}
         </div>
      </div>
   );
}
